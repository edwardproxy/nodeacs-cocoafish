var ACS = require('acs').ACS,
    logger = require('acs').logger;

function _index(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "checkins";
    var data = {
      per_page:1000,
      order:"-updated_at",
      where:"{\"user_id\":\""+req.session.user.id+"\"}"
    };
    ACS.Checkins.query(data, function(e) {
      if(e.success && e.success === true){
        res.render('checkins/index', {
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
  });
}

function _show(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "checkins";
    var data = {
      checkin_id: req.params.id
    };
    ACS.Checkins.show(data, function(e) {
      if(e.success && e.success === true){
        res.render('checkins/show', {
          layout: 'layout/application',
          req: req,
          obj: e
        });
      }else{
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/checkins');
        logger.debug('Error: ' + JSON.stringify(e));
      }
    }, req, res);
  });
}

function _new(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "checkins";
    res.render('checkins/new', {
      req: req,
      layout: 'layout/application'
    });
  });
}

function _create(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "checkins";
    var data = {
      message: req.body.message,
      place_id: req.body.place_id,
      event_id: req.body.event_id,
      tags: req.body.tags
    };
    ACS.Checkins.create(data, function(e) {
      if(e.success && e.success === true){
        logger.info('checkins#create: ' + JSON.stringify(e));
        req.session.flash = {msg:"Successfully create a place #"+e.checkins[0].id, r:0};
        res.redirect('/checkins');
      }else{
        logger.debug('Error: ' + JSON.stringify(e));
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/checkins/new');
      }
    }, req, res);
  });
}

function _destroy(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "checkins";
    var data = {
      checkin_id: req.params.id
    };
    ACS.Checkins.remove(data, function(e) {
      if(e.success && e.success === true){
        logger.info('checkins#destroy: ' + JSON.stringify(e));
        req.session.flash = {msg:"Successfully delete a place #"+req.params.id, r:0};
        res.redirect('/checkins');
      }else{
        logger.debug('Error: ' + JSON.stringify(e));
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/checkins');
      }
    }, req, res);
  });
}