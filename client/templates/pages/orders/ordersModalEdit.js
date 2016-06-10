Template.ordersEdit.events({
    'click button': function(event, template){
        event.preventDefault();

        var order = {
            'provider': template.find('#provider').value
        };

        if (document.forms[0].checkValidity()) {
            Meteor.call('orders-update', this._id, order, function(){
                Session.set('modal', null);
                throwMessage('success', 'Изменения сохранены');
            });
        } else {
            throwMessage('danger', 'Не все поля заполнены корректно');
        }
    }
});

Template.ordersEdit.helpers({
    providers: function(){
        return Providers.find({deleted: false});
    }
});