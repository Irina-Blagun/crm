Template.orders.helpers({
    orders: function(){
        return Orders.find({sid: Session.get('store') || localStorage.getItem('store')})
    },
    ordersProducts: function(){
        var selectedItem = Session.get('selectedItem');
        if(selectedItem){
            return OrdersProducts.find({order: Session.get('selectedItem')._id})
        } else {
            return []
        }
    },
    settingsOrders: function(){
        return {
            rowsPerPage: 5,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                { key: 'number', label: '№ заказа' },
                { key: 'status', label: 'Статус', fn: function(value){
                    var status;
                    if(value == 0){
                        status = 'Открыт'
                    } else {
                        status = 'Закрыт'
                    }
                    return status
                    }
                },
                { key: 'provider', label: 'Поставщик', fn: function(value){
                        if(value){
                            var provider = Providers.findOne({_id: value});
                            return provider && provider.name
                        }
                    }
                },
                { key: 'created', label: 'Открыт', sortByValue: true, sortOrder: 0, sortDirection: 'descending', fn: function(value){
                        return moment(value).format('LLL')
                    }
                },
                { key: 'closed', label: 'Закрыт', sortByValue: true, fn: function(value){
                        if(value) {
                            return moment(value).format('LLL')
                        }
                    }
                }
            ],
            rowClass: function(item){
                var selectedItem = Session.get('selectedItem');
                if(selectedItem && selectedItem._id == item._id){
                    return 'row--selected'
                }
            }
        };
    },
    settingsOrdersProducts: function(){
        return {
            rowsPerPage: 5,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                { key: 'name', label: 'Наименование' },
                { key: 'count', label: 'Количество' },
                { key: 'comment', label: 'Комментарий' }
            ],
            rowClass: function(itemOP){
                var selectedItemOP = Session.get('selectedItemOP');
                if(selectedItemOP && selectedItemOP._id == itemOP._id){
                    return 'row--selected'
                }
            }
        };
    },
    buttonStateDisabled: function(){
        return !Session.get('selectedItem') && 'disabled'
    },
    buttonStateDisabledOP: function(){
        return !Session.get('selectedItemOP') || Session.get('selectedItem').status == 1 && 'disabled'
    },
    buttonStateDisabledStatus: function(){
        return !Session.get('selectedItem') || Session.get('selectedItem').status == 1 && 'disabled'
    }
});

Template.orders.events({
    'click #add': function(){
        Session.set('selectedItem', null);
    },
    'click #edit': function(){
        var selectedItem = Session.get('selectedItem');
        var order = Orders.findOne({_id: selectedItem._id});
        if(selectedItem){
            Session.set('modal', {
                name: 'ordersEdit',
                data: {
                    _id: order._id,
                    number: order.number,
                    provider: order.provider,
                    status: order.status,
                    sid: order.sid,
                    created: order.created,
                    closed: order.closed
                }
            });
        }
    },
    'click #remove': function(){
        var selectedItem = Session.get('selectedItem');
        var order = Orders.findOne({_id: selectedItem._id});
        if(selectedItem){
            Session.set('modal', {
                name: 'ordersRemove',
                data: {
                    _id: order._id,
                    number: order.number,
                    provider: order.provider,
                    status: order.status,
                    sid: order.sid,
                    created: order.created,
                    closed: order.closed
                }
            });
        }
    },
    'click #removeAccounting': function(){
        var selectedItemOP = Session.get('selectedItemOP');
        if(selectedItemOP){
            Session.set('modal', {
                name: 'accountingRemove',
                data: {
                    accounting: Session.get('selectedItemOP')
                }
            });
        }
    },
    'click #orders .reactive-table tbody tr': function(){
        var selectedItem = Session.get('selectedItem');
        if(selectedItem && selectedItem._id == this._id){
            Session.set('selectedItem', null);
            Session.set('selectedItemOP', null);
        } else {
            Session.set('selectedItem', this);
            Session.set('selectedItemOP', null);
        }
    },
    'click #ordersProducts .reactive-table tbody tr': function(){
        var selectedItemOP = Session.get('selectedItemOP');
        if(selectedItemOP && selectedItemOP._id == this._id){
            Session.set('selectedItemOP', null);
        } else {
            Session.set('selectedItemOP', this);
        }
    },
    'click #editOrdersProduct': function(){
        var selectedItemOP = Session.get('selectedItemOP');
        var ordersProduct = OrdersProducts.findOne({_id: selectedItemOP._id});
        if(selectedItemOP){
            Session.set('modal', {
                name: 'ordersProductEdit',
                data: {
                    _id: ordersProduct._id,
                    name: ordersProduct.name,
                    product: ordersProduct.product,
                    count: ordersProduct.count,
                    order: ordersProduct.order,
                    sid: ordersProduct.sid,
                    comment: ordersProduct.comment
                }
            });
        }
    },
    'click #removeOrdersProduct': function(){
        var selectedItemOP = Session.get('selectedItemOP');
        var ordersProduct = OrdersProducts.findOne({_id: selectedItemOP._id});
        if(selectedItemOP){
            Session.set('modal', {
                name: 'ordersProductRemove',
                data: {
                    _id: ordersProduct._id,
                    name: ordersProduct.name,
                    product: ordersProduct.product,
                    count: ordersProduct.count,
                    order: ordersProduct.order,
                    sid: ordersProduct.sid,
                    comment: ordersProduct.comment
                }
            });
        }
    },
    'click #orderClose': function(){
        var order = Session.get('selectedItem');
        if(OrdersProducts.find({order: order._id}).count() !== 0){
            Meteor.call('orderClosed', order._id, {
                html: Blaze.toHTMLWithData(Template.shareOrderEmail, {order: order}),
                from: Companies.findOne({_id: Meteor.companyId()}).email.toString(),
                to: Providers.findOne({_id: order.provider}).email.toString(),
                subject: "Заявка на заказ товара"
            });
            throwMessage('success', 'Заказ закрыт');
            return Session.set('selectedItem', null);
        } else {
            throwMessage('danger', 'Заказ пуст');
        }
    }
});
