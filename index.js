const express = require("express");
const os = require("os");
const { networkInterfaces } = require("os");

const app = express();
const PORT = process.env.PORT || 3000;

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
    res.json({
        ip_address: getIPAddress(),
        hostname: os.hostname(),
        app_version: process.env.BASE_VERSION
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
