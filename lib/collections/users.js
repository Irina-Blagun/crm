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
					role: String,
					phone: String,
					cid: String,
					stores: Array
				}
			});

			user.profile.deleted = false;
			user.profile.delete_date = null;

			var userId = Accounts.createUser(user);

			if(userId){
				Accounts.sendEnrollmentEmail(userId);
			}
		}
	},
	'users-update': function(_id, user, callback) {
		if (Meteor.isServer) {
			Users.update(_id, {$set: user})
		}
	},
	'users-store-update': function(sid, callback){
		var user = Users.findOne({_id: Meteor.userId()});
		user.profile.stores.push(sid);
		Users.update({_id: user._id}, {$set: user}, callback);
	},
	'users-remove': function(_id, callback) {
		if (Meteor.isServer) {

			var user = {
				'profile.deleted': true,
				'profile.delete_date': new Date()
			};

			Users.update(_id, {$set: user})

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
	var user = this.user();
	return user && user.profile.flags
};

Meteor.userCheckAccess = function(flag){
	return (this.userFlag() & flag) === flag;
};
