Providers = new Mongo.Collection('providers');

Meteor.methods({
    'providers-create': function(provider, callback){
        if (Meteor.isServer){
            check(provider, {
                name: String
            });

            provider.created = new Date();
            provider.cid = Meteor.companyId();
            provider.deleted = false;
            provider.delete_date = null;

            var id = Providers.insert(provider);
        }
    },
    'providers-update': function(_id, provider, callback) {
        if (Meteor.isServer) {
            Providers.update(_id, {$set: provider})
        }
    },
    'providers-remove': function(_id, callback) {
        if (Meteor.isServer) {

            var provider = {
                'deleted': true,
                'delete_date': new Date()
            };

            Providers.update(_id, {$set: provider})

        }
    }
});