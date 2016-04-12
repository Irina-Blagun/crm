Template.storesRemove.helpers({
    store: function(){
        return Stores.findOne({_id:this._id});
    }
});

Template.storesRemove.events({
    'click #remove': function(event, template){
        event.preventDefault();

        Meteor.call('stores-remove', this._id, function(){
            Session.set('modal', null);
        })
    }
});