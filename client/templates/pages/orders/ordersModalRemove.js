Template.ordersRemove.events({
    'click #remove': function(event, template){
        event.preventDefault();

        var ordersProduct = OrdersProducts.find({order: this._id}).fetch();

        ordersProduct.forEach(function(item, i) {
            Meteor.call('ordersProducts-remove', item._id, function(){
                Session.set('modal', null);
            })
        });

        Meteor.call('orders-remove', this._id, function(){
            Session.set('modal', null);
        })
    }
});