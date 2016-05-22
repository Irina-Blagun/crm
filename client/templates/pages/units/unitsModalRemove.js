Template.unitsRemove.events({
    'click #remove': function(event, template){
        event.preventDefault();

        Meteor.call('units-remove', this._id, function(){
            Session.set('modal', null);
        })
    }
});