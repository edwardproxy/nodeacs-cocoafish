var ACS = require('acs').ACS,
    logger = require('acs').logger;

function _index(req, res) {
  req.session.controller = "events";
  ACS.Events.query({per_page:1000, order:"-updated_at", where:"{\"user_id\":\""+req.session.user.id+"\"}"}, function(e) {
    if(e.success && e.success === true){
      res.render('events/index', {
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

function _show(req, res) {
  req.session.controller = "events";
  var data = {
    event_id: req.params.id
  };
  ACS.Events.show(data, function(e) {
    if(e.success && e.success === true){
      res.render('events/show', {
        layout: 'layout/application',
        req: req,
        obj: e
      });
    }else{
      req.session.msg = e.message;
      res.redirect('/events');
      logger.debug('Error: ' + JSON.stringify(e));
    }
  }, req, res);
}

function _new(req, res) {
  req.session.controller = "events";
  res.render('events/new', {
    req: req,
    layout: 'layout/application'
  });
}

function _create(req, res) {
  req.session.controller = "events";
  var data = {
    start_time: req.body.start_time,
    name: req.body.name,
    detail: req.body.detail,
    duration: req.body.duration,
    tags: req.body.tags,
    session_id: req.session.user.session_id
  };
  ACS.Events.create(data, function(e) {
    if(e.success && e.success === true){
      logger.info('events#create: ' + JSON.stringify(e));
      req.session.msg = "Successfully create a event #"+e.events[0].id;
      res.redirect('/events');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/events/new');
    }
  }, req, res);
}

function _edit(req, res) {
  var data = {
    event_id: req.params.id
  };
  ACS.Events.show(data, function(e) {
    if(e.success && e.success === true){
      res.render('events/edit', {
        layout: 'layout/application',
        req: req,
        obj: e
      });
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/events');
    }
  }, req, res);
}

function _update(req, res) {
  req.session.controller = "events";
  var data = {
    event_id: req.params.id,
    start_time: req.body.start_time,
    name: req.body.name,
    detail: req.body.detail,
    duration: req.body.duration,
    tags: req.body.tags,
    session_id: req.session.user.session_id
  };
  ACS.Events.update(data, function(e) {
    if(e.success && e.success === true){
      logger.info('events#update: ' + JSON.stringify(e));
      req.session.msg = "Successfully update a event #"+e.events[0].id;
      res.redirect('/events');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/events/'+req.params.id+'/edit');
    }
  }, req, res);
}

function _destroy(req, res) {
  var data = {
    event_id: req.params.id,
    session_id: req.session.user.session_id
  };
  ACS.Events.remove(data, function(e) {
    if(e.success && e.success === true){
      logger.info('events#destroy: ' + JSON.stringify(e));
      req.session.msg = "Successfully delete a event #"+req.params.id;
      res.redirect('/events');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/events');
    }
  }, req, res);
}