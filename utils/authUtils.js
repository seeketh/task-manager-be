// Utility functions for Auth API

// Create Auth response 
const createAuthRes = (status, message) => ({
    success: status,
    msg: message
});

module.exports = {createAuthRes};