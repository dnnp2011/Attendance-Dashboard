const express = require('express');
const app = express();
const port = process.env.PORT || 6787;
const path = require('path');

/**
 * A quick Express server to serve my static React files
 */

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${ port }`));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));
app.disable('x-powered-by');
app.use(function (req, res, next) {
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Frame-Options', 'deny');
    res.header('X-Content-Type-Options', 'nosniff');
    next();
});

app.get('*', (req, res) => {
    res.sendFile(path.join(`${ __dirname }/build/index.html`));
});