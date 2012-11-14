var ACS = require('acs').ACS,
    logger = require('acs').logger;

function _index(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "friends";
    ACS.Friends.search({per_page:1000, order:"-updated_at", user_id:req.session.user.id}, function(e) {
      if(e.success && e.success === true){
        res.render('friends/index', {
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

function _requests(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "friends";
    ACS.Friends.requests({per_page:1000, order:"-updated_at"}, function(e) {
      if(e.success && e.success === true){
        res.render('friends/requests', {
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
    req.session.controller = "friends";
    res.render('friends/new', {
      req: req,
      layout: 'layout/application'
    });
  });
}

function _add(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "friends";
    var data = {
      user_ids: req.body.user_ids
    };
    ACS.Friends.add(data, function(e) {
      if(e.success && e.success === true){
        logger.info('friends#add: ' + JSON.stringify(e));
        req.session.flash = {msg:"Friend(s) added", r:0};
        res.redirect('/friends');
      }else{
        logger.debug('Error: ' + JSON.stringify(e));
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/friends/new');
      }
    }, req, res);
  });
}

function _approve(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "friends";
    var data = {
      user_ids: req.params.id
    };
    ACS.Friends.approve(data, function(e) {
      if(e.success && e.success === true){
        logger.info('friends#approve: ' + JSON.stringify(e));
        req.session.flash = {msg:"Friend(s) approved.", r:0};
        res.redirect('/friends');
      }else{
        logger.debug('Error: ' + JSON.stringify(e));
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/friends');
      }
    }, req, res);
  });
}

function _remove(req, res) {
  req.session.check(req, res, function(){
    req.session.controller = "friends";
    var data = {
      user_ids: req.params.id
    };
    ACS.Friends.remove(data, function(e) {
      if(e.success && e.success === true){
        logger.info('friends#remove: ' + JSON.stringify(e));
        req.session.flash = {msg:"Friend(s) removed", r:0};
        res.redirect('/friends');
      }else{
        logger.debug('Error: ' + JSON.stringify(e));
        req.session.flash = {msg:e.message, r:0};
        res.redirect('/friends');
      }
    }, req, res);
  });
}