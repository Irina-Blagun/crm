Template.base.events({
	'click button.modal': function(event, template) {
		var name = template.$(event.target).data('modal-template');
		Session.set('modal', { name: name });
	}
});