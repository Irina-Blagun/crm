Template.productsRemove.events({
    'click #remove': function(event, template){
        event.preventDefault();

        Meteor.call('products-remove', this._id, function(){
            Session.set('modal', null);
        })
    }
});