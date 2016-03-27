Meteor.publish('company', function(){
	return Companies.find({ uid: this.userId });
});

Meteor.publish('stores', function(){
	var user = Users.findOne(this.userId);
	return Stores.find({ _id: {$in: user.profile.stores} });
});

Meteor.publish('users', function(){
	var user = Users.findOne(this.userId);
	return Users.find({cid: user.profile.cid}, {fields:{createdAt: 1}});
});
