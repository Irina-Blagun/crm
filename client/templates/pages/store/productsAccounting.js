Template.productsAccounting.helpers({
    products: function(){
        var store = localStorage.getItem('item');
        return Products.find({sid: store})
    },
    accounting: function(){
        var selectedItem = Session.get('selectedItem');
        if(selectedItem) {
            return Accounting.find({product_id: Session.get('selectedItem')._id})
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
                { key: 'count', label: 'Количество в наличии' },
                { key: 'unit', label: 'Ед.изм.', sortable: false, fn: function(value){
                        //var unit = Units.findOne({_id: value});
                        //return unit.short_name
                    }
                },
                { key: 'price.purchase_price', label: 'Закупочная цена', hidden: !Meteor.userCheckAccess(1) },
                { key: 'price.markup', label: 'Наценка', hidden: !Meteor.userCheckAccess(1) },
                { key: 'price.price', label: 'Цена за ед. с нац.' },
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
                { key: 'created', label: 'Дата', sortOrder: 0, sortDirection: 'descending', fn: function(value){
                        //return moment(value).format('DD MMM YYYY, HH:MM')
                        return moment(value).format('LLL')
                    }
                },
                { key: 'provider', label: 'Поставщик', hidden: !Meteor.userCheckAccess(1), fn: function(value){
                        if(value) {
                            var provider = Providers.findOne({_id: value});
                            return provider.name
                        }
                    }
                },
                { key: 'count', label: 'Количество', hidden: !Meteor.userCheckAccess(1) },
                { key: 'price.total_amount', label: 'Общая стоимость', hidden: !Meteor.userCheckAccess(1) },
                { key: 'creator', label: 'Провёл', fn: function(value){
                        var user = Users.findOne({_id: value});
                        return `${user.profile.last_name} ${user.profile.first_name} ${user.profile.path_name}`
                    }
                }
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
        var product = Products.findOne({_id: selectedItem._id});
        if(selectedItem) {
            Session.set('modal', {
                name: 'productsEdit',
                data: {
                    _id: product._id,
                    name: product.name,
                    count: product.count,
                    unit: product.unit,
                    price: {
                        purchase_price: product.price.purchase_price,
                        markup: product.price.markup,
                        price: product.price.price,
                        total_amount: product.price.total_amount
                    },
                    created: product.created,
                    creator: product.creator,
                    sid: product.sid
                }
            });
        }
    },
    'click #remove': function(){
        var selectedItem = Session.get('selectedItem');
        var product = Products.findOne({_id: selectedItem._id});
        if(selectedItem) {
            Session.set('modal', {
                name: 'productsRemove',
                data: {
                    _id: product._id,
                    name: product.name,
                    count: product.count,
                    unit: product.unit,
                    price: {
                        purchase_price: product.price.purchase_price,
                        markup: product.price.markup,
                        price: product.price.price,
                        total_amount: product.price.total_amount
                    },
                    created: product.created,
                    creator: product.creator,
                    sid: product.sid
                }
            });
        }
    },
    'click #removeAccounting': function(){
        var selectedItemAcc = Session.get('selectedItemAcc');
        if (selectedItemAcc) {
            Session.set('modal', {
                name: 'accountingRemove',
                data: {
                    accounting: Session.get('selectedItemAcc')
                }
            });
        }
    },
    'click #products .reactive-table tbody tr': function(){
            var selectedItem = Session.get('selectedItem');
            if (selectedItem && selectedItem._id == this._id) {
                Session.set('selectedItem', null);
                Session.set('selectedItemAcc', null);
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
        var product = Products.findOne({_id: selectedItem._id});
        if(selectedItem) {
            Session.set('modal', {
                name: 'accountingComing',
                data: {
                    _id: product._id,
                    name: product.name,
                    count: product.count,
                    unit: product.unit,
                    price: {
                        purchase_price: product.price.purchase_price,
                        markup: product.price.markup,
                        price: product.price.price,
                        total_amount: product.price.total_amount
                    },
                    created: product.created,
                    creator: product.creator,
                    sid: product.sid
                }
            });
        }
    },
    'click #accountingSale': function(){
        var selectedItem = Session.get('selectedItem');
        var product = Products.findOne({_id: selectedItem._id});
        if(selectedItem) {
            Session.set('modal', {
                name: 'accountingSale',
                data: {
                    _id: product._id,
                    name: product.name,
                    count: product.count,
                    unit: product.unit,
                    price: {
                        purchase_price: product.price.purchase_price,
                        markup: product.price.markup,
                        price: product.price.price,
                        total_amount: product.price.total_amount
                    },
                    created: product.created,
                    creator: product.creator,
                    sid: product.sid
                }
            });
        }
    }
});