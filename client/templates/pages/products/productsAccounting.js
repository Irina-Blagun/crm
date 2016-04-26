Template.productsAccounting.helpers({
    products: function(){
        return Products.find()
    },
    accounting: function(){
        return Accounting.find()
    },
    settingsProducts: function(){
        return {
            rowsPerPage: 10,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                { key: 'name', label: 'Наименование' },
                { key: 'count', label: 'Количество' },
                { label: 'Ед.изм.', tmpl: Template.unitsForTable },
                { key: 'price.price', label: 'Цена за ед. с нац.' },
                { key: 'price.purchase_price', label: 'Закупочная цена' },
                { key: 'price.markup', label: 'Наценка' },
                { key: 'price.total_amount', label: 'Общая стоимость' }
            ],
            rowClass: function(item){
                var selectedItem = Session.get('selectedItem');
                if(selectedItem && selectedItem._id == item._id){
                    return 'row--selected'
                }
            }
        };
    },
    settingsAccounting: function(){
        return {
            rowsPerPage: 10,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                { key: 'type', label: 'Тип' },
                { key: 'created', label: 'Дата' },
                { key: 'name', label: 'Наименование' },
                { key: 'provider', label: 'Поставщик' },
                { key: 'count', label: 'Количество' },
                { key: 'price.purchase_price', label: 'Закупочная цена' },
                { key: 'price.total_amount', label: 'Общая стоимость' },
                { key: 'creator', label: 'Провёл' }
            ]
        };
    },
    buttonStateDisabled: function(){
        return !Session.get('selectedItem') && 'disabled'
    }
});

Template.productsAccounting.events({
    'click #edit': function(){
        var selectedItem = Session.get('selectedItem');
        if(selectedItem) {
            Session.set('modal', {
                name: 'productsEdit',
                data: {
                    product: Session.get('selectedItem')
                }
            });
        }
    },
    'click #remove': function(){
        var selectedItem = Session.get('selectedItem');
        if(selectedItem) {
            Session.set('modal', {
                name: 'productsRemove',
                data: {
                    product: Session.get('selectedItem')
                }
            });
        }
    },
    'click .reactive-table tbody tr': function(){
        var selectedItem = Session.get('selectedItem');
        if(selectedItem && selectedItem._id == this._id){
            Session.set('selectedItem', null);
        } else {
            Session.set('selectedItem', this);
        }
    },
    'click #accountingComing': function(){
        var selectedItem = Session.get('selectedItem');
        if(selectedItem) {
            Session.set('modal', {
                name: 'accountingComing',
                data: {
                    product: Session.get('selectedItem')
                }
            });
        }
    }
});

Template.unitsForTable.helpers({
    units: function(){
        return Units.find({_id: this.unit});
    }
});