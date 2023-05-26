const { constants } = require("../constants.js");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Error", message: res.message, stackTrace: err.stack });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: res.message, stackTrace: err.stack });
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: res.message, stackTrace: err.stack });
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized", message: res.message, stackTrace: err.stack });
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Server Error", message: res.message, stackTrace: err.stack });
        default:
            console.log("No Error! All Good.");
            break;
    }
}

module.exports = errorHandler;