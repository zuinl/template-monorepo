import { publishToThemeChange } from "@libs/events-hub";
import { ThemeOption } from "@libs/shared-types/theme";
import { getCurrentTheme } from "@libs/design-system";

export const useTheme = () => {
  const onThemeChange = () => {
    const currentTheme = getCurrentTheme();
    publishToThemeChange(currentTheme === ThemeOption.DARK ? ThemeOption.LIGHT : ThemeOption.DARK);
  };

  return {
    onThemeChange,
  };
};
