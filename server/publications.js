Meteor.publish('company', function(){
	return Companies.find({ uid: this.userId });
});

Meteor.publish('stores', function(){
	var user = Users.findOne(this.userId);
	return Stores.find({ _id: {$in: user.profile.stores} });
});