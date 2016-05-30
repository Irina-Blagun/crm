OrdersProducts = new Mongo.Collection('ordersProducts');

Meteor.methods({
    'ordersProducts-create': function(ordersProduct, callback){
        if (Meteor.isServer){
            check(ordersProduct, {
                name: String,
                product: String,
                count: Number,
                order: String,
                sid: String,
                comment: String
            });

            var id = OrdersProducts.insert(ordersProduct);
        }
    },
    'ordersProducts-update': function(_id, ordersProduct, callback) {
        if (Meteor.isServer) {
            OrdersProducts.update(_id, {$set: ordersProduct})
        }
    },
    'ordersProducts-remove': function(_id, callback) {
        if (Meteor.isServer) {
            OrdersProducts.remove(_id)
        }
    }
});