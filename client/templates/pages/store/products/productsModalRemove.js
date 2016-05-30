Template.productsRemove.events({
    'click #remove': function(event, template){
        event.preventDefault();

        var accounting = Accounting.find({product_id: this._id}).fetch();

        accounting.forEach(function(item, i) {
            Meteor.call('accounting-remove', item._id, function(){
                Session.set('modal', null);
            })
        });

        Meteor.call('products-remove', this._id, function(){
            Session.set('modal', null);
        })
    }
});