var ACS = require('acs').ACS,
		logger = require('acs').logger,
		express = require('express'),
		partials = require('express-partials');

// initialize app (setup ACS library and logger)
function start(app) {
	ACS.init('3XUnNvMwsfUm8zoqI3UDiqvpQA9qR9i0', 'VkbfjHJcQLJz5cE9X5MwGsFx1P0jraEA'); // Please fill me.
	logger.setLevel('DEBUG');
	
	//use connect.session
	app.use(express.cookieParser());
	app.use(express.session({ key: 'node.acs', secret: "my secret" }));
	
	//set favicon
	app.use(express.favicon(__dirname + '/public/images/favicon.ico'));

	//set to use express-partial for view
	app.use(partials());

	//Request body parsing middleware supporting JSON, urlencoded, and multipart
	app.use(express.bodyParser());

	//error handling, finish this!
	app.use(function(err, req, res, next){
	  logger.error(err.stack);
	  res.render("error", {
			layout: 'error',
	    req: req,
	    errors: err.stack
	  });
	});

	// filter for all page?
	app.use(function(req, res, next){
	  if(!req.session.user) {
	    req.session.msg = "Please login first.";
	    res.render('login', {
	      layout: 'application',
	      req: req
	    });
	    return;
	  }
	  next();
	});
}

// release resources
function stop() {
	
}