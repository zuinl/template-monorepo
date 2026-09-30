import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import { Main } from "./";
import { FatalError, ThemeProvider, PageBase } from "@libs/design-system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "./contexts";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: () => {
    const queryClient = new QueryClient();
    return (
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <PageBase>
              <Main />
            </PageBase>
          </AppProvider>
        </QueryClientProvider>
      </ThemeProvider>
    );
  },
  errorBoundary(err, info, props) {
    return (
      <ThemeProvider>
        <FatalError
          message={`App: ${props.name} | Erro: ${err.message} - ${info.componentStack}`}
        />
      </ThemeProvider>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
