/* Config */

Router.configure({
	layoutTemplate: 'base',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

/* Middlewares */
//
Router.onBeforeAction(function(){
	if(Meteor.userId()){
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
	} else {
		this.redirect('login');
		this.next();
	}
}, {
	only: ['dashboard', 'orders', 'users', 'profile', 'stores', 'units', 'providers', 'productsAccounting', 'account', 'orders', 'storeSales']
});

/* Routes */

Router.route('/enroll-account/:token', function(){
	if(!Meteor.userId()) {
		this.render('enroll', {
			data: {
				token: this.params.token
			}
		});
		this.layout('light');
	} else {
		this.redirect('dashboard');
	}
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
	if(!Meteor.userId()) {
		this.render('reset', {
			data: {
				token: this.params.token
			}
		});
		this.layout('light');
	} else {
		this.redirect('dashboard');
	}
});

Router.route('/users', {
	name: 'users',
	onBeforeAction: function (){
		if(Meteor.userCheckAccess(1)) {
			this.next()
		} else {
			this.layout("notFound");
			document.title = 'Страница не найдена';
		}
	},
	onAfterAction: function (){
		if (Meteor.userCheckAccess(1)) {
			this.render('users');
			document.title = 'Сотрудники';
		}
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

Router.route('/stores', {
	name: 'stores',
	onAfterAction: function (){
		if(!Meteor.userId()){
			this.redirect("login");
		} else {
			this.render('stores');

			document.title = 'Магазины';

			var ls = localStorage.getItem('store')

			if(ls){
				Session.set('store', ls);
			} else {
				var store = Stores.find().fetch()[0];
				console.log(store);

				if(store){
					localStorage.setItem('store', store._id);
					Session.set('store', store._id);
				}
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
	onBeforeAction: function (){
		if(Meteor.userCheckAccess(4)) {
			this.next()
		} else {
			this.layout("notFound");
			document.title = 'Страница не найдена';
		}
	},
	onAfterAction: function (){
		if (Meteor.userCheckAccess(4)) {
			this.render('providers');
			document.title = 'Поставщики';
		}
	},
	waitOn: function(){
		return Meteor.subscribe('providers');
	}
});

Router.route('/productsAccounting', {
	name: 'productsAccounting',
	onAfterAction: function (){
		document.title = 'Товары и учёт';

		var ls = localStorage.getItem('store')

		if(ls){
			Session.set('store', ls);
		} else {
			var store = Stores.find().fetch()[0];
			console.log(store);

			if(store){
				localStorage.setItem('store', store._id);
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
	onBeforeAction: function (){
		if(Meteor.userCheckAccess(512)) {
			this.next()
		} else {
			this.layout("notFound");
			document.title = 'Страница не найдена';
		}
	},
	onAfterAction: function (){
		if (Meteor.userCheckAccess(512)) {
			this.render('storeSales');
			document.title = 'Продажи';
		}
	},
	waitOn: function(){
		return Meteor.subscribe('products', 'accounting');
	}
});

Router.before(function(){
	clearMessages();
	this.next();
});