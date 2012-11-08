function checkSession(req, res, next) {
  if(!req.session.user) {
    req.session.msg = "Please login first.";
    res.render('login', {
      layout: 'application',
      req: req
    });
    return;
  }
  next();
}

function checkUserSession(req, res, next) {
  if(!req.session.user) {
    req.session.msg = "Please login first.";
    res.render('login', {
      layout: 'application',
      req: req
    });
    return;
  }
  next();
}