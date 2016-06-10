Template.storesEdit.events({
    'submit #form-storesEdit': function(event, template) {
        event.preventDefault();

        var short_name = template.find('#name').value;
        short_name.split('');
        short_name = short_name[0] + short_name[1];

        var store = {
            'name': template.find('#name').value,
            'address': template.find('#address').value,
            'short_name': short_name.toUpperCase()
        };


        var stores = Stores.find({deleted: false}).fetch();
        var repeatedName = false;
        var repeatedNameValue = '';
        var repeatedAddress = false;
        var repeatedAddressValue = '';

        stores.forEach(function(item, i) {
            if(item.name == template.find('#name').value && item.address == template.find('#address').value){
                repeatedName = true;
                repeatedNameValue = this.name;
                repeatedAddress = true;
                repeatedAddressValue = this.address;
            }
        });

        if(repeatedName == true && repeatedNameValue !== this.name && repeatedAddress == true && repeatedAddressValue !== this.address){
            throwMessage('danger', 'Магазин уже добавлен');
        } else {
            if (document.forms[0].checkValidity()) {
                Meteor.call('stores-update', this._id, store, function () {
                    Session.set('modal', null);
                    throwMessage('success', 'Изменения сохранены');
                })
            } else {
                throwMessage('danger', 'Не все поля заполнены корректно');
            }
        }

    }
});