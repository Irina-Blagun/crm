Template.storesEdit.events({
    'submit #form-storesEdit': function(event, template){
        event.preventDefault();

        var store = {
            'name': template.find('#name').value,
            'address': template.find('#address').value
        };

        Meteor.call('stores-update', this.store._id, store, function(){
            Session.set('modal', null);
        })
    }
});