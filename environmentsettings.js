const GlobalSettings = {
  development: {
    siteEnvironment: "Dev",
    apiBaseURL: "https://api.olmag.pl/api/",
    baseURL: "https://api.olmag.pl/",
    hostURL: "https://olmag.pl/",
    googleTagManagerKey: "GTM-W8WK3DF",
    googleTagManagerEnabled: true,
    googleTagManagerDebug: true,
    google_analytics_id: "G-2259XFJNLT",
    storeId: "cdf63b0a-88d0-40b0-a31f-c63ae02f320d",
    languageId: "40beaea2-f6e4-4414-8a10-2570718f13aa",
  },
  production: {
    siteEnvironment: "Production",
    apiBaseURL: "https://api.olmag.pl/api/",
    baseURL: "https://api.olmag.pl/",
    googleTagManagerKey: "GTM-W8WK3DF",
    googleTagManagerEnabled: true,
    googleTagManagerDebug: false,
    google_analytics_id: "G-2259XFJNLT",
    storeId: "cdf63b0a-88d0-40b0-a31f-c63ae02f320d",
    languageId: "40beaea2-f6e4-4414-8a10-2570718f13aa",
  },
};

export { GlobalSettings };
