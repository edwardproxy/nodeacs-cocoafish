function checkSession(req, res, next) {
	if(!req.session.user) {
		res.render('login', {message: 'Please login first.'});
		return;
	}
	next();
}

function checkUserSession(req, res, next) {
  if(!req.session.user) {
    res.render('login', {message: 'Please login first.'});
    return;
  }
  next();
}

// clear message(flash)
function removeMsg(req, res, next) {
  req.session.msg = "blah";
  next();
}