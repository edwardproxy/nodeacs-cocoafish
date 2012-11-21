var ACS = require('acs').ACS,
		logger = require('acs').logger,
		express = require('express'),
		partials = require('express-partials');

// initialize app (setup ACS library and logger)
function start(app) {
<<<<<<< HEAD
	console.log('this is app#start');
	ACS.init('jNMQP76N5nR25yXYJ239bmHzPoox0I4O', 'y7bmfeGlhtfztR2kCeihNfYP25PZu2WR'); // Please fill me.
=======
	ACS.init('3XUnNvMwsfUm8zoqI3UDiqvpQA9qR9i0', 'VkbfjHJcQLJz5cE9X5MwGsFx1P0jraEA');
>>>>>>> 1c5c461ec341f02b0c2cd2759ca5b5b29c54d846
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
}

// release resources
function stop() {
	
}