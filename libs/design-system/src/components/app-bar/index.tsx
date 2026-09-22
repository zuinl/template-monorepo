import MUIAppBar, { type AppBarProps } from "@mui/material/AppBar";

export const AppBar = ({ ...props }: AppBarProps) => {
  return <MUIAppBar {...props} />;
};
