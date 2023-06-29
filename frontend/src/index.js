import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/public-sans";
import "react-toastify/dist/ReactToastify.css";
import Root from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { CssVarsProvider, StyledEngineProvider } from "@mui/joy/styles";
import theme from "./utils/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root>
      <StyledEngineProvider injectFirst>
        <CssVarsProvider
          defaultMode="dark"
          disableTransitionOnChange
          theme={theme}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CssVarsProvider>
      </StyledEngineProvider>
    </Root>
  </React.StrictMode>
);

reportWebVitals();
