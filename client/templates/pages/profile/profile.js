Template.profile.helpers({
    user: function(){
        return Users.findOne({_id: Meteor.userId()});
    }
});