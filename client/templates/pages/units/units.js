Template.units.helpers({
    units: function(){
        return Units.find()
    },
    settings: function(){
        return {
            rowsPerPage: 13,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                { key: 'name', label: 'Единица измерения', sortOrder: 0, sortDirection: 'ascending' },
                { key: 'short_name', label: 'Сокращенное название' }
            ],
            rowClass: function(unit){
                var selectedUnit = Session.get('selectedUnit');
                if(selectedUnit && selectedUnit._id == unit._id){
                    return 'row--selected'
                }
            }
        };
    },
    buttonStateDisabled: function(){
        return !Session.get('selectedUnit') && 'disabled'
    }
});

Template.units.events({
    'click #add': function(){
        Session.set('selectedUnit', null);
    },
    'click #edit': function(){
        var selectedUnit = Session.get('selectedUnit');
        var unit = Units.findOne({_id: selectedUnit._id});
        if(selectedUnit){
            Session.set('modal', {
                name: 'unitsEdit',
                data: {
                    _id: unit._id,
                    name: unit.name,
                    short_name: unit.short_name
                }
            });
        }
    },
    'click #remove': function(){
        var selectedUnit = Session.get('selectedUnit');
        var unit = Units.findOne({_id: selectedUnit._id});
        if(selectedUnit){
            Session.set('modal', {
                name: 'unitsRemove',
                data: {
                    _id: unit._id,
                    name: unit.name,
                    short_name: unit.short_name
                }
            });
        }
    },
    'click #units .reactive-table tbody tr': function(){
        var selectedUnit = Session.get('selectedUnit');
        if(selectedUnit && selectedUnit._id == this._id){
            Session.set('selectedUnit', null);
        } else {
            Session.set('selectedUnit', this);
        }
    }
});