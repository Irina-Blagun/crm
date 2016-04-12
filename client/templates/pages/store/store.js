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
                { key: 'address', label: 'Адрес' },
                { label: '', tmpl: Template.storesTableActions }
            ]
        };
    }
});

Template.storesTableActions.events({
    'click .btn': function(){
        Session.set('modal', {
            name: 'storesEdit',
            data: {
                store: this
            }
        });
    },
    'click #remove': function(){
        Session.set('modal', {
            name: 'storesRemove',
            data: {
                _id: this._id
            }
        });
    }
});