Template.usersRemove.helpers({
    user: function(){
        return Users.findOne({_id:this._id});
    }
});

Template.usersRemove.events({
    'click #remove': function(event, template){
        event.preventDefault();

        Meteor.call('users-remove', this._id, function(){
            Session.set('modal', null);
        })
    }
});