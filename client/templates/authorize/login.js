Template.login.events({
    'click #login-button': function(e, user){
        var username = user.find('#login-username').value,
            password = user.find('#login-password').value;

        Meteor.loginWithPassword(username, password, function(err){
            if (err) {
                console.log(err);
            } else {
                Router.go('/home');
            }
        });
    }
});