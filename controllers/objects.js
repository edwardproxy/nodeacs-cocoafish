var ACS = require('acs').ACS,
    logger = require('acs').logger;

function _start(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "objects";
    if(!req.query.classname){
      res.render('objects/start', {
        req: req,
        layout: 'layout/application'
      });
    }else{
      res.redirect('/objects/'+req.query.classname);
    }
  });
}

function _index(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "objects";
    var data = {
      per_page:1000,
      order:"-updated_at",
      classname: req.params.classname,
      where:"{\"user_id\":\""+req.session.user.id+"\"}"
    };
    ACS.Objects.query(data, function(e) {
      if(e.success && e.success === true){
        res.render('objects/index', {
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
    req.session.controller = "objects";
    var data = {
      classname: req.params.classname,
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
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/objects');
        logger.debug('Error: ' + JSON.stringify(e));
      }
    }, req, res);
  });
}

function _new(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "objects";
    res.render('objects/new', {
      req: req,
      layout: 'layout/application'
    });
  });
}

function _create(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "objects";
    var a = {};
    for(var f in req.body){
      if(f.toString() !== "tags" && f.toString() !== "classname"){
        a[f] = req.body[f].v;
      }
    }
    var data = {
      classname: req.body.classname,
      tags: req.body.tags,
      fields: a
    };
    ACS.Objects.create(data, function(e) {
      if(e.success && e.success === true){
        logger.info('objects#create: ' + JSON.stringify(e));
        req.session.flash = {msg:"Successfully create an object #"+e[data.classname][0].id, r:0};
        res.redirect('/objects/'+data.classname);
      }else{
        logger.debug('Error: ' + JSON.stringify(e));
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/objects/new');
      }
    }, req, res);
  });
}

function _edit(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "objects";
    var data = {
      classname: req.params.classname,
      id: req.params.id
    };
    ACS.Objects.show(data, function(e) {
      if(e.success && e.success === true){
        res.render('objects/edit', {
          layout: 'layout/application',
          req: req,
          obj: e
        });
      }else{
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/objects');
        logger.debug('Error: ' + JSON.stringify(e));
      }
    }, req, res);
  });
}

function _update(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "objects";
    var a = {};
    for(var f in req.body){
      if(f.toString() !== "tags" && f.toString() !== "classname"){
        a[f] = req.body[f].v;
      }
    }
    var data = {
      id: req.params.id,
      classname: req.body.classname,
      tags: req.body.tags,
      fields: a
    };
    ACS.Objects.update(data, function(e) {
      if(e.success && e.success === true){
        logger.info('objects#create: ' + JSON.stringify(e));
        req.session.flash = {msg:"Successfully update an object #"+e[data.classname][0].id, r:0};
        res.redirect('/objects/'+data.classname);
      }else{
        logger.debug('Error: ' + JSON.stringify(e));
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/objects/edit');
      }
    }, req, res);
  });
}

function _destroy(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "objects";
    var data = {
      classname: req.params.classname,
      id: req.params.id
    };
    ACS.Objects.remove(data, function(e) {
      if(e.success && e.success === true){
        logger.info('objects#destroy: ' + JSON.stringify(e));
        req.session.flash = {msg:"Successfully delete an object #"+req.params.id, r:0};
        res.redirect('/objects');
      }else{
        logger.debug('Error: ' + JSON.stringify(e));
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/objects');
      }
    }, req, res);
  });
}