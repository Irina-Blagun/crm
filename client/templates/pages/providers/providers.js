Template.providers.helpers({
    providers: function(){
        return Providers.find({deleted: false})
    },
    settings: function(){
        return {
            rowsPerPage: 10,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                { key: 'name', label: 'Наименование' },
                { label: '', tmpl: Template.providersTableActions }
            ]
        };
    }
});

Template.providersTableActions.events({
    'click .btn': function(){
        Session.set('modal', {
            name: 'providersEdit',
            data: {
                provider: this
            }
        });
    },
    'click #remove': function(){
        Session.set('modal', {
            name: 'providersRemove',
            data: {
                _id: this._id
            }
        });
    }
});