import { CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import palette from "./palette";
import breakpoints from "./breakpoints";
import typography from "./typography";

const ThemeProvider = ({ children }) => {
  const themeMode = "light";

  const themeOptions = {
    breakpoints,
    typography,
    palette: themeMode === "light" ? palette.light : palette.dark,
  };

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
