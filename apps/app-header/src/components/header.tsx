import { AppBar, Box, Toolbar, Typography, IconButton } from "@libs/design-system";
import MenuIcon from "@mui/icons-material/Menu";
import { LightMode, DarkMode } from "@mui/icons-material";

export function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          <div>
            <IconButton size="large" aria-label="alternar tema da aplicação" color="inherit">
              <LightMode />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
