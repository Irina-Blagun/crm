Template.storesAdd.events({
    'click button': function(event, template){
        event.preventDefault();

        var short_name = template.find('#name').value;
        short_name.split('');
        short_name = short_name[0]+short_name[1];

        var store = {
            'name': template.find('#name').value,
            'address': template.find('#address').value,
            'short_name': short_name.toUpperCase()
        };


        var stores = Stores.find({deleted: false}).fetch();
        var repeatedName = false;
        var repeatedAddress = false;

        stores.forEach(function(item, i) {
            if(item.name == template.find('#name').value && item.address == template.find('#address').value){
                repeatedName = true;
                repeatedAddress = true;
            }
        });

        if(repeatedName == true && repeatedAddress == true){
            throwMessage('danger', 'Магазин уже добавлен');
        } else {
            if (document.forms[0].checkValidity()) {
                Meteor.call('stores-create', store, function(){
                    Session.set('modal', null);
                    throwMessage('success', 'Магазин добавлен');
                });
            } else {
                throwMessage('danger', 'Не все поля заполнены корректно');
            }
        }
    }
});