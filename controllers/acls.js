var ACS = require('acs').ACS,
    logger = require('acs').logger;

function _index(req, res) {
  req.session.controller = "acls";
  res.render('acls/index', {
    req: req,
    layout: 'layout/application'
  });  
}

function _show(req, res) {
  req.session.controller = "acls";
  if(req.query.name !== ""){
    var data = {
      name: req.query.name
    };
  }else{
    var data = {
      acl_id: req.query.acl_id
    };
  }
  ACS.ACLs.show(data, function(e) {
    if(e.success && e.success === true){
      res.render('acls/show', {
        layout: 'layout/application',
        req: req,
        obj: e
      });
    }else{
      req.session.flash = {msg: e.message, r:0};
      res.redirect('/acls');
      logger.debug('Error: ' + JSON.stringify(e));
    }
  }, req, res);
}

function _new(req, res) {
  req.session.controller = "acls";
  res.render('acls/new', {
    req: req,
    layout: 'layout/application'
  });
}

function _create(req, res) {
  req.session.controller = "acls";
  var data = {
    name: req.body.name,
    reader_ids: req.body.reader_ids,
    writer_ids: req.body.writer_ids,
    public_read: req.body.public_read,
    public_write: req.body.public_write,
    session_id: req.session.user.session_id
  };
  ACS.ACLs.create(data, function(e) {
    if(e.success && e.success === true){
      logger.info('acls#create: ' + JSON.stringify(e));
      req.session.flash = {msg: "Successfully create an ACL #"+e.acls[0].id, r:0};
      res.redirect('/acls');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.flash = {msg: e.message, r:0};
      res.redirect('/acls/new');
    }
  }, req, res);
}

function _edit(req, res) {
  req.session.controller = "acls";
  var data = {
    id: req.body.id,
    name: req.body.name,
    reader_ids: req.body.reader_ids,
    writer_ids: req.body.writer_ids,
    public_read: req.body.public_read,
    public_write: req.body.public_write,
    session_id: req.session.user.session_id
  };
  ACS.ACLs.show(data, function(e) {
    if(e.success && e.success === true){
      res.render('acls/edit', {
        layout: 'layout/application',
        req: req,
        obj: e
      });
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.flash = {msg: e.message, r:0};
      res.redirect('/acls');
    }
  }, req, res);
}

function _update(req, res) {
  req.session.controller = "acls";
  var data = {
    post_id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    session_id: req.session.user.session_id
  };
  logger.debug(JSON.stringify(data));
  ACS.ACLs.update(data, function(e) {
    if(e.success && e.success === true){
      logger.info('acls#update: ' + JSON.stringify(e));
      req.session.flash = {msg: "Successfully update a post #"+e.acls[0].id, r:0};
      res.redirect('/acls');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.flash = {msg: e.message, r:0};
      res.redirect('/acls/'+req.params.id+'/edit');
    }
  }, req, res);
}

function _destroy(req, res) {
  req.session.controller = "acls";
  var data = {
    post_id: req.params.id,
    session_id: req.session.user.session_id
  };
  ACS.ACLs.remove(data, function(e) {
    if(e.success && e.success === true){
      logger.info('acls#destroy: ' + JSON.stringify(e));
      req.session.flash = {msg: "Successfully delete a post #"+req.params.id, r:0};
      res.redirect('/acls');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.flash = {msg: e.message, r:0};
      res.redirect('/acls');
    }
  }, req, res);
}