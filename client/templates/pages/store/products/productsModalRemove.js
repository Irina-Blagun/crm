Template.productsRemove.events({
    'click #remove': function(event, template){
        event.preventDefault();

        var accounting = Accounting.find({product_id: this._id}).fetch();
        var ordersProducts = OrdersProducts.find({product: this._id}).fetch();

        accounting.forEach(function(item, i){
            Meteor.call('accounting-remove', item._id);
        });

        ordersProducts.forEach(function(item, i){
            Meteor.call('ordersProducts-remove', item._id);
        });

        Meteor.call('products-remove', this._id, function(){
            Session.set('modal', null);
            throwMessage('success', 'Товар удалён');
        });
    }
});