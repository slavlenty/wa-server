// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters, 
// visit https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
const msalConfig = {
    auth: {
        clientId: "1365ce68-b197-496b-8e62-28d06b49fa55",
        authority: "https://login.microsoftonline.com/33422d40-7514-4f48-a371-fabae53b42e1",
        redirectUri: "http://localhost:3000/index.html",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {	
                    return;	
                }	
                switch (level) {	
                    case msal.LogLevel.Error:	
                        console.error(message);	
                        return;	
                    case msal.LogLevel.Info:	
                        console.info(message);	
                        return;	
                    case msal.LogLevel.Verbose:	
                        console.debug(message);	
                        return;	
                    case msal.LogLevel.Warning:	
                        console.warn(message);	
                        return;	
                }
            }
        }
    }
};

// Add here the scopes that you would like the user to consent during sign-in
const loginRequest = {
    scopes: ["openid", "profile", "User.Read"]
};

// Add here the scopes to request when obtaining an access token for API
const tokenRequest = {
    scopes: ["api://1365ce68-b197-496b-8e62-28d06b49fa55/access_as_user"],
    forceRefresh: true // Set this to "true" to skip a cached token and go to the server to get a new token
};
