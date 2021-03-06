exports.dashboard = function(req, res){
  res.render('main', 
               {
                 title: 'Dashboard', 
                 pageHeader: 'Dashboard',
                 user: req.session.user
               });
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};