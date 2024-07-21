import React from "react";
import ReactDOM from "react-dom/client";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <MsalProvider instance={msalInstance}>
        <Router>
            <App />
        </Router>
    </MsalProvider>
);
