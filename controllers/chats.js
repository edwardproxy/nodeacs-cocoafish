var ACS = require('acs').ACS,
    logger = require('acs').logger;

function _index(req, res) {
  req.session.controller = "chats";
  ACS.Chats.query({per_page:1000, order:"-updated_at", participate_ids:req.session.user.id, where:"{\"user_id\":\""+req.session.user.id+"\"}"}, function(e) {
    if(e.success && e.success === true){
      res.render('chats/index', {
        layout: 'layout/application',
        obj: e,
        req: req
      });
    }else{
      req.session.msg = e.message;
      res.redirect('/');
      logger.debug('Error: ' + JSON.stringify(e));
    }
  }, req, res);
}

function _new(req, res) {
  req.session.controller = "chats";
  res.render('chats/new', {
    req: req,
    layout: 'layout/application'
  });
}

function _create(req, res) {
  req.session.controller = "chats";
  var data = {
    to_ids: req.body.to_ids,
    message: req.body.message,
    session_id: req.session.user.session_id
  };
  ACS.Chats.create(data, function(e) {
    if(e.success && e.success === true){
      logger.info('chats#create: ' + JSON.stringify(e));
      req.session.msg = "Successfully create a chats #"+e.chats[0].id;
      res.redirect('/chats');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/chats/new');
    }
  }, req, res);
}