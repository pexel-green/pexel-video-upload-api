// httpServer.js
const express = require('express');
const cors = require('cors');
const logger = require('./logger');
const { port, blobContainerName, fileUploadLimitBytes } = require('./config');
const { uploadSingleVideo } = require('./fileUpload');
const { blobServiceClient } = require('./azureStorage');
const fs = require('fs');
const app = express();
app.use(cors());

// API endpoint to handle video uploads
app.post('/upload', uploadSingleVideo, async (req, res) => {
    try {
        const containerClient = blobServiceClient.getContainerClient(
            blobContainerName
        );
        const blobName = `${Date.now().toString()}-${req.file.originalname}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const filePath = req.file.path;

        const readStream = fs.createReadStream(filePath);
        await blockBlobClient.uploadStream(readStream);
        logger.info(`File "${blobName}" uploaded to Azure Blob Storage`);

        // Log the successful file upload and free up disk space
        logger.info(`File "${blobName}" uploaded successfully`);
        req.file = null;
        fs.unlinkSync(filePath);
        res.send(`File "${blobName}" uploaded successfully`);

    } catch (error) {
        logger.error(error);
        res.status(500).send('Internal server error');
    }
});


module.exports = { app, port };