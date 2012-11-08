var ACS = require('acs').ACS,
    logger = require('acs').logger;

function _index(req, res) {
  req.session.controller = "objects";
  ACS.Objects.query({per_page:1000, order:"-updated_at", classname: 'cars', where:"{\"user_id\":\""+req.session.user.id+"\"}"}, function(e) {
    if(e.success && e.success === true){
      res.render('objects/index', {
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
  req.session.controller = "objects";
  var data = {
    id: req.params.id
  };
  ACS.Objects.show(data, function(e) {
    if(e.success && e.success === true){
      res.render('objects/show', {
        layout: 'layout/application',
        req: req,
        obj: e
      });
    }else{
      req.session.msg = e.message;
      res.redirect('/objects');
      logger.debug('Error: ' + JSON.stringify(e));
    }
  }, req, res);
}

function _new(req, res) {
  req.session.controller = "objects";
  res.render('objects/new', {
    req: req,
    layout: 'layout/application'
  });
}

function _create(req, res) {
  req.session.controller = "objects";
  var data = {
    classname: 'cars',
    fields: {
        make: 'nissan',
        color: 'blue',
        year: 2005
    }
  };
  ACS.Objects.create(data, function(e) {
    if(e.success && e.success === true){
      logger.info('objects#create: ' + JSON.stringify(e));
      req.session.msg = "Successfully create a place #"+e.objects[0].id;
      res.redirect('/objects');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/objects/new');
    }
  }, req, res);
}

function _destroy(req, res) {
  req.session.controller = "objects";
  var data = {
    id: req.params.id,
    session_id: req.session.user.session_id
  };
  ACS.Objects.remove(data, function(e) {
    if(e.success && e.success === true){
      logger.info('objects#destroy: ' + JSON.stringify(e));
      req.session.msg = "Successfully delete a place #"+req.params.id;
      res.redirect('/objects');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/objects');
    }
  }, req, res);
}