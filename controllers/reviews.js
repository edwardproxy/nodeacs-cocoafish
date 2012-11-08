var ACS = require('acs').ACS,
    logger = require('acs').logger;

function _index(req, res) {
  req.session.controller = "reviews";
  ACS.Reviews.query({per_page:1000, order:"-updated_at", user_id:req.session.user.id}, function(e) {
    if(e.success && e.success === true){
      res.render('reviews/index', {
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
  req.session.controller = "reviews";
  var data = {
    review_id: req.params.id
  };
  ACS.Reviews.show(data, function(e) {
    if(e.success && e.success === true){
      res.render('reviews/show', {
        layout: 'layout/application',
        req: req,
        obj: e
      });
    }else{
      req.session.msg = e.message;
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
      req.session.msg = "Successfully create a post #"+e.reviews[0].id;
      res.redirect('/reviews');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/reviews/new');
    }
  }, req, res);
}

function _edit(req, res) {
  req.session.controller = "reviews";
  var data = {
    review_id: req.params.id
  };
  ACS.Reviews.show(data, function(e) {
    if(e.success && e.success === true){
      res.render('reviews/edit', {
        layout: 'layout/application',
        req: req,
        obj: e
      });
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
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
  logger.debug(JSON.stringify(data));
  ACS.Reviews.update(data, function(e) {
    if(e.success && e.success === true){
      logger.info('reviews#update: ' + JSON.stringify(e));
      req.session.msg = "Successfully update a post #"+e.reviews[0].id;
      res.redirect('/reviews');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
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
      req.session.msg = "Successfully delete a post #"+req.params.id;
      res.redirect('/reviews');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/reviews');
    }
  }, req, res);
}