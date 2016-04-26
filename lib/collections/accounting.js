Accounting = new Mongo.Collection('accounting');

Meteor.methods({
    'accounting-create': function(accountOperation, callback){
        if (Meteor.isServer){
            check(accountOperation, {
                type: String,
                name: String,
                count: String,
                provider: String,
                price: {
                    purchase_price: String,
                    markup: String,
                    price: Number,
                    total_amount: Number
                }
            });

            accountOperation.created = new Date();
            accountOperation.creator = Meteor.userId();
            accountOperation.cid = Meteor.companyId();

            var id = Accounting.insert(accountOperation);
        }
    }
});