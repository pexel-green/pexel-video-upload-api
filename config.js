// config.js
module.exports = {
    port: process.env.PORT || 3000,
    connectionString: process.env.CONNECTION_STRING || "DefaultEndpointsProtocol=https;AccountName=pexelblobstorage;AccountKey=0qfoz4Hez1s0He89FOxKQGpyjxhyeeU7M5znkscV4E5kRcIMuGz5KECMO0f9VswjKxzl88X8ovLr+AStKEJhmQ==;EndpointSuffix=core.windows.net",
    blobContainerName: process.env.BLOB_CONTAINER_NAME || "video",
    fileUploadLimitBytes: process.env.FILE_UPLOAD_LIMIT_BYTES || 1024 * 1024 * 100000, // 100mb limit
    logDirectory: './logs',
};