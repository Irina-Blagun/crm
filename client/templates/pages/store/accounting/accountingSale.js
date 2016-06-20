Template.accountingSale.events({
    'click button': function(event, template){
        event.preventDefault();

        var count = Number(this.count) - Number(template.find('#count').value),
            total_amount = Number(this.price.total_amount) - accounting.unformat(template.find('#total_amount').value);

        if(count < 0){
            throwMessage('danger', 'В наличии нет такого количества товара');
            return
        }

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
            },
            'sid': this.sid
        };

        if(document.forms[0].checkValidity()){
            Meteor.call('products-update', this._id, product);
            Meteor.call('accounting-create', accountOperation, function(){
                Session.set('modal', null);
                throwMessage('success', 'Продажа товара зафиксирована');
            });
        } else {
            throwMessage('danger', 'Не все поля заполнены корректно');
        }
    },
    'input input': function(event, template){
        template.find('#total_amount').value = accounting.formatNumber((Number(this.price.price) * Number(template.find('#count').value)), 0, " ");
    }
});