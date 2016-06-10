Template.ordersAdd.events({
    'click button': function(event, template){
        event.preventDefault();

        var randomNumber = Math.floor(Math.random()*11098765668);

        var order = {
            'number': randomNumber.toString(),
            'provider': template.find('#provider').value,
            'status': 0,
            'sid': localStorage.getItem('store')
        };

        if (document.forms[0].checkValidity()) {
            Meteor.call('orders-create', order, function(){
                Session.set('modal', null);
                throwMessage('success', 'Заказ добавлен');
            });
        } else {
            throwMessage('danger', 'Не все поля заполнены корректно');
        }
    }
});

Template.ordersAdd.helpers({
    providers: function(){
        return Providers.find({deleted: false});
    }
});