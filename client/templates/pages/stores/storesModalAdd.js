Template.storesAdd.events({
    'click button': function(event, template){
        event.preventDefault();

        var short_name = template.find('#name').value;
        short_name.split('');
        short_name = short_name[0]+short_name[1];

        var store = {
            'name': template.find('#name').value,
            'address': template.find('#address').value,
            'short_name': short_name.toUpperCase()
        };

        Meteor.call('stores-create', store, function(){
            Session.set('modal', null);
        })
    }
});