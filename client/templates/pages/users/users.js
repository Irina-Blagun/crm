Template.users.helpers({
    users: function(){
        return Users.find()
    },
	settings: function(){
        return {
            rowsPerPage: 10,
            showFilter: false,
			showNavigation: 'auto',
            fields: [
				{ key: 'createdAt', label: 'Регистрация', fn: function(value){
					    return moment(value).format('DD MMM YYYY, HH:MM:SS')
				    }
                },
				{ key: 'profile', label: 'ФИО', fn: function(value){
                        return `${value.last_name} ${value.first_name} ${value.path_name}`
                    }
                },
				{ key: 'profile.flags', label: 'Права', hidden: !Meteor.userCheckAccess(2) },
				{ key: 'profile.role', label: 'Должность' }
			],
            rowClass: function(user){
                var selectedUser = Session.get('selectedUser');
                if(selectedUser && selectedUser._id == user._id){
                    return 'row--selected'
                }
            }
        };
    },
    buttonStateDisabled: function(){
        return !Session.get('selectedUser') && 'disabled'
    }
});

Template.users.events({
    'click #add': function () {
        Session.set('selectedUser', null);
    },
    'click #edit': function () {
        var selectedUser = Session.get('selectedUser');
        var user = Users.findOne({_id: selectedUser._id});
        if (selectedUser) {
            Session.set('modal', {
                name: 'usersEdit',
                data: {
                    _id: user._id,
                    createdAt: user.createdAt,
                    emails:[{
                        address: user.emails[0].address
                    }],
                    profile:{
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
    },
    'click #remove': function () {
        var selectedUser = Session.get('selectedUser');
        if (selectedUser) {
            Session.set('modal', {
                name: 'usersRemove',
                data: {
                    user: Session.get('selectedUser')
                }
            });
        }
    },
    'click #users .reactive-table tbody tr': function(){
        var selectedUser = Session.get('selectedUser');
        if (selectedUser && selectedUser._id == this._id) {
            Session.set('selectedUser', null);
        } else {
            Session.set('selectedUser', this);
        }
    }
});
