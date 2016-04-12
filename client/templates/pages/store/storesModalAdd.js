Template.storesAdd.events({
    'click button': function(event, template){
        event.preventDefault();

        var store = {
            'name': template.find('#name').value,
            'address': template.find('#address').value
        };

        Meteor.call('stores-create', store, function(){
            Session.set('modal', null);
        })
    }
});