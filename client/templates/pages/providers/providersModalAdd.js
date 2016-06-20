Template.providersAdd.events({
    'click button': function(event, template){
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
        var repeatedName = false;
        var repeatedUnp = false;

        providers.forEach(function(item, i){
            if(item.phone == template.find('#phone').value){
                repeatedPhone = true;
            }
            if(item.email == template.find('#email').value){
                repeatedEmail = true;
            }
            if(item.name == template.find('#name').value){
                repeatedName = true;
            }
            if(item.unp == template.find('#unp').value){
                repeatedUnp = true;
            }
        });

        if(repeatedName == true){
            throwMessage('danger', 'Поставщик уже добавлен');
        } else if(repeatedUnp == true){
                throwMessage('danger', 'Поставщик с таким УНП уже существует');
            } else if(repeatedEmail == true){
                    throwMessage('danger', 'Поставщик с таким e-mail уже существует');
                } else if(repeatedPhone == true){
                        throwMessage('danger', 'Поставщик с таким номером телефона уже существует');
                    } else {
                        if(document.forms[0].checkValidity()){
                            Meteor.call('providers-create', provider, function(){
                                Session.set('modal', null);
                                throwMessage('success', 'Поставщик добавлен');
                            });
                        } else {
                            throwMessage('danger', 'Не все поля заполнены корректно');
                        }
                    }
    }
});