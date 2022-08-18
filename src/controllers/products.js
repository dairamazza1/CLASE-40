// SE ENCUENTRAN LAS FUNCIONES DE REQUEST Y RESPONSE

//SERVICE
const { getProductsDLO, getRandomDLO, getProductsDataDLO } = require('../services/products');

//INFO
const { info }= require("../utils/info");

//LOG4JS
const log4js = require("log4js");

//ROUTES
function getRoot(req, res) {
        res.render('pages/log', {main: true, login: false, signup : false, loginError: false, signupLogout: false , logout : false , error : false});
}

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('products')
    } else {
        res.render('pages/log', {main: false, login: true, signup : false, loginError: false, signupLogout: false, logout : false , error : false});
    }
}

function getSignup(req, res) {
    res.render('pages/log', {main: false, login: false, signup : true, loginError: false, signupLogout: false, logout : false , error : false});

}

function postLogin (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('products')
    } else {
        res.redirect('login')
    }
}

function postSignup (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('products')
    } else {
        res.redirect('login')
    }
}

async function getProducts (req, res){
    if (req.isAuthenticated()) {
        let user = req.user;
        if(getProductsDLO() ){
            res.render( 'pages/index', {listExists: true, listNotExists: false, user: user, isUser : true, info: false})
        }
        else{
            res.render('pages/index', {listNotExists: true, listExists: false, user: user, isUser : true, info: false})
        }
    } else {
        res.redirect('login')
    }
}
async function getProductsData (req, res){
    const getData = await getProductsDataDLO();
    res.json(getData);
}
function getFaillogin (req, res) {
    console.log('error en login');
    res.render('pages/log', {main: false, login: false, signup : false, loginError: true, signupLogout: false, logout : false , error : false});
}

function getFailsignup (req, res) {
    console.log('error en signup');
    res.render('pages/log', {main: false, login: false, signup : false, loginError: false, signupLogout: true, logout : false , error : false});
}

function getLogout (req, res) {
    req.logout( (err) => {
        if (!err) {
            let user = req.body.name;
            res.render('pages/log', {main: false, login: false, signup : false, loginError: false, signupLogout: false, logout : true, name: user , error : false});
        } 
    });
}

function failRoute(req, res){
    const logger = log4js.getLogger("info");
    logger.info("Log Info: ",req.url);

    res.status(404).render('pages/log', {main: false, login: false, signup : false, loginError: false, signupLogout: false, logout : false , error : true});
}

function getInfo(req, res) {
    const getObj  = info();
    res.render( 'pages/info', getObj )
}
function getRandom(req, res) {
    let tittle = `Se han calculado en total ${num} numeros:`;
    let result = getRandomDLO(req.query.qty);
    res.render("pages/info", { info: false, random: true, tittle, result });
}


module.exports = {
    getRoot,
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getFailsignup,
    getProducts,
    getProductsData,
    getInfo,
    getRandom
}