import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

import PlayerContextProvider from "./context/PlayerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PlayerContextProvider>
          <Toaster position="top-right" />
          <App />
        </PlayerContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
