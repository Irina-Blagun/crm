Template.accountingComing.events({
    'click button': function(event, template) {
        event.preventDefault();

        var count = Number(template.find('#count').value) + Number(this.count),
            total_amount = Number(accounting.unformat(template.find('#price').value)) * Number(count);

        var product = {
            'count': count,
            'price': {
                'purchase_price': Number(template.find('#purchase_price').value),
                'markup': this.price.markup,
                'price': accounting.unformat(template.find('#price').value),
                'total_amount': total_amount
            }
        };

        var accountOperation = {
            'type': 'Приход',
            'name': template.find('#name').value,
            'count': Number(template.find('#count').value),
            'provider': template.find('#provider').value,
            'price': {
                'purchase_price': Number(template.find('#purchase_price').value),
                'markup': this.price.markup,
                'price': accounting.unformat(template.find('#price').value),
                'total_amount': accounting.unformat(template.find('#total_amount').value)
            }
        };

        Meteor.call('products-update', this._id, product);

        Meteor.call('accounting-create', accountOperation, function(){
            Session.set('modal', null);
            //location.reload();
        });
    },
    'input input': function(event, template){
        template.find('#price').value = accounting.formatNumber(Number(template.find('#purchase_price').value) + Number(template.find('#purchase_price').value / 100 * Number(this.price.markup)), 2, " ");
        template.find('#total_amount').value = accounting.formatNumber((Number(accounting.unformat(template.find('#price').value)) * Number(template.find('#count').value)), 2, " ");
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
