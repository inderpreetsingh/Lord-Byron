Router.route('/', function() {
    this.render('main');
});

Router.route('/open', function() {
	this.render('docList');
});
