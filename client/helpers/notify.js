Notify = new Meteor.Collection(null);

throwMessage = function(type, message) {
	Notify.insert({type: type, message: message, seen: false});
};

clearMessages = function() {
	Notify.remove({seen: true});
};
