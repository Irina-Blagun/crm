Template.accountingComing.events({
    'click button': function(event, template){
        event.preventDefault();
        if (document.forms[0].checkValidity()){
            var count = Number(template.find('#count').value) + Number(this.count),
                total_amount = accounting.unformat(price) * Number(count);
            
            var product = {
                'count': count,
                'price': {
                    'purchase_price': Number(template.find('#purchase_price').value),
                    'markup': this.price.markup,
                    'price': accounting.unformat(price),
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
                    'price': accounting.unformat(price),
                    'total_amount': accounting.unformat(totalAmountAcc)
                },
                'sid': this.sid
            };

            if(Number(template.find('#count').value) !== 0){
                if (document.forms[0].checkValidity()){
                    Meteor.call('products-update', this._id, product);
                    Meteor.call('accounting-create', accountOperation, function(){
                        Session.set('modal', null);
                        throwMessage('success', 'Приход товара зафиксирован');
                    });
                } else {
                    throwMessage('danger', 'Не все поля заполнены корректно');
                }
            } else {
                // TODO
                throwMessage('danger', 'Количество');
            }
        } else {
            throwMessage('danger', 'Не все поля заполнены корректно');
        }
    },
    'input input': function(event, template){
        price = accounting.formatNumber((Math.round((Number(template.find('#purchase_price').value) + Number(template.find('#purchase_price').value / 100 * Number(this.price.markup))) / 100) * 100), 0, ' ');
        totalAmountAcc = Number(template.find('#purchase_price').value) * Number(template.find('#count').value);
    }
});

Template.accountingComing.helpers({
    unit: function(){
        return Units.findOne({id: this.unit});
    },
    providers: function(){
        return Providers.find({deleted: false}, {
            sort: [
                ["name", "asc"]
            ]});
}
});
