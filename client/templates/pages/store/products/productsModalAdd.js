Template.productsAdd.events({
    'click button': function(event, template){
        event.preventDefault();

        var product = {
            'name': template.find('#name').value,
            'count': 0,
            'unit': template.find('#unit').value,
            'price': {
                'purchase_price': Number(template.find('#purchase_price').value),
                'markup': Number(template.find('#markup').value),
                'price': accounting.unformat(template.find('#price').value),
                'total_amount': 0
            },
            'category': Session.get('category'),
            'sid': localStorage.getItem('store')
        };

        var products = Products.find().fetch();
        var repeated = false;

        products.forEach(function(item, i){
            if(item.name == template.find('#name').value){
                repeated = true;
            }
        });

        if(repeated == true){
            throwMessage('danger', 'Товар уже добавлен');
        } else {
            if(document.forms[0].checkValidity()){
                Meteor.call('products-create', product, function(){
                    Session.set('modal', null);
                    throwMessage('success', 'Товар добавлен');
                });
            } else {
                throwMessage('danger', 'Не все поля заполнены корректно');
            }
        }

    },
    'input input': function(event, template){
        price = Number(template.find('#purchase_price').value) + Number(template.find('#purchase_price').value / 100 * Number(template.find('#markup').value));
        template.find('#price').value = accounting.formatNumber((Math.round((price) / 100) * 100), 0, ' ');
    }
});

Template.productsAdd.helpers({
    units: function(){
        return Units.find({}, {
            sort: [
                ["name", "asc"]
            ]});
    }
});