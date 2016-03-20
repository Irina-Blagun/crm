Users = Meteor.users;

Meteor.methods({
    addUser: function(user){
        var id = Users.insert({
            username: user.username
        });

        if (Meteor.isServer){
            Accounts.setPassword(id, user.password);
        }
    }
});