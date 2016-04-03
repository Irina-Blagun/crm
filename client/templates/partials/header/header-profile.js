Template.headerProfile.helpers({
	profile: function(){
		var user = Meteor.user();
		return user && user.profile
	}
});

Template.headerProfile.events({
	'click .header-profile__toggle': function(event) {
		$(event.target).parent().toggleClass('header-nav__item--active');
	}
});