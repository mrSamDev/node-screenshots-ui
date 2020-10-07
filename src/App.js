import React from "react";
import "./App.css";
import Page from "./components/atoms/page";
import LandingPage from "./components/page/Landing";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Page title="FullPager">
        <LandingPage />
      </Page>
    </MuiThemeProvider>
  );
}

export default App;
