Template.providersRemove.events({
    'click #remove': function(event, template){
        event.preventDefault();

        Meteor.call('providers-remove', this._id, function(){
            Session.set('modal', null);
        })
    }
});