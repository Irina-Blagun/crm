Stores = new Mongo.Collection('stores');

Meteor.methods({
    'stores-create': function(store, callback){
        //if (Meteor.isServer && Meteor.userCheckAccess(1)){
        if (Meteor.isServer){
            check(store, {
                name: String,
                address: String,
                short_name: String
            });

            store.created = new Date();
            store.creator = Meteor.userId();
            store.cid = Meteor.companyId();
            store.deleted = false;
            store.delete_date = null;

            var sid = Stores.insert(store);

            if(sid){
                Meteor.call('category-create', {
                    parent: '#',
                    node: {
                        text: 'Все категории'
                    }
                }, sid);
            }

			Meteor.call('users-store-update', sid, callback);
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