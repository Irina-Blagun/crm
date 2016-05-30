Template.ordersProductsAdd.events({
    'click button': function(event, template) {
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
            
            Meteor.call('ordersProducts-update', order._id, ordersProductEdit, function(){
                Session.set('modal', null);
            })
        } else {
            Meteor.call('ordersProducts-create', ordersProduct, function(){
                Session.set('modal', null);
            })
        }
    }
});

Template.ordersProductsAdd.helpers({
    orders: function(){
        return Orders.find({sid: localStorage.getItem('store')});
    }
});
