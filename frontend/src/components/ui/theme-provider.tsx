"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

/**
 * next-themes renders its children on the server and resolves the theme from an
 * inline script before paint. Gating this on a mounted flag would blank the
 * server HTML for every page, so only components that read the *resolved* theme
 * (the toggle) wait for mount.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default ThemeProvider;
