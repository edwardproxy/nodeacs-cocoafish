var ACS = require('acs').ACS,
    logger = require('acs').logger;

function _index(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "messages";
    var data = {
      per_page:1000,
      order:"-updated_at"
    };
    ACS.Messages.showInbox(data, function(e) {
      if(e.success && e.success === true){
        res.render('messages/index', {
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
    req.session.controller = "messages";
    var data = {
      message_id: req.params.id
    };
    ACS.Messages.show(data, function(e) {
      if(e.success && e.success === true){
        res.render('messages/show', {
          layout: 'layout/application',
          req: req,
          obj: e
        });
      }else{
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/messages');
        logger.debug('Error: ' + JSON.stringify(e));
      }
    }, req, res);
  });
}

function _sent(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "messages";
    var data = {
      per_page:1000,
      order:"-updated_at"
    };
    ACS.Messages.showSent(data, function(e) {
      if(e.success && e.success === true){
        res.render('messages/sent', {
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

function _thread(req, res) {
  req.session.controller = "messages";
  var data = {
    thread_id: req.params.id
  };
  ACS.Messages.showThread(data, function(e) {
    if(e.success && e.success === true){
      res.render('messages/thread', {
        layout: 'layout/application',
        req: req,
        obj: e
      });
    }else{
      req.session.flash = {msg:e.message, r:0};
      res.redirect('/messages');
      logger.debug('Error: ' + JSON.stringify(e));
    }
  }, req, res);
}

function _threads(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "messages";
    var data = {
      per_page:1000,
      order:"-updated_at"
    };
    ACS.Messages.showThreads(data, function(e) {
      if(e.success && e.success === true){
        res.render('messages/threads', {
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

function _new(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "messages";
    res.render('messages/new', {
      req: req,
      layout: 'layout/application'
    });
  });
}

function reply(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "messages";
    res.render('messages/reply', {
      req: req,
      layout: 'layout/application'
    });
  });
}

function _create(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "messages";
    var data = {
      to_ids: req.body.to_ids,
      subject: req.body.subject,
      body: req.body.body
    };
    ACS.Messages.create(data, function(e) {
      if(e.success && e.success === true){
        logger.info('messages#create: ' + JSON.stringify(e));
        req.session.flash = {msg:"Successfully create a messages #"+e.messages[0].id, r:0};
        res.redirect('/messages');
      }else{
        logger.debug('Error: ' + JSON.stringify(e));
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/messages/new');
      }
    }, req, res);
  });
}

function _reply(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "messages";
    var data = {
      message_id: req.params.id,
      subject: req.body.subject,
      body: req.body.body
    };
    ACS.Messages.reply(data, function(e) {
      if(e.success && e.success === true){
        logger.info('messages#create: ' + JSON.stringify(e));
        req.session.flash = {msg:"Successfully replied a message #"+e.messages[0].id, r:0};
        res.redirect('/messages');
      }else{
        logger.debug('Error: ' + JSON.stringify(e));
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/messages/new');
      }
    }, req, res);
  });
}

function _destroy(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "messages";
    var data = {
      message_id: req.params.id
    };
    ACS.Messages.remove(data, function(e) {
      if(e.success && e.success === true){
        logger.info('messages#destroy: ' + JSON.stringify(e));
        req.session.flash = {msg:"Successfully delete a message.", r:0};
        res.redirect('/messages');
      }else{
        logger.debug('Error: ' + JSON.stringify(e));
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/messages');
      }
    }, req, res);
  });
}

function _destroyThread(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "messages";
    var data = {
      thread_id: req.params.id
    };
    ACS.Messages.removeThread(data, function(e) {
      if(e.success && e.success === true){
        logger.info('messages#destroyThread: ' + JSON.stringify(e));
        req.session.flash = {msg:"Successfully delete a thread.", r:0};
        res.redirect('/messages');
      }else{
        logger.debug('Error: ' + JSON.stringify(e));
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/messages');
      }
    }, req, res);
  });
}