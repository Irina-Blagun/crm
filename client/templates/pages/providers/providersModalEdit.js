Template.providersEdit.events({
    'submit #form-providersEdit': function(event, template){
        event.preventDefault();

        var provider = {
            'name': template.find('#name').value,
            'address': template.find('#address').value,
            'unp': template.find('#unp').value,
            'email': template.find('#email').value,
            'phone': template.find('#phone').value,
            'bank': {
                'name': template.find('#bank_name').value,
                'address': template.find('#bank_address').value
            }
        };


        var providers = Providers.find({deleted: false}).fetch();
        var repeatedPhone = false;
        var repeatedEmail = false;
        var repeatedPhoneValue = '';
        var repeatedEmailValue = '';

        providers.forEach(function(item, i){
            if(item.phone == template.find('#phone').value){
                repeatedPhone = true;
                repeatedPhoneValue = item.phone;
            }
            if(item.email == template.find('#email').value){
                repeatedEmail = true;
                repeatedEmailValue = item.email;
            }
        });

        if(repeatedEmail == true  && repeatedEmailValue != this.email){
            throwMessage('danger', 'Поставщик с таким e-mail уже существует');
        } else if(repeatedPhone == true && repeatedPhoneValue != this.phone){
            throwMessage('danger', 'Поставщик с таким номером телефона уже существует');
        } else {
            if(document.forms[0].checkValidity()){
                Meteor.call('providers-update', this._id, provider, function(){
                    Session.set('modal', null);
                    throwMessage('success', 'Изменения сохранены');
                });
            } else {
                throwMessage('danger', 'Не все поля заполнены корректно');
            }
        }
    }
});