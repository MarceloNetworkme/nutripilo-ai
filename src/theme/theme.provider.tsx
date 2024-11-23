import type {} from "@mui/lab/themeAugmentation";
import type {} from "@mui/material/themeCssVarsAugmentation";
// import type {} from '@mui/x-tree-view/themeAugmentation';
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-date-pickers/themeAugmentation";

import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import type { Mode } from "@mui/system/cssVars/useCurrentColorScheme";
import { createTheme } from "./create-theme.util";
import { ThemeService } from "./theme.service";
import { useTranslate } from "../locales/use-locales.util";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  themeDefaultType?: Mode | undefined;
};

export function ThemeProvider({ children, themeDefaultType = "light" }: Props) {
  const { currentLang } = useTranslate();

  const themeStore = ThemeService.useStore();

  const theme = createTheme(currentLang?.systemValue, themeStore);

  return (
    <CssVarsProvider theme={theme} defaultMode={themeDefaultType} modeStorageKey="theme-mode">
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
