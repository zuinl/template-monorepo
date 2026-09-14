const externalExact = new Set(["react", "react-dom", "single-spa", "single-spa-react"]);

const externalStartsWith: string[] = ["react/", "react-dom/", "@mui/", "@emotion/"];

export function createExternalMatcher(additionalExternals: string[] = []) {
  const extra = new Set(additionalExternals);

  return function externalMatcher(id: string): boolean {
    if (externalExact.has(id) || extra.has(id)) {
      return true;
    }

    if (externalStartsWith.some((prefix) => id.startsWith(prefix))) {
      return true;
    }

    return false;
  };
}
