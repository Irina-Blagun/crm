Meteor.startup(function(){
	process.env.MAIL_URL = 'smtp://postmaster@sandbox770aa37c7d9544ebb0be26ae6542c686.mailgun.org:0e7c26ab2cb1b1e29571d76c9c8d854c@smtp.mailgun.org:587';
		// Configures "reset password account" email link
		Accounts.urls.resetPassword = function(token){
			return Meteor.absoluteUrl("reset-password/" + token);
		};

		// Configures "enroll account" email link
		Accounts.urls.enrollAccount = function(token){
			return Meteor.absoluteUrl("enroll-account/" + token);
		};


	Accounts.emailTemplates.siteName = "0c";

	Accounts.emailTemplates.from = "0c <support@0c.by>";

	Accounts.emailTemplates.resetPassword.subject = function() {
		return "Восстановление пароля";
	};

	Accounts.emailTemplates.enrollAccount.subject = function() {
		return "Установка пароля";
	};

	Accounts.emailTemplates.resetPassword.text = function (user, url) {
		return "\n\nЗдравствуйте, " + user.profile.first_name + "." +
			"\n\nДля восстановления пароля перейдите по ссылке:\n\n" + url;
	};

	Accounts.emailTemplates.enrollAccount.text = function (user, url) {
		return "\n\nЗдравствуйте, " + user.profile.first_name + "." +
			"\n\nДля установки пароля перейдите по ссылке:\n\n" + url;
	};


});

Meteor.publish('tree', function(){
	return Tree.find();
});

Meteor.publish('company', function(cid){
	return Companies.find({ _id: cid });
});

Meteor.publish('stores', function(){
	// if(this.userId) {
		var user = Users.findOne(this.userId);
		if (user && user.profile && user.profile.stores) {
			var company = Companies.findOne({_id: user.profile.cid});
			if (company.uid == user._id) {
				return Stores.find();
			}
			return user.profile && Stores.find({_id: {$in: user.profile.stores}});
		}
	// }
});

Meteor.publish('allStores', function(){
	if(this.userId) {
		var user = Users.findOne({_id: this.userId});
		return Stores.find({cid: user.profile.cid, deleted: false});
	}
});

Meteor.publish('users', function(cid){
	return Users.find({ 'profile.cid': cid, 'profile.deleted': false });
});

Meteor.publish('user', function(){
	if (this.userId){
		return Meteor.users.find({_id: this.userId},
			{fields: {'createdAt': 1}});
	}
});

Meteor.publish('providers', function(){
	return Providers.find();
});

Meteor.publish('units', function(){
	return Units.find();
});

Meteor.publish('products', function(){
	return Products.find();
});

Meteor.publish('accounting', function(){
	return Accounting.find();
});

Meteor.publish('orders', function(){
	return Orders.find();
});

Meteor.publish('ordersProducts', function(){
	return OrdersProducts.find();
});

Meteor.publish('users1', function(){
	return Users.find();
});