Template.accountingComing.events({
    'click button': function(event, template) {
        event.preventDefault();

        var count = Number(template.find('#count').value) + Number(this.product.count),
            total_amount = Number(accounting.unformat(template.find('#price').value)) * Number(count);

        var product = {
            'count': count,
            'price': {
                'purchase_price': template.find('#purchase_price').value,
                'markup': this.product.price.markup,
                'price': accounting.unformat(template.find('#price').value),
                'total_amount': total_amount
            }
        };

        var accountOperation = {
            'type': 'Приход',
            'name': template.find('#name').value,
            'count': template.find('#count').value,
            'provider': template.find('#provider').value,
            'price': {
                'purchase_price': template.find('#purchase_price').value,
                'markup': this.product.price.markup,
                'price': accounting.unformat(template.find('#price').value),
                'total_amount': accounting.unformat(template.find('#total_amount').value)
            }
        };

        Meteor.call('products-update', this.product._id, product);
            //, function(){
            //Session.set('modal', null);
            //location.reload();
        //}
        //);

        Meteor.call('accounting-create', accountOperation, function(){
            Session.set('modal', null);
        });

        //console.log(count);
        //console.log(template.find('#purchase_price').value);
        //console.log(this.product.price.markup);
        //console.log(accounting.unformat(template.find('#price').value));
        //console.log(total_amount);
    },
    'input input': function(event, template){
        template.find('#price').value = accounting.formatNumber(Number(template.find('#purchase_price').value) + Number(template.find('#purchase_price').value / 100 * Number(this.product.price.markup)), 2, " ");
        template.find('#total_amount').value = accounting.formatNumber((Number(accounting.unformat(template.find('#price').value)) * Number(template.find('#count').value)), 2, " ");
    }
});

Template.accountingComing.helpers({
    unit: function(){
        return Units.findOne({id: this.unit});
    },
    providers: function(){
        return Providers.find();
}
});
