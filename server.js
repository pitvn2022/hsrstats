const express = require('express');
const helmet = require('helmet');
const path = require('path');
const server = express();

server.use(express.static(path.join(__dirname, 'public')));
server.use(helmet());

let startTime;
let lastRequestTime;

function formatTime(seconds) {
    const months = Math.floor(seconds / (30 * 24 * 3600));
    const remainingSeconds = seconds % (30 * 24 * 3600);

    const days = Math.floor(remainingSeconds / (24 * 3600));
    const remainingSecondsAfterDays = remainingSeconds % (24 * 3600);

    const hours = Math.floor(remainingSecondsAfterDays / 3600);
    const remainingSecondsAfterHours = remainingSecondsAfterDays % 3600;

    const minutes = Math.floor(remainingSecondsAfterHours / 60);
    const remainingSecondsAfterMinutes = remainingSecondsAfterHours % 60;

    const formattedTime = [];
    if (months > 0) formattedTime.push(`${months} months`);
    if (days > 0) formattedTime.push(`${days} days`);
    if (hours > 0) formattedTime.push(`${hours} hours`);
    if (minutes > 0) formattedTime.push(`${minutes} minutes`);
    if (remainingSecondsAfterMinutes > 0) formattedTime.push(`${remainingSecondsAfterMinutes} seconds`);

    return formattedTime.join(', ');
}

server.use((req, res, next) => {
    lastRequestTime = Date.now();
    next();
});

server.use((req, res, next) => {
    if (req.url !== '/') {
        res.status(403).send('Access Forbidden: Only the main page is allowed.');
    } else {
        next();
    }
});

server.get('/', (req, res) => {
    const currentTime = new Date().toLocaleString();
    const uptimeInSeconds = Math.floor((lastRequestTime - startTime) / 1000);
    const downtimeInSeconds = Math.floor((Date.now() - lastRequestTime) / 1000);
    const formattedUptime = uptimeInSeconds > 0 ? formatTime(uptimeInSeconds) : 'No uptime';
    const formattedDowntime = downtimeInSeconds > 0 ? formatTime(downtimeInSeconds) : 'No downtime';

    const htmlResponse = `
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <title>StarRail-Auto Status</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #ecf0f1;
                color: #34495e;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
            }
    
            h2 {
                margin-bottom: 10px;
                font-size: 1.5em;
                color: #2c3e50;
            }
    
            .button-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 20px;
            }
    
            .button {
                margin-top: 10px;
                padding: 10px;
                font-size: 16px;
                text-align: center;
                text-decoration: none;
                cursor: pointer;
                border-radius: 5px;
                color: #fff;
                transition: background-color 0.3s;
                width: 100%;
                max-width: 300px;
            }
    
            .button-green {
                background-color: #3498db;
            }
    
            .button-green:hover {
                background-color: #2980b9;
            }
    
            .button-red {
                background-color: #e74c3c;
            }
    
            .button-red:hover {
                background-color: #c0392b;
            }
        </style>
    </head>
    <body>
        <h1>StarRail-Auto is ready!</h1>
        <h2>Server Start Time: ${new Date(startTime).toLocaleString()}</h2>
        <h2>Uptime: ${formattedUptime}</h2>
        <h2>Downtime: ${formattedDowntime}</h2>
        <h2>Current Date and Time: ${currentTime}</h2>
    
        <!-- Container for the buttons with three equal-sized buttons -->
        <div class="button-container">
            <a class="button button-green" href="https://discord.com/oauth2/authorize?&client_id=1152079618719883304&scope=applications.commands+bot&permissions=8" target="_blank">Invite SwitchMOD</a>
            <a class="button button-green" href="https://discord.gg/6H3nzKfdyT" target="_blank">Support Server</a>
            <a class="button button-red" href="https://kickcar.me" target="_blank">Go Back to Homepage</a>
        </div>
    </body>
    </html>
    `;

    res.send(htmlResponse);
});

module.exports = () => {
    startTime = Date.now();

    const PORT = process.env.PORT || 4000;
    server.listen(PORT, () => {
        console.log(`Server Ready. Listening on port ${PORT}`);
    });

    return true;
};
