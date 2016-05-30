/* Config */

Router.configure({
	layoutTemplate: 'base',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

/* Middlewares */

Router.onBeforeAction(function(){
	if(!Meteor.userId()){
			//this.render('login');
			//this.layout('light');
			this.next();
	} else {
		this.subscribe('company', Meteor.companyId());
		this.subscribe('stores');
		this.subscribe('providers');
		this.subscribe('allStores');
		this.subscribe('units');
		this.subscribe('products');
		this.subscribe('accounting');
		this.subscribe('users');
		this.subscribe('orders');
		this.subscribe('ordersProducts');
		this.subscribe('users1');
		this.subscribe('tree');
		this.next();
	}
}, {
	//except: ['enroll', 'forgot', 'login', 'reset']
	except: ['enroll', 'forgot', 'reset']
});

/* Routes */

Router.route('/enroll-account/:token', function(){
	this.render('enroll', {
		data: {
			token: this.params.token
		}
	});
	this.layout('light');
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

Router.route('/reset-password/:token', function(){
	this.render('reset', {
		data: {
			token: this.params.token
		}
	});
	this.layout('light');
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


		var localStore = localStorage.getItem('store');

		if(localStore){
			Session.set('store', localStore);
		} else {
			var store = Stores.find().fetch()[0];

			if(store){
				localStore.set('store', store._id);
				Session.set('store', store._id);
			}
		}

	},
	waitOn: function(){
		return Meteor.subscribe('stores');
	}
});

Router.route('/units', {
	name: 'units',
	onAfterAction: function (){
		document.title = 'Единицы измерения';
	},
	waitOn: function(){
		return Meteor.subscribe('units');
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

Router.route('/productsAccounting', {
	name: 'productsAccounting',
	onAfterAction: function (){
		document.title = 'Товары и учёт';

		var localStore = localStorage.getItem('store');

		if(localStore){
			Session.set('store', localStore);
		} else {
			var store = Stores.find().fetch()[0];

			if(store){
				localStore.set('store', store._id);
				Session.set('store', store._id);
			}
		}
	},
	layoutTemplate: 'store',
	waitOn: function(){
		return Meteor.subscribe('products', 'accounting', 'users1', 'tree');
	}
});

Router.route('/account', {
	name: 'account',
	onAfterAction: function(){
		document.title = 'Личная информация';
	},
	waitOn: function(){
		return Meteor.subscribe('users', Meteor.companyId());
	}
});

Router.route('/orders', {
	name: 'orders',
	onAfterAction: function(){
		document.title = 'Заказы';
	},
	waitOn: function(){
		return Meteor.subscribe('orders', 'products', 'accounting', 'users', 'ordersProducts', 'company');
	}
});

Router.route('/sales', {
	name: 'storeSales',
	onAfterAction: function (){
		document.title = 'Продажи';
	},
	waitOn: function(){
		return Meteor.subscribe('products', 'accounting');
	}
});

Router.before(function(){
	clearMessages();
	this.next();
});