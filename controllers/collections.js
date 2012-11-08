var ACS = require('acs').ACS,
    logger = require('acs').logger;

function _index(req, res) {
  req.session.controller = "collections";
  ACS.PhotoCollections.search({per_page:1000, order:"-updated_at", user_id:req.session.user.id}, function(e) {
    if(e.success && e.success === true){
      res.render('collections/index', {
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
  req.session.controller = "collections";
  var data = {
    collection_id: req.params.id
  };
  ACS.PhotoCollections.show(data, function(e) {
    if(e.success && e.success === true){
      res.render('collections/show', {
        layout: 'layout/application',
        req: req,
        obj: e
      });
    }else{
      req.session.msg = e.message;
      res.redirect('/collections');
      logger.debug('Error: ' + JSON.stringify(e));
    }
  }, req, res);
}

function _new(req, res) {
  req.session.controller = "collections";
  res.render('collections/new', {
    req: req,
    layout: 'layout/application'
  });
}

function _create(req, res) {
  req.session.controller = "collections";
  var data = {
    name: req.body.name,
    tags: req.body.tags,
    session_id: req.session.user.session_id
  };
  // acs-api bug, it should accept empty string as well.
  if(req.body.parent_collection_id !== ""){data.parent_collection_id = req.body.parent_collection_id;}
  if(req.body.cover_photo_id !== ""){data.cover_photo_id = req.body.cover_photo_id;}
  ACS.PhotoCollections.create(data, function(e) {
    if(e.success && e.success === true){
      logger.info('collections#create: ' + JSON.stringify(e));
      req.session.msg = "Successfully create a collection #"+e.collections[0].id;
      res.redirect('/collections');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/collections/new');
    }
  }, req, res);
}

function _edit(req, res) {
  req.session.controller = "collections";
  var data = {
    collection_id: req.params.id
  };
  ACS.PhotoCollections.show(data, function(e) {
    if(e.success && e.success === true){
      res.render('collections/edit', {
        layout: 'layout/application',
        req: req,
        obj: e
      });
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/collections');
    }
  }, req, res);
}

function _update(req, res) {
  req.session.controller = "collections";
  var data = {
    collection_id: req.params.id,
    name: req.body.name,
    parent_collection_id: req.body.parent_collection_id,
    cover_photo_id: req.body.cover_photo_id,
    tags: req.body.tags,
    session_id: req.session.user.session_id
  };
  logger.debug(JSON.stringify(data));
  ACS.PhotoCollections.update(data, function(e) {
    if(e.success && e.success === true){
      logger.info('collections#update: ' + JSON.stringify(e));
      req.session.msg = "Successfully update a collection #"+e.collections[0].id;
      res.redirect('/collections');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/collections/'+req.params.id+'/edit');
    }
  }, req, res);
}

function _destroy(req, res) {
  req.session.controller = "collections";
  var data = {
    collection_id: req.params.id,
    session_id: req.session.user.session_id
  };
  ACS.PhotoCollections.remove(data, function(e) {
    if(e.success && e.success === true){
      logger.info('collections#destroy: ' + JSON.stringify(e));
      req.session.msg = "Successfully delete a collection #"+req.params.id;
      res.redirect('/collections');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/collections');
    }
  }, req, res);
}