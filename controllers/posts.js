var ACS = require('acs').ACS,
    logger = require('acs').logger;

function _index(req, res) {
  req.session.controller = "posts";
  ACS.Posts.query({per_page:1000, order:"-updated_at", user_id:req.session.user.id}, function(e) {
    if(e.success && e.success === true){
      res.render('posts/index', {
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
  req.session.controller = "posts";
  var data = {
    post_id: req.params.id
  };
  ACS.Posts.show(data, function(e) {
    if(e.success && e.success === true){
      res.render('posts/show', {
        layout: 'layout/application',
        req: req,
        obj: e
      });
    }else{
      req.session.msg = e.message;
      res.redirect('/posts');
      logger.debug('Error: ' + JSON.stringify(e));
    }
  }, req, res);
}

function _new(req, res) {
  req.session.controller = "posts";
  res.render('posts/new', {
    req: req,
    layout: 'layout/application'
  });
}

function _create(req, res) {
  req.session.controller = "posts";
  var data = {
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    session_id: req.session.user.session_id
  };
  ACS.Posts.create(data, function(e) {
    if(e.success && e.success === true){
      logger.info('posts#create: ' + JSON.stringify(e));
      req.session.msg = "Successfully create a post #"+e.posts[0].id;
      res.redirect('/posts');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/posts/new');
    }
  }, req, res);
}

function _edit(req, res) {
  req.session.controller = "posts";
  var data = {
    post_id: req.params.id
  };
  ACS.Posts.show(data, function(e) {
    if(e.success && e.success === true){
      res.render('posts/edit', {
        layout: 'layout/application',
        req: req,
        obj: e
      });
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/posts');
    }
  }, req, res);
}

function _update(req, res) {
  req.session.controller = "posts";
  var data = {
    post_id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    session_id: req.session.user.session_id
  };
  logger.debug(JSON.stringify(data));
  ACS.Posts.update(data, function(e) {
    if(e.success && e.success === true){
      logger.info('posts#update: ' + JSON.stringify(e));
      req.session.msg = "Successfully update a post #"+e.posts[0].id;
      res.redirect('/posts');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/posts/'+req.params.id+'/edit');
    }
  }, req, res);
}

function _destroy(req, res) {
  req.session.controller = "posts";
  var data = {
    post_id: req.params.id,
    session_id: req.session.user.session_id
  };
  ACS.Posts.remove(data, function(e) {
    if(e.success && e.success === true){
      logger.info('posts#destroy: ' + JSON.stringify(e));
      req.session.msg = "Successfully delete a post #"+req.params.id;
      res.redirect('/posts');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/posts');
    }
  }, req, res);
}