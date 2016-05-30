Template.ordersEdit.events({
    'click button': function(event, template){
        event.preventDefault();

        var order = {
            'provider': template.find('#provider').value
        };

        Meteor.call('orders-update', this._id, order, function(){
            Session.set('modal', null);
        })
    }
});

Template.ordersEdit.helpers({
    providers: function(){
        return Providers.find({deleted: false});
    }
});