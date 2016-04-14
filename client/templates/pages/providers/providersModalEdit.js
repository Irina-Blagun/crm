Template.providersEdit.events({
    'submit #form-providersEdit': function(event, template){
        event.preventDefault();

        var provider = {
            'name': template.find('#name').value
        };

        Meteor.call('providers-update', this.provider._id, provider, function(){
            Session.set('modal', null);
        })
    }
});