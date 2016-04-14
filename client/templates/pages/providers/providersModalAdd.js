Template.providersAdd.events({
    'click button': function(event, template){
        event.preventDefault();

        var provider = {
            'name': template.find('#name').value
        };

        Meteor.call('providers-create', provider, function(){
            Session.set('modal', null);
        })
    }
});