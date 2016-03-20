Template.register.events({
    'click #register-button': function(e, t){
        var user = {
            username : t.find('#username').value,
            password : t.find('#password').value
        };

        Meteor.call('addUser', user, function(){
            $('.register-form')[0].reset();
        })
    }
});