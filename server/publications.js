Meteor.publish('company', function(cid){
	return Companies.find({ _id: cid });
});

Meteor.publish('stores', function(){
	var user = Users.findOne(this.userId);
	return Stores.find({ _id: {$in: user.profile.stores} });
});

Meteor.publish('users', function(cid){
	return Users.find({ 'profile.cid': cid });
});

Meteor.publish('user', function(){
	if (this.userId){
		return Meteor.users.find({_id: this.userId},
			{fields: {'createdAt': 1}});
	}
});
