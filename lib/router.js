/* Config */

Router.configure({
	layoutTemplate: 'base'
});

/* Middlewares */

Router.onBeforeAction(function(){
	if(!Meteor.userId()){
		this.redirect('/login');
	} else {
		this.next();
	}
}, {
	except: ['enroll', 'forgot', 'login']
});

/* Routes */

Router.route('/enroll/:token', function(){
	this.render('enroll', {
		data: {
			token: this.params.token
		}
	});
});

Router.route('/', {
	name: 'dashboard',
	onAfterAction: function () {
		document.title = 'Панель управления';
	}
});

Router.route('/login', {
	name: 'login',
	layoutTemplate: 'light',
	onAfterAction: function () {
		document.title = 'Авторизация';
	}
});

Router.route('/forgot', {
	name: 'forgot',
	layoutTemplate: 'light',
	onAfterAction: function () {
		document.title = 'Восстановление пароля';
	}
});