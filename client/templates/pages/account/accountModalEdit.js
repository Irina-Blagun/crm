Template.accountEdit.helpers({
    allStores: function(){
        return Stores.find();
    }
});

Template.accountEdit.events({
    'submit #form-accountEdit': function(event, template){
        event.preventDefault();

        var fio = template.find('#fio').value;
        fio = fio.split(' ');

        var user = {
            'profile.first_name': fio[1],
            'profile.last_name': fio[0],
            'profile.path_name': fio[2],
            'profile.phone': template.find('#phone').value
        };

        if (document.forms[0].checkValidity()){
            Meteor.call('users-update', this._id, user, function(){
                Session.set('modal', null);
                throwMessage('success', 'Данные изменены');
            });
        } else {
            throwMessage('danger', 'Не все поля заполнены корректно');
        }
    }
});