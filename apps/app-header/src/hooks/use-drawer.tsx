import { useEffect, useState } from "react";
import { navigateToUrl } from "single-spa";
import { MENU_ITEMS } from "../utils/menu-items";
import { subscribeToHouseSelect, unsubscribeFromHouseSelect } from "@libs/events-hub";

export const useDrawer = () => {
  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const updateTitle = () => {
      if (window.location.pathname === currentPath) return;
      setCurrentPath(window.location.pathname);

      const currentMenu = MENU_ITEMS.find((m) => m.path === window.location.pathname);

      if (currentMenu) {
        setTitle(currentMenu?.text);
      }
    };

    updateTitle();
  }, [window.location.pathname]);

  useEffect(() => {
    const houseSelectListener = (e: CustomEvent): void => {
      setTitle(`Residência selecionada: ${e.detail}`);
    };

    subscribeToHouseSelect(houseSelectListener);

    return () => {
      unsubscribeFromHouseSelect(houseSelectListener);
    };
  }, []);

  const toggleDrawer = (open: boolean, event?: React.KeyboardEvent | React.MouseEvent): void => {
    if (
      event?.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  const onMenuClick = (path: string): void => {
    navigateToUrl(path);
  };

  return {
    open,
    toggleDrawer,
    onMenuClick,
    title,
  };
};
