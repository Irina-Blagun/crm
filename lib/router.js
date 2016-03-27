/* Config */

Router.configure({
	layoutTemplate: 'base'
});

/* Middlewares */

Router.onBeforeAction(function(){
	if(!Meteor.userId()){
		this.redirect('/login');
	} else {
		this.subscribe('company');
		this.subscribe('stores');
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
	subscriptions: function(){
		this.subscribe('company');
	},
	onAfterAction: function (){
		document.title = 'Панель управления';
	}
});

Router.route('/login', {
	name: 'login',
	layoutTemplate: 'light',
	onAfterAction: function (){
		document.title = 'Авторизация';
	}
});

Router.route('/forgot', {
	name: 'forgot',
	layoutTemplate: 'light',
	onAfterAction: function (){
		document.title = 'Восстановление пароля';
	}
});

Router.route('/users', {
	name: 'users',
	onAfterAction: function(){
		document.title = 'Cотрудники';
	},
	waitOn: function(){
		return Meteor.subscribe('users')
	}
});

Router.before(function(){
	clearMessages();
	this.next();
});