Template.modal.helpers({
	modal: function(){
		return Session.get('modal');
	}
});

Template.modal.events({
	'click .cd-modal': function(event){
		if( $(event.target).is('.cd-modal__close') || $(event.target).is('.cd-modal') ) {
			event.preventDefault();
			Session.set('modal', null);
		}
	}
});