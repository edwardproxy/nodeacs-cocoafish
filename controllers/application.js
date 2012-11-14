var logger = require('acs').logger;

function index(req, res) {
  req.session.controller = "";
  if(!req.session.user) {
    res.render('login', {
      layout: 'application',
      req: req
    });
  }else{
  	res.render('index', {
      layout: 'application',
      req: req
    });
  }
}

function login(req, res) {
  req.session.controller = "";
  if(!req.session.user) {
  	res.render('login', {
      layout: 'application',
      req: req
    });
  }else{
    req.session.flash = {msg:"You are already logged in.", r:0};
    res.render('index', {
      layout: 'application',
      req: req
    });
  }
}

function signup(req, res) {
  console.warn('this is application#signup');
  req.session.controller = "";
  res.render('signup', {
    layout: 'application',
    req: req
  });
}

function chatroom(req, res) {
  req.session.controller = "chatroom";
  res.render('chatroom', {
    layout: 'application',
    req: req
  });
}

function page_not_found(req, res) {
  req.session.controller = "";
  res.render('page_not_found', {
    layout: 'application',
    req: req
  }); 
}