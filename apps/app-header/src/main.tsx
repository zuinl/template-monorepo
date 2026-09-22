import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import { HeaderMain } from "./";
import { FatalError, ThemeProvider } from "@libs/design-system";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: () => {
    return (
      <ThemeProvider>
        <HeaderMain />
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
