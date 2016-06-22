Template.productsEdit.events({
    'input input': function(event, template){
        generalPrice = Math.round((Number(this.price.purchase_price) + Number(this.price.purchase_price) / 100 * Number(template.find('#markup').value)) / 100) * 100;
        total_amount = generalPrice * this.count;
    },
    'submit #form-productsEdit': function(event, template){
        event.preventDefault();

        console.log(generalPrice, total_amount);

        if(generalPrice == 0){
            generalPrice = this.price.price
        }

        if(total_amount == 0){
            total_amount = this.price.total_amount
        }

        var product = {
            'name': template.find('#name').value,
            'unit': template.find('#unit').value,
            'price': {
                'purchase_price': this.price.purchase_price,
                'markup': Number(template.find('#markup').value),
                'price': generalPrice,
                'total_amount': total_amount
            }
        };

        var products = Products.find().fetch();
        var repeated = false;
        var repeatedItem = '';

        products.forEach(function(item, i){
            if(item.name == template.find('#name').value){
                repeated = true;
                repeatedItem = item.name;
            }
        });

        if(repeated == true && repeatedItem != this.name){
            throwMessage('danger', 'Товар уже существует');
        } else {
            if(document.forms[0].checkValidity()){
                Meteor.call('products-update', this._id, product, function(){
                    Session.set('modal', null);
                    throwMessage('success', 'Изменения сохранены');
                });
            } else {
                throwMessage('danger', 'Не все поля заполнены корректно');
            }
        }
    }
});

Template.productsEdit.helpers({
    units: function(){
        generalPrice = 0;
        total_amount = 0;
        return Units.find({}, {
            sort: [
                ["name", "asc"]
            ]});
    }
});

Handlebars.registerHelper('selected', function(value){
    return this._id == value ? 'selected' : ''
});
