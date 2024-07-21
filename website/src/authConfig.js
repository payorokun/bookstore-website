// src/authConfig.js
export const msalConfig = {
    auth: {
        clientId: "462c6ca8-7195-4d35-93fa-cdd29365b5d2",
        authority: "https://login.microsoftonline.com/f06c4699-544b-4db2-97fa-f3ef59998515",
        redirectUri: window.location.origin
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false
    }
};

export const loginRequest = {
    scopes: ["api://74945747-6de1-42db-ba37-7579c1c8075b/api.read"]
};
