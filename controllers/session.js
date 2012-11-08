var ACS = require('acs').ACS,
		logger = require('acs').logger;

//do ACS user login
function login(req, res) {
	ACS.Users.login({
		login: req.body.un,
		password: req.body.pw
	}, function(data) {
		if(data.success) {
			var user = data.users[0];
			if(user.first_name && user.last_name) {
				user.name = user.first_name + ' ' + user.last_name;
			} else {
				user.name = user.username;
			}
			req.session.flash = {msg:"Hello "+user.name+".",r:0};
			user.session_id = data.meta.session_id;
			req.session.user = user;
			res.redirect('/');
			logger.info('User logged in: ' + user.name);
		} else {
			req.session.msg = data.message;
			res.render('login', {
				layout: 'application',
		    user: req.session.user,
		    req: req
			});
		}
	}, req, res);
}

function logout(req, res) {
	delete req.session.user;
	res.redirect('/');
}