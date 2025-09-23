import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import App from "./App";     // frontend
import App1 from "./App1";   // admin

const muiTheme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={muiTheme}>
        <ChakraProvider>
          <Routes>
            {/* Admin */}
            <Route path="/admin/*" element={<App1 />} />

            {/* Frontend */}
            <Route path="/*" element={<App />} />
          </Routes>
        </ChakraProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
