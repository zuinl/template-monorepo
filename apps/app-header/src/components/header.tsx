import { AppBar, Box, Toolbar, Typography, IconButton, Drawer } from "@libs/design-system";
import MenuIcon from "@mui/icons-material/Menu";
import { useHeaderContext } from "../contexts";

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
              Início
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        open={useDrawer.open}
        toggleDrawer={useDrawer.toggleDrawer}
        items={[{ id: "home", text: "Início", onClick: () => {} }]}
      />
    </>
  );
}
