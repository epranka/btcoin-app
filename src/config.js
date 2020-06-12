const config = {
    currencies: [
        { code: "USD", symbol: "$" },
        { code: "EUR", symbol: "€" },
        { code: "GBP", symbol: "£" },
    ],
    apiUrl: "https://api.coindesk.com/v1/bpi/currentprice.json",
    updateInterval: 60 * 1000,
    defaultBtcValue: 1,
};

export default config;
