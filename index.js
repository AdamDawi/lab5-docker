const express = require("express");
const os = require("os");
const { networkInterfaces } = require("os");

const app = express();
const PORT = 8080;

function getIPAddress() {
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === "IPv4" && !net.internal) {
                return net.address;
            }
        }
    }
    return "Unknown";
}

app.get("/", (req, res) => {
    const ip = getIPAddress();
    const hostname = os.hostname();
    const appVersion = process.env.APP_VERSION || "Not set";

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Laboratorium 5 - Adam Dawidziuk</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                padding: 20px;
            }
            h1 {
                color: #333;
            }
            .info {
                margin: 10px 0;
                padding: 10px;
                background-color: #e0e0e0;
                border-radius: 5px;
            }
            .info strong {
                color: #2c3e50;
            }
        </style>
    </head>
    <body>
        <h1>Informacje o serwerze</h1>
        <div class="info"><strong>Adres IP serwera:</strong> ${ip}</div>
        <div class="info"><strong>Nazwa serwera (hostname):</strong> ${hostname}</div>
        <div class="info"><strong>Wersja aplikacji:</strong> ${appVersion}</div>
    </body>
    </html>
    `;
    res.send(htmlContent);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
