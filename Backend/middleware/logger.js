const logger = (req, res, next) => {

    console.log("\n==================== REQUEST ====================");

    console.log("URL          :", req.originalUrl);
    console.log("Method       :", req.method);
    console.log("IP Address   :", req.ip);
    console.log("Time         :", new Date().toLocaleString());
    console.log("User Agent   :", req.headers["user-agent"]);

    console.log("=================================================\n");

    next();

};

module.exports = logger;