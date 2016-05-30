Template.shareOrderEmail.helpers({
    product: function(){
        return OrdersProducts.find({order: this.order._id})
    },
    store: function(){
        return Stores.findOne({_id: this.order.sid});
    },
    providers: function(){
        var provider = Providers.findOne({_id: this.order.provider});
        return provider.name
    },
    company: function(){
        return Companies.findOne({_id: Meteor.companyId()})
    }
});