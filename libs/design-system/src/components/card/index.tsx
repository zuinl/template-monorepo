import MUICard, { type CardProps } from "@mui/material/Card";

export const Card = ({ ...props }: CardProps) => {
  return <MUICard {...props} />;
};
