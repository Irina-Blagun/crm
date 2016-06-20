Template.ordersProductEdit.events({
    'click button': function(event, template){
        event.preventDefault();

        var ordersProduct = {
            'count': Number(template.find('#count').value),
            'comment': template.find('#comment').value
        };

        if(document.forms[0].checkValidity()){
            Meteor.call('ordersProducts-update', this._id, ordersProduct, function(){
                Session.set('modal', null);
                throwMessage('success', 'Изменения сохранены');
            });
        } else {
            throwMessage('danger', 'Не все поля заполнены корректно');
        }
    }
});

Template.ordersProductEdit.helpers({
    orders: function(){
        return Orders.find({sid: localStorage.getItem('store')});
    }
});