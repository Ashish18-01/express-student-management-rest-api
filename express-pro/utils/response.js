const sendResponse = (
    res,
    statusCode,
    success,
    message,
    data = null
) => {

    res.status(statusCode).json({

        success,

        message,

        time: new Date(),

        data

    });

};

module.exports = sendResponse;