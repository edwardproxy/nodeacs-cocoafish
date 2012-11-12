var ACS = require('acs').ACS,
    logger = require('acs').logger;

function _start(req, res) {
  req.session.controller = "reviews";
  if(!req.query.type && !req.query.type_id){
    res.render('reviews/start', {
      req: req,
      layout: 'layout/application'
    });
  }else{
    res.redirect('/reviews/'+req.query.type+'/'+req.query.type_id);
  }
}

function _index(req, res) {
  req.session.controller = "reviews";
  var data = {
    per_page:1000,
    order:"-updated_at",
    user_id:req.session.user.id
  }
  data[req.params.type+"_id"] = req.params.type_id;
  ACS.Reviews.query(data, function(e) {
    if(e.success && e.success === true){
      res.render('reviews/index', {
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

function _show(req, res) {
  req.session.controller = "reviews";
  var data = {
    review_id: req.params.id
  };
  data[req.params.type+"_id"] = req.params.type_id;
  ACS.Reviews.show(data, function(e) {
    if(e.success && e.success === true){
      res.render('reviews/show', {
        layout: 'layout/application',
        req: req,
        obj: e
      });
    }else{
      req.session.flash = {msg:e.message, r:0};
      res.redirect('/reviews');
      logger.debug('Error: ' + JSON.stringify(e));
    }
  }, req, res);
}

function _new(req, res) {
  req.session.controller = "reviews";
  res.render('reviews/new', {
    req: req,
    layout: 'layout/application'
  });
}

function _create(req, res) {
  req.session.controller = "reviews";
  var data = {
    rating: req.body.rating,
    content: req.body.content,
    tags: req.body.tags,
    session_id: req.session.user.session_id
  };
  data[req.body.type+"_id"]=req.body.type_id;
  logger.debug(JSON.stringify(data));
  ACS.Reviews.create(data, function(e) {
    if(e.success && e.success === true){
      logger.info('reviews#create: ' + JSON.stringify(e));
      req.session.flash = {msg:"Successfully create a review #"+e.reviews[0].id, r:0};
      res.redirect('/reviews'+req.body.type+'/'+req.body.type_id)
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.flash = {msg:e.message, r:0};
      res.redirect('/reviews/new');
    }
  }, req, res);
}

function _edit(req, res) {
  req.session.controller = "reviews";
  var data = {
    review_id: req.params.id
  };
  data[req.params.type+"_id"] = req.params.type_id;
  ACS.Reviews.show(data, function(e) {
    if(e.success && e.success === true){
      res.render('reviews/edit', {
        layout: 'layout/application',
        req: req,
        obj: e
      });
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.flash = {msg:e.message, r:0};
      res.redirect('/reviews');
    }
  }, req, res);
}

function _update(req, res) {
  req.session.controller = "reviews";
  var data = {
    review_id: req.params.id,
    rating: req.body.rating,
    content: req.body.content,
    tags: req.body.tags,
    session_id: req.session.user.session_id
  };
  data[req.params.type+"_id"] = req.params.type_id;
  ACS.Reviews.update(data, function(e) {
    if(e.success && e.success === true){
      logger.info('reviews#update: ' + JSON.stringify(e));
      req.session.flash = {msg:"Successfully update a review #"+e.reviews[0].id, r:0};
      res.redirect('/reviews'+req.params.type+'/'+req.params.type_id);
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.flash = {msg:e.message, r:0};
      res.redirect('/reviews/'+req.params.id+'/edit');
    }
  }, req, res);
}

function _destroy(req, res) {
  req.session.controller = "reviews";
  var data = {
    review_id: req.params.id,
    session_id: req.session.user.session_id
  };
  ACS.Reviews.remove(data, function(e) {
    if(e.success && e.success === true){
      logger.info('reviews#destroy: ' + JSON.stringify(e));
      req.session.flash = {msg:"Successfully delete a review #"+req.params.id, r:0};
      res.redirect('/reviews');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.flash = {msg:e.message, r:0};
      res.redirect('/reviews');
    }
  }, req, res);
}