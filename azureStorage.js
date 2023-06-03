// azureStorage.js
const { BlobServiceClient } = require('@azure/storage-blob');
const { connectionString, blobContainerName } = require('./config');
const logger = require('./logger');

// Create a BlobServiceClient object that can be used to create a container client
const blobServiceClient = BlobServiceClient.fromConnectionString(
    connectionString
);

// Check if the container already exists
async function checkContainer() {
    const containerClient = blobServiceClient.getContainerClient(
        blobContainerName
    );
    const exists = await containerClient.exists();
    if (!exists) {
        // Create the container if it doesn't exist
        await containerClient.create();
        logger.info(`Container "${blobContainerName}" created successfully`);
    } else {
        logger.info(`Container "${blobContainerName}" already exists`);
    }
}

module.exports = { blobServiceClient, checkContainer };