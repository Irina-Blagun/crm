Template.editRoles.events({
    'submit #editRoles-form': function(event, template){
        event.preventDefault();

        var role = {
            id : this._id,
            rolename: template.find('#rolename').value,
            system: template.find('input[name=system]').checked,
            flags: 0
        };

        template.findAll('input[name=flag]').forEach(function(flag){
            if(flag.checked){
                role.flags += Number(flag.value);
            }
        });

        Roles.update(role.id, {rolename: role.rolename, flags: role.flags, system: role.system}, function(){
            Router.go('roles');
        });
    }
});

Template.editRoles.rendered = function(){
    var flags = this.data.flags;
    this.findAll('input[name=flag]').forEach(function(checkbox){
        var flag = Number(checkbox.value);
        checkbox.checked = (flags & flag) === flag;
    });
    this.find('input[name=system]').checked = this.data.system;
};