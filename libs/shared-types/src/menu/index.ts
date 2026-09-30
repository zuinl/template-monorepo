import type { ReactNode } from "react";

export type MenuItem = {
  text: string;
  icon?: ReactNode;
  id: string;
  path: string;
};
