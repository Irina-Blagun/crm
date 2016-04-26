//Template.productsRemove.helpers({
//    product: function(){
//        return Products.findOne({_id:this._id});
//    }
//});
//
Template.productsRemove.events({
    'click #remove': function(event, template){
        event.preventDefault();

        Meteor.call('products-remove', this.product._id, function(){
            Session.set('modal', null);
        })
    }
});