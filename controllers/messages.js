var ACS = require('acs').ACS,
    logger = require('acs').logger;

function _index(req, res) {
  req.session.controller = "messages";
  ACS.Messages.showInbox({per_page:1000, order:"-updated_at"}, function(e) {
    if(e.success && e.success === true){
      res.render('messages/index', {
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
  req.session.controller = "messages";
  var data = {
    message_id: req.params.id,
    session_id: req.session.user.session_id
  };
  ACS.Messages.show(data, function(e) {
    if(e.success && e.success === true){
      res.render('messages/show', {
        layout: 'layout/application',
        req: req,
        obj: e
      });
    }else{
      req.session.msg = e.message;
      res.redirect('/messages');
      logger.debug('Error: ' + JSON.stringify(e));
    }
  }, req, res);
}

function _sent(req, res) {
  req.session.controller = "messages";
  ACS.Messages.showSent({per_page:1000, order:"-updated_at"}, function(e) {
    if(e.success && e.success === true){
      res.render('messages/sent', {
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

function _thread(req, res) {
  req.session.controller = "messages";
  var data = {
    thread_id: req.params.id,
    session_id: req.session.user.session_id
  };
  ACS.Messages.showThread(data, function(e) {
    if(e.success && e.success === true){
      res.render('messages/thread', {
        layout: 'layout/application',
        req: req,
        obj: e
      });
    }else{
      req.session.msg = e.message;
      res.redirect('/messages');
      logger.debug('Error: ' + JSON.stringify(e));
    }
  }, req, res);
}

function _threads(req, res) {
  req.session.controller = "messages";
  ACS.Messages.showThreads({per_page:1000, order:"-updated_at"}, function(e) {
    if(e.success && e.success === true){
      res.render('messages/threads', {
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

function _new(req, res) {
  req.session.controller = "messages";
  res.render('messages/new', {
    req: req,
    layout: 'layout/application'
  });
}

function reply(req, res) {
  req.session.controller = "messages";
  res.render('messages/reply', {
    req: req,
    layout: 'layout/application'
  });
}

function _create(req, res) {
  req.session.controller = "messages";
  var data = {
    to_ids: req.body.to_ids,
    subject: req.body.subject,
    body: req.body.body,
    session_id: req.session.user.session_id
  };
  ACS.Messages.create(data, function(e) {
    if(e.success && e.success === true){
      logger.info('messages#create: ' + JSON.stringify(e));
      req.session.msg = "Successfully create a messages #"+e.messages[0].id;
      res.redirect('/messages');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/messages/new');
    }
  }, req, res);
}

function _reply(req, res) {
  req.session.controller = "messages";
  var data = {
    message_id: req.params.id,
    subject: req.body.subject,
    body: req.body.body,
    session_id: req.session.user.session_id
  };
  ACS.Messages.reply(data, function(e) {
    if(e.success && e.success === true){
      logger.info('messages#create: ' + JSON.stringify(e));
      req.session.msg = "Successfully replied a message #"+e.messages[0].id;
      res.redirect('/messages');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/messages/new');
    }
  }, req, res);
}

function _destroy(req, res) {
  req.session.controller = "messages";
  var data = {
    message_id: req.params.id,
    session_id: req.session.user.session_id
  };
  ACS.Messages.remove(data, function(e) {
    if(e.success && e.success === true){
      logger.info('messages#destroy: ' + JSON.stringify(e));
      req.session.msg = "Successfully delete a message.";
      res.redirect('/messages');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/messages');
    }
  }, req, res);
}

function _destroyThread(req, res) {
  req.session.controller = "messages";
  var data = {
    thread_id: req.params.id,
    session_id: req.session.user.session_id
  };
  ACS.Messages.removeThread(data, function(e) {
    if(e.success && e.success === true){
      logger.info('messages#destroyThread: ' + JSON.stringify(e));
      req.session.msg = "Successfully delete a thread.";
      res.redirect('/messages');
    }else{
      logger.debug('Error: ' + JSON.stringify(e));
      req.session.msg = e.message;
      res.redirect('/messages');
    }
  }, req, res);
}