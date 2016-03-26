Meteor.publish('company', function(){
	return Companies.find({ uid: this.userId });
});