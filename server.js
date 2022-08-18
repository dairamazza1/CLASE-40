const express = require('express')
const app = express();
const session = require("express-session");

// CLUSTER
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

// DEPENDENCIAS
const productRouter = require('./src/routes/routes')
const { TIEMPO_EXPIRACION } = require('./src/config/globals')
const { PORT } = require('./src/config/globals')
const { MODE } = require('./src/config/globals')
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

const loggerError = log4js.getLogger("error");
const loggerInfo = log4js.getLogger("info");

//COOKIES - PERSISTENCIA MONGO
const advancedOptions = { useNewUrlParser: true , useUnifiedTopology: true }

app.use(session({
    secret: 'daira',
    resave: true,
    saveUninitialized: true,
    mongoOptions : advancedOptions,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: parseInt(TIEMPO_EXPIRACION)
    }
    })
);

// MIDDLEWARE
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))

// VIEWS
app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs'); //se define extensión (motor de plantilla)
app.use(express.static(__dirname + "/public"));

//*******************   ENDPOINTS   **********************

app.use(productRouter);


//SERVIDOR
const server = servidor(MODE); 

function servidor(args) {
    if (args == 'FORK') {
        app.listen(PORT, () => {
            loggerInfo.info(`Servidor en Puerto ${PORT} - PID WORKER: ${process.pid}`);
            app.on("error", error => loggerError.error(`Error en servidor ${error}`));
        })
    } else {
        if (cluster.isMaster) { 
            loggerInfo.info(`PID MASTER ${process.pid}`);

            for (let i = 0; i < numCPUs; i++) {
                cluster.fork()
            }

            cluster.on('exit', worker => {
                loggerInfo.info('Worker', worker.process.pid, 'died')
                cluster.fork()
            })
        } else {
            app.listen(PORT, err => {
                if (!err) loggerError.error(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
            })
        }
    }
}