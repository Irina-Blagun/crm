Template.providersAdd.events({
    'click button': function(event, template){
        event.preventDefault();

        var provider = {
            'name': template.find('#name').value,
            'address': template.find('#address').value,
            'unp': template.find('#unp').value,
            'email': template.find('#email').value,
            'phone': template.find('#phone').value,
            'bank': {
                'name': template.find('#bank_name').value,
                'address': template.find('#bank_address').value
            }
        };

        Meteor.call('providers-create', provider, function(){
            Session.set('modal', null);
        })
    }
});