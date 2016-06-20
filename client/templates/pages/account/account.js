Template.account.helpers({
    user: function(){
        return Users.findOne({_id: Meteor.userId()})
    }
});

Template.account.events({
    'click #edit': function(){
        var user = Users.findOne({_id: Meteor.userId()});
            Session.set('modal', {
                name: 'accountEdit',
                data: {
                    _id: user._id,
                    createdAt: user.createdAt,
                    emails: [{
                        address: user.emails[0].address
                    }],
                    profile: {
                        first_name: user.profile.first_name,
                        last_name: user.profile.last_name,
                        path_name: user.profile.path_name,
                        role: user.profile.role,
                        phone: user.profile.phone,
                        sid: user.profile.sid,
                        stores: user.profile.stores,
                        flags: user.profile.flags,
                        deleted: user.profile.deleted,
                        delete_date: user.profile.delete_date
                    }
                }
            });
        }
});
