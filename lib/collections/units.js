Units = new Mongo.Collection('units');

Meteor.methods({
    'units-create': function(unit, callback){
        if (Meteor.isServer){
            check(unit, {
                name: String,
                short_name: String
            });

            var id = Units.insert(unit);
        }
    },
    'units-update': function(_id, unit, callback) {
        if (Meteor.isServer) {
            Units.update(_id, {$set: unit})
        }
    },
    'units-remove': function(_id, callback) {
        if (Meteor.isServer) {
            Units.remove(_id)
        }
    }
});