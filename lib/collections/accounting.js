Accounting = new Mongo.Collection('accounting');

Meteor.methods({
    'accounting-create': function(accountOperation, callback){
        if (Meteor.isServer){
            check(accountOperation, {
                type: String,
                product_id: String,
                count: Number,
                provider: String,
                price: {
                    purchase_price: Number,
                    markup: Number,
                    price: Number,
                    total_amount: Number
                }
            });

            accountOperation.created = new Date();
            accountOperation.creator = Meteor.userId();
            accountOperation.cid = Meteor.companyId();

            var id = Accounting.insert(accountOperation);
        }
    },
    'accounting-remove': function(_id, callback) {
        if (Meteor.isServer) {
            Accounting.remove(_id)
        }
    }
});