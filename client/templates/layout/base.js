Template.base.events({
	'click button.modal': function(event, template) {
		var name = template.$(event.target).data('modal-template');
		Session.set('modal', { name: name });
	}
});

Handlebars.registerHelper('access', function(flag){
	return Meteor.userCheckAccess(flag);
});

Handlebars.registerHelper('admin', function(){
	return Meteor.userCheckAdmin();
});