Template.accountingComing.events({
    'click button': function(event, template) {
        event.preventDefault();

        //var count = Number(template.find('#count').value) + Number(this.count),
        //    total_amount = Number(accounting.unformat(template.find('#price').value)) * Number(count);

        var count = Number(template.find('#count').value) + Number(this.count),
            total_amount = price * Number(count);


        var product = {
            'count': count,
            'price': {
                'purchase_price': Number(template.find('#purchase_price').value),
                'markup': this.price.markup,
                'price': price,
                'total_amount': total_amount
            }
        };

        var accountOperation = {
            'type': 'Приход',
            'product_id': this._id,
            'count': Number(template.find('#count').value),
            'provider': template.find('#provider').value,
            'price': {
                'purchase_price': Number(template.find('#purchase_price').value),
                'markup': this.price.markup,
                'price': price,
                'total_amount': accounting.unformat(totalAmountAcc)
            },
            'sid': this.sid
        };

        Meteor.call('products-update', this._id, product);

        Meteor.call('accounting-create', accountOperation, function(){
            Session.set('modal', null);
        });
    },
    'input input': function(event, template){
        price = Number(template.find('#purchase_price').value) + Number(template.find('#purchase_price').value / 100 * Number(this.price.markup));
        totalAmountAcc = Number(template.find('#purchase_price').value) * Number(template.find('#count').value);
    }
});

Template.accountingComing.helpers({
    unit: function(){
        return Units.findOne({id: this.unit});
    },
    providers: function(){
        return Providers.find({deleted: false});
}
});
