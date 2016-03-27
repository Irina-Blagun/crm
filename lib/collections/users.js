Users = Meteor.users;

Meteor.methods({
	'users-create': function(user, callback){
		if (Meteor.isServer){
			check(user, {
				email: String,
				profile: {
					first_name: String,
					last_name: String,
					path_name: String,
					flags: Number,
					role: String
				}
			});

			var userId = Accounts.createUser(user);

			if(userId){
				Accounts.sendEnrollmentEmail(userId);
				// TODO: callback()
			} else {
				// TODO: Обработать ошибку
			}
		}
	}
});

Meteor.companyId = function(){
	var user = this.user();

	if(user && user.profile){
		return user.profile.cid
	}
};

Meteor.userFlag = function(){
	return this.user().profile.flags
};

Meteor.userCheckAccess = function(flag){
	return (this.userFlag() & flag) === flag;
};