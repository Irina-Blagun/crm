Roles = new Mongo.Collection('roles');

Meteor.methods({
    addRole: function(role){
        var id = Roles.insert({
            rolename: role.rolename,
            flag: role.flag,
            system: role.system
        });
    }
});