import type { ServerResponse } from "node:http";
import type { Plugin, ResolvedConfig } from "vite-plus";

import { build } from "vite-plus";

export interface SingleSpaDevOptions {
  serverPath?: string;
  enableLiveReload?: boolean;
  reloadDebounceMs?: number;
}

export default function singleSpaDev(options: SingleSpaDevOptions = {}): Plugin {
  let resolvedConfig: ResolvedConfig;
  const sseClients = new Set<ServerResponse>();
  let bundleCode = "";
  let ready = false;
  let reloadTimeout: NodeJS.Timeout | undefined;

  const capturePlugin: Plugin = {
    name: "single-spa-dev:capture",

    footer: () => {
      if (options.enableLiveReload === false) return "";

      return (
        "// [single-spa-dev] live reload\n" +
        'new EventSource(new URL("/__reload", import.meta.url)).onmessage = ' +
        "function () { location.reload(); };"
      );
    },

    generateBundle(_, bundle) {
      const entries = Object.values(bundle).filter(
        (chunk: any) => chunk.type === "chunk" && chunk.isEntry,
      );

      if (entries.length !== 1) {
        throw new Error(`[single-spa-dev] Expected exactly one entry chunk, got ${entries.length}`);
      }

      // @ts-expect-error - Sempre existira ao menos o chunk de entrada
      bundleCode = entries[0].code;
    },
  };

  return {
    name: "single-spa-dev",
    apply: "serve",

    configResolved(config) {
      resolvedConfig = config;
    },

    async configureServer(server) {
      const { logger } = server.config;

      const lib = resolvedConfig.build?.lib;
      const fileName =
        lib && typeof lib === "object" && "fileName" in lib && typeof lib.fileName === "string"
          ? lib.fileName
          : "main";

      const serverPath = options.serverPath ?? `/${fileName}.js`;

      if (!serverPath || serverPath === "/") {
        throw new Error("[single-spa-dev] invalid serverPath");
      }

      const watcher = (await build({
        plugins: [capturePlugin],
        logLevel: "silent",
        define: { "process.env.NODE_ENV": JSON.stringify("development") },
        build: {
          watch: {},
          write: false,
          minify: false,
        },
      })) as {
        on: (event: string, cb: (data: { code: string; duration?: number }) => void) => void;
        close: () => Promise<void>;
      };

      await new Promise<void>((resolve, reject) => {
        watcher.on("event", (event) => {
          if (event.code === "BUNDLE_END") {
            if (!ready) {
              ready = true;
              logger.info(
                `[single-spa-dev] ready in ${String(event.duration)}ms - serving at ${serverPath}`,
              );
              logger.info(
                `[single-spa-dev] Tip: Use https://localhost:${server.config.server.port}${serverPath} on playground single-spa to load the app.`,
              );
              resolve();
            } else {
              logger.info(
                `[single-spa-dev] rebuilt in ${String(event.duration)}ms (clients: ${sseClients.size})`,
              );

              if (options.enableLiveReload === false) return;

              clearTimeout(reloadTimeout);
              reloadTimeout = setTimeout(() => {
                for (const client of sseClients) {
                  try {
                    client.write("data: reload\n\n");
                  } catch {
                    sseClients.delete(client);
                  }
                }
              }, options.reloadDebounceMs ?? 100);
            }
          }

          if (event.code === "ERROR") {
            logger.error("[single-spa-dev] build error");
            reject(event);
          }
        });
      });

      server.httpServer?.on("close", () => {
        void watcher.close();
      });

      server.middlewares.use(serverPath, (_req, res) => {
        if (!ready || !bundleCode) {
          res.writeHead(503, { "Content-Type": "text/plain" });
          return res.end("// building...");
        }

        res.writeHead(200, {
          "Content-Type": "application/javascript",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
        });

        res.end(bundleCode);
      });

      server.middlewares.use("/__reload", (req, res) => {
        if (options.enableLiveReload === false) {
          res.writeHead(404);
          return res.end();
        }

        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        });

        res.write("\n");

        const pingInterval = setInterval(() => {
          try {
            res.write(": ping\n\n");
          } catch {
            clearInterval(pingInterval);
            sseClients.delete(res);
          }
        }, 20000);

        sseClients.add(res);

        req.on("close", () => {
          clearInterval(pingInterval);
          sseClients.delete(res);
        });
      });
    },
  };
}
