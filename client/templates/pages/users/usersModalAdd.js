Template.usersAdd.events({
    'click button': function(event, template){
        event.preventDefault();

        var fio = template.find('#fio').value;
        fio = fio.split(' ');

        var user = {
            email: template.find('#email').value,
            profile: {
                first_name: fio[1],
                last_name: fio[0],
                path_name: fio[2],
                flags: 1000,
                role: template.find('#role').value,
                phone: template.find('#phone').value,
                cid: Meteor.companyId()
            }
        };

        Meteor.call('users-create', user, function(){
            Session.set('modal', null);
        })
    }
});