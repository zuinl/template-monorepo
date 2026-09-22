import { useState } from "react";

export const useDrawer = () => {
  const [open, setOpen] = useState(false);

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

  return {
    open,
    toggleDrawer,
  };
};
