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

	$('#notify-message--' + this.data._id).fadeOut(3000, function(){
		Notify.update(message._id, {$set: {seen: true}});
	});
};