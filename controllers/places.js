var ACS = require('acs').ACS,
    logger = require('acs').logger;

function _index(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "places";
    var data = {
      per_page:1000,
      order:"-updated_at",
      where:"{\"user_id\":\""+req.session.user.id+"\"}"
    };
    ACS.Places.query(data, function(e) {
      if(e.success && e.success === true){
        res.render('places/index', {
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
    req.session.controller = "places";
    var data = {
      place_id: req.params.id
    };
    ACS.Places.show(data, function(e) {
      if(e.success && e.success === true){
        res.render('places/show', {
          layout: 'layout/application',
          req: req,
          obj: e
        });
      }else{
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/places');
        logger.debug('Error: ' + JSON.stringify(e));
      }
    }, req, res);
  });
}

function _new(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "places";
    res.render('places/new', {
      req: req,
      layout: 'layout/application'
    });
  });
}

function _create(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "places";
    var data = {
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      postal_code: req.body.postal_code
    };
    ACS.Places.create(data, function(e) {
      if(e.success && e.success === true){
        logger.info('places#create: ' + JSON.stringify(e));
        req.session.flash = {msg:"Successfully create a place #"+e.places[0].id, r:0};
        res.redirect('/places');
      }else{
        logger.debug('Error: ' + JSON.stringify(e));
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/places/new');
      }
    }, req, res);
  });
}

function _edit(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "places";
    var data = {
      place_id: req.params.id
    };
    ACS.Places.show(data, function(e) {
      if(e.success && e.success === true){
        res.render('places/edit', {
          layout: 'layout/application',
          req: req,
          obj: e
        });
      }else{
        logger.debug('Error: ' + JSON.stringify(e));
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/places');
      }
    }, req, res);
  });
}

function _update(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "places";
    var data = {
      place_id: req.params.id,
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      postal_code: req.body.postal_code
    };
    ACS.Places.update(data, function(e) {
      if(e.success && e.success === true){
        logger.info('places#update: ' + JSON.stringify(e));
        req.session.flash = {msg:"Successfully update a place #"+e.places[0].id, r:0};
        res.redirect('/places');
      }else{
        logger.debug('Error: ' + JSON.stringify(e));
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/places/'+req.params.id+'/edit');
      }
    }, req, res);
  });
}

function _destroy(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "places";
    var data = {
      place_id: req.params.id
    };
    ACS.Places.remove(data, function(e) {
      if(e.success && e.success === true){
        logger.info('places#destroy: ' + JSON.stringify(e));
        req.session.flash = {msg:"Successfully delete a place #"+req.params.id, r:0};
        res.redirect('/places');
      }else{
        logger.debug('Error: ' + JSON.stringify(e));
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/places');
      }
    }, req, res);
  });
}