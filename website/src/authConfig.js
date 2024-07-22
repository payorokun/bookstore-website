import { PublicClientApplication } from "@azure/msal-browser";

// src/authConfig.js
export const msalConfig = {
    auth: {
        clientId: "7ea41ef4-b059-4b0d-9ead-acb40df161f8", // Ensure this matches the Application (client) ID in Azure AD B2C
        authority: "https://payorob2c.b2clogin.com/payorob2c.onmicrosoft.com/B2C_1_signupsignin", // Ensure this is the correct authority URL
        knownAuthorities: ["payorob2c.b2clogin.com"],
        redirectUri: window.location.origin
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false
    }
};

export const loginRequest = {
    scopes: ["openid", "offline_access", "https://payorob2c.onmicrosoft.com/TheApi/access_as_user"] // Ensure the API scope URL is correct
};

const msalInstance = new PublicClientApplication(msalConfig);

// Function to initialize MSAL
const initializeMsal = async () => {
    // Note: MSAL's PublicClientApplication does not have an explicit initialize method.
    // Assuming some initialization process if needed.
    // If no such process is required, this function can be removed.
    return Promise.resolve();
};

export { msalInstance, initializeMsal };
