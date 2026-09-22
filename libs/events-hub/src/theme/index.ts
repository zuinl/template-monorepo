import { ThemeOption } from "@libs/shared-types/theme/index.ts";

enum ThemeEvent {
  THEME_CHANGE = "THEME_CHANGE",
}

type ThemeChangeListener = () => void;

const subscribeToThemeChange = (listener: ThemeChangeListener) => {
  window.addEventListener(ThemeEvent.THEME_CHANGE, listener);
};

const unsubscribeFromThemeChange = (listener: ThemeChangeListener) => {
  window.removeEventListener(ThemeEvent.THEME_CHANGE, listener);
};

const publishToThemeChange = (updatedTheme: ThemeOption) => {
  window.dispatchEvent(new CustomEvent(ThemeEvent.THEME_CHANGE, { detail: updatedTheme }));
};

export { subscribeToThemeChange, unsubscribeFromThemeChange, publishToThemeChange };
