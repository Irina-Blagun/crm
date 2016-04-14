Stores = new Mongo.Collection('stores');

Meteor.methods({
    'stores-create': function(store, callback){
        if (Meteor.isServer && Meteor.userCheckAccess(2)){
            check(store, {
                name: String,
                address: String
            });

            store.created = new Date();
            store.cid = Meteor.companyId();
            store.deleted = false;
            store.delete_date = null;

            var id = Stores.insert(store);
        }
    },
    'stores-update': function(_id, store, callback) {
        if (Meteor.isServer) {
            Stores.update(_id, {$set: store})
        }
    },
    'stores-remove': function(_id, callback) {
        if (Meteor.isServer) {

            var store = {
                'deleted': true,
                'delete_date': new Date()
            };

            Stores.update(_id, {$set: store})

        }
    }
});