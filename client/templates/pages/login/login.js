Template.login.events({
	'submit #form-login': function(event, template){
		event.preventDefault();

		var email = template.find('#email').value,
			password = template.find('#password').value;

		Meteor.loginWithPassword(email, password, function(err){
			if (err) {
				console.log(err);
			} else {
				Router.go('/');
			}
		});
	}
});
