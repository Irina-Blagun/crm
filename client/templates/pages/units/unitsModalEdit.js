Template.unitsEdit.events({
    'submit #form-unitsEdit': function(event, template){
        event.preventDefault();

        var unit = {
            'name': template.find('#name').value,
            'short_name': template.find('#short_name').value
        };

        Meteor.call('units-update', this._id, unit, function(){
            Session.set('modal', null);
        })
    }
});