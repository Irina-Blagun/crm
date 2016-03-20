Meteor.publish('users', function() {
    return Users.find({});
});

Meteor.publish('roles', function() {
    return Roles.find({});
});

Meteor.publish('user', function(id) {
    return Users.find(id);
});

Meteor.publish('role', function(rolename) {
    return Roles.find(rolename);
});