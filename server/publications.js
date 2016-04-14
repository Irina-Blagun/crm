Meteor.publish('company', function(cid){
	return Companies.find({ _id: cid });
});

Meteor.publish('stores', function(){
	var user = Users.findOne(this.userId);
	if(user && user.profile && user.profile.stores){
		return user.profile && Stores.find({ _id: {$in: user.profile.stores} });
	}
});

Meteor.publish('allStores', function(){
	var user = Users.findOne(this.userId);
	return Stores.find({cid: user.profile.cid});
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