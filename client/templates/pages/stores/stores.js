Template.stores.helpers({
    stores: function(){
        return Stores.find({deleted: false})
    },
    settings: function(){
        return {
            rowsPerPage: 10,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                { key: 'name', label: 'Магазин' },
                { key: 'address', label: 'Адрес' }
            ],
            rowClass: function(store){
                var selectedStore = Session.get('selectedStore');
                if(selectedStore && selectedStore._id == store._id){
                    return 'row--selected'
                }
            }
        };
    },
    buttonStateDisabled: function(){
        return !Session.get('selectedStore') && 'disabled'
    }
});

Template.stores.events({
    'click #add': function () {
        Session.set('selectedStore', null);
    },
    'click #edit': function () {
        var selectedStore = Session.get('selectedStore');
        var store = Stores.findOne({_id: selectedStore._id});
        if (selectedStore) {
            Session.set('modal', {
                name: 'storesEdit',
                data: {
                    _id: store._id,
                    name: store.name,
                    address: store.address,
                    short_name: store.short_name,
                    created: store.created,
                    creator: store.creator,
                    cid: store.sid,
                    deleted: store.deleted,
                    delete_date: store.delete_date
                }
            });
        }
    },
    'click #remove': function () {
        var selectedStore = Session.get('selectedStore');
        if (selectedStore) {
            Session.set('modal', {
                name: 'storesRemove',
                data: {
                    store: Session.get('selectedStore')
                }
            });
        }
    },
    'click #stores .reactive-table tbody tr': function(){
        var selectedStore = Session.get('selectedStore');
        if (selectedStore && selectedStore._id == this._id) {
            Session.set('selectedStore', null);
        } else {
            Session.set('selectedStore', this);
        }
    },
    'click #productsAccounting': function(){
        var name = Session.get('selectedStore').name;
        localStorage.setItem('item', Session.get('selectedStore')._id);
        Router.go('productsAccounting', {name: name})
    }
});
