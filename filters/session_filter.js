var ACS = require('acs').ACS,
    logger = require('acs').logger;

function checkSession(req, res, next) {
  if(!req.session.user) {
    req.session.flash = {msg:"Please login first.",r:0};
    res.render('login', {
      layout: 'application',
      req: req
    });
    return;
  }
  next();
}

function checkUserSession(req, res, next) {
  // force user to login if current url is not /,/login,/logout
  if(req.session.flash && req.session.flash.r == 0){
    req.session.flash.r = 1;
  }else{
    req.session.flash = {};
  }
  
  if(!req.session.user && req.url !== "/" && req.url !== "/login" && req.url !== "/logout") {
    req.session.flash = {msg:"Please login first.",r:0};
    res.render('login', {
      layout: 'application',
      req: req
    });
    return;
  }
  next();
}