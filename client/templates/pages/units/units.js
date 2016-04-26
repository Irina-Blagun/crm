Template.units.helpers({
    units: function(){
        return Units.find()
    },
    settings: function(){
        return {
            rowsPerPage: 10,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                { key: 'name', label: 'Единица измерения' },
                { key: 'short_name', label: 'Сокращенное название' },
                { label: '', tmpl: Template.unitsTableActions }
            ]
        };
    }
});

Template.unitsTableActions.events({
    'click .btn': function(){
        Session.set('modal', {
            name: 'unitsEdit',
            data: {
                unit: this
            }
        });
    },
    'click #remove': function(){
        Session.set('modal', {
            name: 'unitsRemove',
            data: {
                _id: this._id
            }
        });
    }
});