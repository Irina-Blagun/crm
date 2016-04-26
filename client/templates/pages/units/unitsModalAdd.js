Template.unitsAdd.events({
    'click button': function(event, template){
        event.preventDefault();

        var unit = {
            'name': template.find('#name').value,
            'short_name': template.find('#short_name').value
        };

        Meteor.call('units-create', unit, function(){
            Session.set('modal', null);
        })
    }
});