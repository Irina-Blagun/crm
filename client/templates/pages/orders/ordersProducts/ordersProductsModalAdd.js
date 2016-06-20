Template.ordersProductsAdd.events({
    'click button': function(event, template){
        event.preventDefault();

        var ordersProduct = {
            'name': template.find('#name').value,
            'product': this._id,
            'count': Number(template.find('#count').value),
            'order': template.find('#order').value,
            'sid': this.sid,
            'comment': template.find('#comment').value
        };

        if(OrdersProducts.findOne({order: ordersProduct.order, product: ordersProduct.product})){
            var order = OrdersProducts.findOne({order: ordersProduct.order, product: ordersProduct.product});
            var countSum = Number(order.count) + Number(template.find('#count').value);
            var ordersProductEdit = {
                'count': countSum
            };

            if (document.forms[0].checkValidity()){
                Meteor.call('ordersProducts-update', order._id, ordersProductEdit, function(){
                    Session.set('modal', null);
                    throwMessage('success', 'Товар добавлен в заказ');
                });
            } else {
                throwMessage('danger', 'Не все поля заполнены корректно');
            }
        } else {
            if(document.forms[0].checkValidity()){
                Meteor.call('ordersProducts-create', ordersProduct, function(){
                    Session.set('modal', null);
                    throwMessage('success', 'Товар добавлен в заказ');
                });
            } else {
                throwMessage('danger', 'Не все поля заполнены корректно');
            }
        }
    }
});

Template.ordersProductsAdd.helpers({
    orders: function(){
        return Orders.find({sid: localStorage.getItem('store'), status: 0});
    }
});
