import { MenuItem } from "@libs/shared-types/menu/index.ts";
import Box from "@mui/material/Box";
import MUIDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export function Drawer({
  toggleDrawer,
  open,
  items,
  onMenuClick,
}: {
  open: boolean;
  toggleDrawer: (open: boolean, event?: React.KeyboardEvent | React.MouseEvent) => void;
  items: MenuItem[];
  onMenuClick: (path: string) => void;
}) {
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={(e: React.KeyboardEvent | React.MouseEvent) => toggleDrawer(false, e)}
      onKeyDown={(e: React.KeyboardEvent | React.MouseEvent) => toggleDrawer(false, e)}
    >
      <List>
        {items.map((item) => {
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                sx={{ gap: 1, display: "flex", alignItems: "center" }}
                onClick={() => onMenuClick(item.path)}
              >
                {item.icon}
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <MUIDrawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
      {list()}
    </MUIDrawer>
  );
}
