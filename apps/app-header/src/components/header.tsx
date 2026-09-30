import { AppBar, Box, Toolbar, Typography, IconButton, Drawer } from "@libs/design-system";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useHeaderContext } from "../contexts";
import { MENU_ITEMS } from "../utils/menu-items";

export function Header() {
  const { useDrawer } = useHeaderContext();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              onClick={() => useDrawer.toggleDrawer(true)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {useDrawer.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        open={useDrawer.open}
        toggleDrawer={useDrawer.toggleDrawer}
        items={MENU_ITEMS}
        onMenuClick={useDrawer.onMenuClick}
      />
    </>
  );
}
