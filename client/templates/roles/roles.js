Template.roles.helpers({
    roles: function(){
        return Roles.find();
    }
});

Template.roleItem.helpers({
    systemString: function(){
        return this.system ? '+' : '-'
    }
});