Template.accountingSale.events({
    'click button': function(event, template) {
        event.preventDefault();

        var count = Number(this.count) - Number(template.find('#count').value),
            total_amount = Number(this.price.total_amount) - accounting.unformat(template.find('#total_amount').value);

        var product = {
            'count': count,
            'price': {
                'purchase_price': this.price.purchase_price,
                'markup': this.price.markup,
                'price': this.price.price,
                'total_amount': total_amount
            }
        };

        var accountOperation = {
            'type': 'Продажа',
            'product_id': this._id,
            'count': Number(template.find('#count').value),
            'provider': '',
            'price': {
                'purchase_price': this.price.purchase_price,
                'markup': this.price.markup,
                'price': this.price.price,
                'total_amount': accounting.unformat(template.find('#total_amount').value)
            }
        };

        Meteor.call('products-update', this._id, product);
        //location.reload();

        Meteor.call('accounting-create', accountOperation, function(){
            Session.set('modal', null);
        });
    },
    'input input': function(event, template){
        template.find('#total_amount').value = accounting.formatNumber((Number(this.price.price) * Number(template.find('#count').value)), 2, " ");
    }
});