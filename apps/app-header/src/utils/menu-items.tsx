import { MenuItem } from "@libs/shared-types/menu";
import { Home as HomeIcon, HolidayVillage } from "@mui/icons-material";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "home",
    text: "Início",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    id: "home",
    text: "Casas",
    icon: <HolidayVillage />,
    path: "/casas",
  },
];
