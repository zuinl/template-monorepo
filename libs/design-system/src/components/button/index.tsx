import MUIButton, { type ButtonProps } from "@mui/material/Button";

export const Button = ({ ...props }: ButtonProps) => {
  return <MUIButton {...props} />;
};
