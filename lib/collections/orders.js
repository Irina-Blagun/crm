Orders = new Mongo.Collection('orders');

Meteor.methods({
    'orders-create': function(order, callback){
        if (Meteor.isServer){
            check(order, {
                number: String,
                provider: String,
                status: Number,
                sid: String
            });

            order.created = new Date();
            order.closed = null;

            var id = Orders.insert(order);
        }
    },
    'orders-update': function(_id, order, callback){
        if (Meteor.isServer) {
            Orders.update(_id, {$set: order})
        }
    },
    'orders-remove': function(_id, callback){
        if (Meteor.isServer) {
            Orders.remove(_id)
        }
    },
    'orderClosed': function(_id, options){
        Email.send(options);
        Orders.update(_id, {$set: {status: 1, closed: new Date()}})
    }
});