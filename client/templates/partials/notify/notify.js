Template.notify.helpers({
	messages: function() {
		return Notify.find();
	}
});

Template.message.rendered = function() {
	var message = this.data;

	Meteor.defer(function() {
		Notify.update(message._id, {$set: {seen: true}});
	});

	Meteor.setTimeout(function(){
		Blaze.remove(this.view);
	}, 3000);
};