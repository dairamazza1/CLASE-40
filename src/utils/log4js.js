//LOG4JS
const log4js = require("log4js");

log4js.configure({
    appenders: {
        miLoggerConsole: { type: "console" },
        miLoggerFileWarn: { type: 'file', filename: 'loggerWarn.log' },
        miLoggerFileInfo: { type: 'file', filename: 'loggerInfo.log' },
        miLoggerFileError: { type: 'file', filename: 'loggerError.log' }
    },
    categories: {
        default: { appenders: ["miLoggerConsole"], level: "trace" },
        info: { appenders: ["miLoggerFileInfo"], level: "info" },
        warn: { appenders: ["miLoggerFileWarn"], level: "warn" },
        error: { appenders: ["miLoggerFileError"], level: "error" },
    },
});

module.exports  = { log4js } 