const yargs = require('yargs/yargs')(process.argv.slice(2));
const { PORT } = require('../../src/config/globals')

const argvAux = yargs.argv._;
let argv = "";
function info(req, res) {
    argvAux == "" ? argv = "ARGV: Sin argumentos de entrada" : argv = `ARGV: ${argvAux}`;
    let versionNodeJs = `VERSION: ${process.version}`;
    let nombrePlataforma = `PLATFORM: ${process.platform}`;
    let rss = `MEMORY: ${process.memoryUsage().rss}`;
    let pathEjecucion = `PATH: ${process.execPath}`;
    let processID = `ID: ${process.pid} , PORT: ${PORT}`;
    let carpetaProyecto = `FOLDER: ${process.cwd()}`;
return {info: true, random: false, argv, carpetaProyecto,processID, pathEjecucion, carpetaProyecto, rss, versionNodeJs, nombrePlataforma }
}

module.exports = { info };