Template.productsAccounting.helpers({
    products: function(){
        return Products.find()
    },
    accounting: function(){
        var selectedItem = Session.get('selectedItem');
        if(selectedItem) {
            return Accounting.find({name: Session.get('selectedItem').name})
        } else {
            return []
        }
    },
    settingsProducts: function(){
        return {
            rowsPerPage: 5,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                { key: 'name', label: 'Наименование' },
                { key: 'count', label: 'Количество' },
                { label: 'Ед.изм.', tmpl: Template.unitsForTable, sortable: false },
                { key: 'price.price', label: 'Цена за ед. с нац.' },
                { key: 'price.purchase_price', label: 'Закупочная цена' },
                { key: 'price.markup', label: 'Наценка' },
                { key: 'price.total_amount', label: 'Общая стоимость' },
                { key: 'created', hidden: true, sortOrder: 0, sortDirection: 'descending' }
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
            rowsPerPage: 5,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                { key: 'type', label: 'Тип' },
                { key: 'created', label: 'Дата', sortOrder: 0, sortDirection: 'descending' },
                { key: 'name', label: 'Наименование' },
                { label: 'Поставщик', tmpl: Template.providersForTable },
                { key: 'count', label: 'Количество' },
                { key: 'price.purchase_price', label: 'Закупочная цена' },
                { key: 'price.total_amount', label: 'Общая стоимость' },
                { label: 'Провёл', tmpl: Template.creatorsForTable }
            ],
            rowClass: function(itemAcc){
                var selectedItemAcc = Session.get('selectedItemAcc');
                if(selectedItemAcc && selectedItemAcc._id == itemAcc._id){
                    return 'row--selected'
                }
            }
        };
    },
    buttonStateDisabled: function(){
        return !Session.get('selectedItem') && 'disabled'
    },
    buttonStateDisabledAcc: function(){
        return !Session.get('selectedItemAcc') && 'disabled'
    }
});

Template.productsAccounting.events({
    'click #add': function(){
        Session.set('selectedItem', null);
    },
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
    'click #removeAccounting': function(){
        var selectedItemAcc = Session.get('selectedItemAcc');
        if(selectedItemAcc) {
            Session.set('modal', {
                name: 'accountingRemove',
                data: {
                    accounting: Session.get('selectedItemAcc')
                }
            });
        }
        console.log(selectedItemAcc)
    },
    'click #products .reactive-table tbody tr': function(){
            var selectedItem = Session.get('selectedItem');
            if (selectedItem && selectedItem._id == this._id) {
                Session.set('selectedItem', null);
            } else {
                Session.set('selectedItem', this);
            }
    },
    'click #accounting .reactive-table tbody tr': function(){
        var selectedItemAcc = Session.get('selectedItemAcc');
        if (selectedItemAcc && selectedItemAcc._id == this._id) {
            Session.set('selectedItemAcc', null);
        } else {
            Session.set('selectedItemAcc', this);
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
    units: function() {
        return Units.find({_id: this.unit});
    }
});

Template.providersForTable.helpers({
    providers: function(){
        return Providers.find({_id: this.provider});
    }
});

Template.creatorsForTable.helpers({
    creators: function(){
        return Users.find({_id: this.creator});
    }
});