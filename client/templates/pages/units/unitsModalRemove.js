Template.unitsRemove.helpers({
    unit: function(){
        return Units.findOne({_id:this._id});
    }
});

Template.unitsRemove.events({
    'click #remove': function(event, template){
        event.preventDefault();

        Meteor.call('units-remove', this._id, function(){
            Session.set('modal', null);
        })
    }
});