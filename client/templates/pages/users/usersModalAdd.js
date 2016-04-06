Template.usersAdd.events({
    'submit #form-usersAdd': function(event, template){
        var fio = template.find('#fio').value;
        fio = fio.split(' ');


        var user = {
            email: template.find('#email').value,
            profile: {
                first_name: fio[1],
                last_name: fio[0],
                path_name: fio[2],
                flags: 1000,
                //role: template.find('#role').value,
                role: template.find('#role').value,
                phone: template.find('#phone').value,
                cid: Meteor.companyId()
            }
        };

        Meteor.call('users-create', user, function(){
            $('#form-usersAdd')[0].reset();
            Router.go('users');
        })
    }
});