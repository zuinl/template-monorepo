import Box, { type BoxProps } from "@mui/material/Box";

export const PageBase = ({ ...props }: BoxProps) => {
  return (
    <Box sx={{ width: "90%", marginX: "auto", maxWidth: "1200px", pt: 3 }} {...props}>
      {props.children}
    </Box>
  );
};
