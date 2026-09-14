import type { Plugin } from "vite-plus";
import localImportMap from "./importmap.json";

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Injeta o import map no `index.html` durante o dev server e o build.
 * - `ssi`: preserva o marcador SSI; o NGINX resolve em runtime (produção).
 * - qualquer outra string: URL do JSON remoto. O fetch é feito uma única
 *   vez por sessão e cacheado em memória para evitar refetch a cada F5.
 */
export function importMapInlinePlugin(urlImportMaps: string): Plugin {
  let cachedImportMap: string | null = null;
  let pendingFetch: Promise<string> | null = null;

  const fetchImportMap = (): Promise<string> => {
    if (cachedImportMap) return Promise.resolve(cachedImportMap);
    if (urlImportMaps === "local") return Promise.resolve(JSON.stringify(localImportMap));
    pendingFetch ??= fetch(urlImportMaps)
      .then((r) => {
        if (!r.ok) throw new Error(`importmap fetch failed: ${r.status} ${r.statusText}`);
        return r.json();
      })
      .then((json) => {
        cachedImportMap = JSON.stringify(json);
        return cachedImportMap;
      })
      .catch((err) => {
        pendingFetch = null;
        throw err;
      });
    return pendingFetch;
  };

  return {
    name: "importmap-inline",
    transformIndexHtml: {
      order: "pre",
      handler: async (html) => {
        if (urlImportMaps === "ssi") {
          return html;
        }

        const importmapJson = await fetchImportMap();
        return html.replace(/<!--#\s*include\s+virtual="\/importmap-proxy"\s*-->/, importmapJson);
      },
    },
  };
}

/**
 * Controla se o import map fica "playground" (overridable em runtime via
 * import-map-overrides) ou "locked" (tipo nativo <script type="importmap">,
 * sem override).
 */
export function importMapPlaygroundPlugin(playground: boolean): Plugin {
  return {
    name: "importmap-playground",
    transformIndexHtml: {
      order: "pre",
      handler: (html) => {
        if (playground) return html;
        // Locked: troca para tipo nativo e remove a allowlist meta.
        return html
          .replace(/<script\s+type="overridable-importmap">/, '<script type="importmap">')
          .replace(/\s*<meta\s+name="import-map-overrides-domains"[\s\S]*?\/>\s*/, "");
      },
    },
  };
}

/**
 * Workaround oficial do Vite (issue #6582, sugerido pelos mantenedores em
 * #6393) para que bare specifiers de pacotes externos passem adiante no dev
 * server e sejam resolvidos em runtime pelo import map do browser.
 * Referência: https://github.com/vitejs/vite/issues/6393#issuecomment-1006819717
 */
export function externalImportMapPlugin(externals: readonly string[]): Plugin {
  return {
    name: "externalize-importmap",
    enforce: "pre",
    config(config) {
      config.optimizeDeps ??= {};
      config.optimizeDeps.exclude ??= [];
      config.optimizeDeps.exclude.push(...externals);
    },
    configResolved(resolvedConfig) {
      const pattern = new RegExp(`/@id/(${externals.map(escapeRegExp).join("|")})`, "g");
      const restore: Plugin = {
        name: "externalize-restore-bare-specifier",
        transform(code: string) {
          return pattern.test(code) ? code.replace(pattern, "$1") : code;
        },
      };
      (resolvedConfig.plugins as Plugin[]).push(restore);
    },
    resolveId(id) {
      if (externals.includes(id)) {
        return { id, external: true };
      }
      return null;
    },
    load(id) {
      if (externals.includes(id)) {
        return { code: "export {};", moduleType: "js" };
      }
      return null;
    },
  };
}
