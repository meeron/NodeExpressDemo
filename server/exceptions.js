module.exports = {
    badRequest: (message) => {
        throw {
            status: 400,
            message,
        };
    }
}