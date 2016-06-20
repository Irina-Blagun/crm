Template.productsAccounting.helpers({
    products: function(){
        var user = Users.findOne({_id: Meteor.userId()});
        if(Session.get('store') || localStorage.getItem('store') !== {$in: user.profile.stores}){
            return Products.find({category: Session.get('category'), sid: Session.get('store') || localStorage.getItem('store')})
        } else {
            return
        }
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
            showFilter: true,
            showNavigation: 'auto',
            fields: [
                { key: 'name', label: 'Наименование' },
                { key: 'count', label: 'Кол-во в наличии' },
                { key: 'unit', label: 'Ед. изм.', sortable: false, fn: function(value){
                        if(value){
                            var unit = Units.findOne({_id: value});
                            return unit && unit.short_name
                        }
                    }
                },
                { key: 'price.purchase_price', label: 'Закупочная цена', hidden: !Meteor.userCheckAccess(256), fn: function(value){
                        return accounting.formatNumber(Number(value), 0, ' ')
                    }
                },
                { key: 'price.markup', label: 'Наценка', sortByValue: true, hidden: !Meteor.userCheckAccess(256) },
                { key: 'price.price', label: 'Цена', fn: function(value){
                        return accounting.formatNumber(Number(value), 0, ' ')
                    }
                },
                { key: 'price.total_amount', label: 'Общая стоимость', sortByValue: true, hidden: !Meteor.userCheckAccess(256), fn: function(value){
                        return accounting.formatNumber(Number(value), 0, ' ')
                    }
                },
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
                { key: 'created', label: 'Дата', sortOrder: 0, sortDirection: 'descending', sortByValue: true, fn: function(value){
                    //     return moment(value).format('DD MMM YYYY, HH:MM')
                        return moment(value).format('LLL');
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
                { key: 'price.total_amount', label: 'Общая стоимость', sortByValue: true, fn: function(value){
                        return accounting.formatNumber(Number(value), 0, ' ')
                    }
                },
                { key: 'creator', label: 'Провёл', fn: function(value){
                        var user = Users.findOne({_id: value});
                        return user && `${user.profile.last_name} ${user.profile.first_name} ${user.profile.path_name}`
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
        if(selectedItem){
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
        if(selectedItem){
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
        if(selectedItemAcc){
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
            if(selectedItem && selectedItem._id == this._id){
                Session.set('selectedItem', null);
                Session.set('selectedItemAcc', null);
            } else {
                Session.set('selectedItem', this);
                Session.set('selectedItemAcc', null);
            }
    },
    'click #accounting .reactive-table tbody tr': function(){
        var selectedItemAcc = Session.get('selectedItemAcc');
        if(selectedItemAcc && selectedItemAcc._id == this._id){
            Session.set('selectedItemAcc', null);
        } else {
            Session.set('selectedItemAcc', this);
        }
    },
    'click #accountingComing': function(){
        var selectedItem = Session.get('selectedItem');
        var product = Products.findOne({_id: selectedItem._id});
        if(selectedItem){
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
        if(selectedItem){
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
    },
    'click #productOrder': function(){
        var selectedItem = Session.get('selectedItem');
        var product = Products.findOne({_id: selectedItem._id});
        if(selectedItem){
            Session.set('modal', {
                name: 'ordersProductsAdd',
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
    'click #movement': function(){
        var selectedItem = Session.get('selectedItem');
        var product = Products.findOne({_id: selectedItem._id});
        localStorage.setItem('product', product._id);
        if(selectedItem){
            Session.set('modal', {
                name: 'movement',
				width: 600,
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
    'click #tree': function(){
        Session.set('selectedItem', null);
        Session.set('selectedItemAcc', null);
    }
});

globalDep = new Tracker.Dependency();

Template.productsAccounting.onRendered(function(){
	this.$('#tree').jstree({
		core: {
			data: function(node, cb){
				globalDep.depend();

				var nodes = Tree.find({ sid: Session.get('store') }).fetch();

				cb(nodes.map(function(node){
					node.id = node._id;
					return node
				}));
			},
			check_callback : true
		},
		plugins : ['contextmenu', 'dnd', 'search', 'sort'],
        "contextmenu":{
            "items": function($node){
                var tree = $("#tree").jstree(true);
                return {
                    "Create": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Добавить",
                        "action": function(obj){
                            $node = tree.create_node($node);
                            tree.edit($node);
                        }
                    },
                    "Rename": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Переименовать",
                        "action": function(obj){
                            tree.edit($node);
                        }
                    },
                    "Remove": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Удалить",
                        "action": function(obj){
                            tree.delete_node($node);
                        }
                    }
                };
            }
        }
	}).bind("select_node.jstree", function(e, data){
		Session.set('category', data.node.id);
	}).bind("create_node.jstree", function(e, data){
		console.log(Session.get('store'));
		Meteor.call('category-create', data, Session.get('store'));
	}).bind("rename_node.jstree", function(e, data){
		Meteor.call('category-rename', data);
	}).bind("delete_node.jstree", function(e, data){
		if(data.node.children.length){
			return false;
		}

		Meteor.call('category-remove', data.node.id);
	}).bind("move_node.jstree", function (e, data){
		Meteor.call('category-move', data);
	});
});
