/* Config */

Router.configure({
	layoutTemplate: 'base',
	loadingTemplate: 'loading'
});

/* Middlewares */

Router.onBeforeAction(function(){
	if(!Meteor.userId()){
		this.redirect('/login');
	} else {
		this.subscribe('company', Meteor.companyId());
		this.subscribe('stores');
		this.subscribe('providers');
		this.subscribe('allStores');
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
		return Meteor.subscribe('users', Meteor.companyId());
	},
	data: function(){
		return Users.find({ 'profile.cid': Meteor.companyId() })
	}
});

Router.route('/profile', {
	name: 'profile',
	onAfterAction: function (){
		document.title = 'Профиль';
	},
	waitOn: function(){
		return Meteor.subscribe('user');
	}
});

Router.route('/company', {
	name: 'company',
	onAfterAction: function (){
		document.title = 'Компания';
	},
	waitOn: function(){
		return Meteor.subscribe('company');
	}
});

Router.route('/stores', {
	name: 'stores',
	onAfterAction: function (){
		document.title = 'Магазины';
	},
	waitOn: function(){
		return Meteor.subscribe('stores');
	}
});

Router.route('/providers', {
	name: 'providers',
	onAfterAction: function (){
		document.title = 'Компании';
	},
	waitOn: function(){
		return Meteor.subscribe('providers');
	}
});

Router.before(function(){
	clearMessages();
	this.next();
});