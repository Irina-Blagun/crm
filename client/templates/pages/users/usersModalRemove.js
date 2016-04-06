Template.usersRemove.helpers({
    user: function(){
        return Users.findOne({_id:this._id});
    }
});

Template.usersRemove.events({
    'click #remove': function(){
        Meteor.call('users-remove', this._id, function(){
            alert('remove');
        })
    }
});