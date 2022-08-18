function userLogged(req, res, next) {
    if (req.session?.logged == true) {
          return next();
    }else{
        logger.error(err)
    }
  }
  
  module.exports = { userLogged };