Template.stores.helpers({
    settings: function(){
        return {
            collection: Stores,
            rowsPerPage: 10,
            showFilter: false,
            fields: [
                { key: 'name', label: 'Магазин' },
                { key: 'address', label: 'Адрес' }
            ]
        };
    }
});

//{cid: Meteor.companyId()}
