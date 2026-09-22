import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import { Main } from "./";
import { FatalError, ThemeProvider, PageBase } from "@libs/design-system";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: () => {
    return (
      <ThemeProvider>
        <PageBase>
          <Main />
        </PageBase>
      </ThemeProvider>
    );
  },
  errorBoundary(err, info, props) {
    return (
      <ThemeProvider>
        <FatalError />
      </ThemeProvider>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
