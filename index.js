// index.js
const { checkContainer } = require('./azureStorage');
const { app, port } = require('./httpServer');
const logger = require('./logger');

// Start the Express server
app.listen(port, () => {
    logger.info(`Server started on port ${port}`);
    checkContainer();
});