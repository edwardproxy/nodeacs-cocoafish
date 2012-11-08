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
    req.session.msg = "You are already logged in.";
    res.render('index', {
      layout: 'application',
      req: req
    });
  }
}

function signup(req, res) {
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
