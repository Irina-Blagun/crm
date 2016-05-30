Template.ordersProductRemove.events({
    'click #remove': function(event, template){
        event.preventDefault();

        Meteor.call('ordersProducts-remove', this._id, function(){
            Session.set('modal', null);
        })
    }
});