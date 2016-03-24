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

