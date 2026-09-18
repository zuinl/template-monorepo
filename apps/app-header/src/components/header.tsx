import { AppBar, Box, Toolbar, Typography, IconButton } from "@libs/design-system";
import MenuIcon from "@mui/icons-material/Menu";
import { LightMode } from "@mui/icons-material";
import { useHeaderContext } from "../contexts";

export function Header() {
  const { useTheme } = useHeaderContext();

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
            <IconButton
              size="large"
              aria-label="alternar tema da aplicação"
              color="inherit"
              onClick={useTheme.onThemeChange}
            >
              <LightMode />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
