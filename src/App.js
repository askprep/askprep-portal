import React from "react";
import { ThemeProvider } from "styled-components";

import Theme from "./themes";
import { GlobalStyles } from "./themes/global";
import Toggle from "./components/Toggle";
import { useTheme } from "./hooks";

const App = () => {
  const [theme, changeTheme] = useTheme();
  return (
    <ThemeProvider theme={Theme[theme]}>
      <GlobalStyles />
      <Toggle type={theme} toggleTheme={changeTheme}>
        Toggle Theme
      </Toggle>
    </ThemeProvider>
  );
};

export default App;
