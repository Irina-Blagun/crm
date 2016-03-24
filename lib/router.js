
/**
 * Проверяем залогинен ли юзер, если нет,
 * то перекидываем на страницу авторизации
 */
//Router.onBeforeAction(function(){
//	if(!Meteor.userId()){
//		this.render('login');
//	} else {
//		this.next();
//	}
//});

Router.route('/enroll/:token', function(){
	// TODO: Сделать проверку токена

	this.render('enroll', {
		data: {
			token: this.params.token
		}
	});
});

Router.route('/', function(){
	this.render('dashboard');
});

Router.route('/login', function(){
	this.render('login');
});

Router.route('/forgot', function(){
	this.render('forgot');
});