Template.ordersProductEdit.events({
    'click button': function(event, template) {
        event.preventDefault();

        var ordersProduct = {
            'count': Number(template.find('#count').value),
            'comment': template.find('#comment').value
        };

        Meteor.call('ordersProducts-update', this._id, ordersProduct, function(){
            Session.set('modal', null);
        })
    }
});

Template.ordersProductEdit.helpers({
    orders: function(){
        return Orders.find({sid: localStorage.getItem('store')});
    }
});