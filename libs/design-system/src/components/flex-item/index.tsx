import Box, { type BoxProps } from "@mui/material/Box";

export const FlexItem = ({ ...props }: BoxProps) => {
  const sx: BoxProps["sx"] = {
    display: "flex",
    gap: 3,
    ...props.sx,
  };

  return <Box {...props} sx={sx} />;
};
