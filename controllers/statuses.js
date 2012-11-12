var ACS = require('acs').ACS,
    logger = require('acs').logger;

function _index(req, res) {
  req.session.controller = "statuses";
  ACS.Statuses.query({per_page:1000, order:"-updated_at", where:"{\"user_id\":\""+req.session.user.id+"\"}"}, function(e) {
    if(e.success && e.success === true){
      res.render('statuses/index', {
        layout: 'layout/application',
        obj: e,
        req: req
      });
    }else{
      req.session.flash = {msg:e.message, r:0};
      res.redirect('/');
      logger.debug('Error: ' + JSON.stringify(e));
    }
  }, req, res);
}

function _new(req, res) {
  req.session.controller = "statuses";
  res.render('statuses/new', {
    req: req,
    layout: 'layout/application'
  });
}

function _create(req, res) {
  req.session.controller = "statuses";
  var data = {
    message: req.body.message,
    tags: req.body.tags,
    session_id: req.session.user.session_id
  };
  ACS.Statuses.create(data, function(e) {
    if(e.success && e.success === true){
      logger.info('statuses#create: ' + JSON.stringify(e));
      req.session.flash = {msg:"Successfully create a statuses #"+e.statuses[0].id, r:0};
      res.redirect('/statuses');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.flash = {msg:e.message, r:0};
      res.redirect('/statuses/new');
    }
  }, req, res);
}