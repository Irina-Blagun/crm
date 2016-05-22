Template.storesRemove.events({
    'click #remove': function(event, template){
        event.preventDefault();

        Meteor.call('stores-remove', this._id, function(){
            Session.set('modal', null);
        })
    }
});