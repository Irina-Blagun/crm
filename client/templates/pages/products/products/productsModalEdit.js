Template.productsEdit.events({
    'submit #form-productsEdit': function(event, template){
        event.preventDefault();

        var product = {
            'name': template.find('#name').value,
            'unit': template.find('#unit').value,
            'price': {
                'purchase_price': this.product.price.purchase_price,
                'markup': Number(template.find('#markup').value),
                'price': price,
                'total_amount': total_amount
            }
        };

        Meteor.call('products-update', this.product._id, product, function(){
            Session.set('modal', null);
        })
    },
    'input input': function(event, template){
        price = Number(this.product.price.purchase_price) + Number(this.product.price.purchase_price) / 100 * Number(template.find('#markup').value);
        total_amount = price * this.product.count;
    }
});

Template.productsEdit.helpers({
    units: function(){
        return Units.find();
    }
});
