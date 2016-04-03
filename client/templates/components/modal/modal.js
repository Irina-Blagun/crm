Template.modal.helpers({
	activeModal: function(){
		return Session.get('activeModal');
	}
});

Template.modal.events({
	'click .cd-modal': function(event){
		if( $(event.target).is('.cd-modal__close') || $(event.target).is('.cd-modal') ) {
			event.preventDefault();
			Session.set('activeModal', null);
		}
	}
});