Roles = new Mongo.Collection('roles');

Meteor.methods({
    addRole: function(role){
        var id = Roles.insert({
            rolename: role.rolename,
            flags: role.flags,
            system: role.system
        });
    }
});