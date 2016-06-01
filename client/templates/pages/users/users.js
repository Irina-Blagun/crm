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
				{ key: 'profile', label: 'ФИО', sortOrder: 0, sortDirection: 'ascending', fn: function(value){
                        return `${value.last_name} ${value.first_name} ${value.path_name}`
                    }
                },
                { key: 'profile.role', label: 'Должность' },
                { key: 'emails', label: 'E-mail', fn: function(value){
                        return `${value[0].address}`
                    }
                },
                // { key: 'profile.flags', label: 'Права', hidden: !Meteor.userCheckAccess(2) },
                { key: 'profile.flags', label: 'Права', hidden: true },
                { key: 'profile.stores', label: 'Магазины', tmpl: Template.userStores, hidden: false },
                { key: 'createdAt', label: 'Дата регистрации', fn: function(value){
                        //return moment(value).format('DD MMM YYYY, HH:MM')
                        return moment(value).format('LLL')
                    }
                }
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
        var user = Users.findOne({_id: selectedUser._id});
        if (selectedUser) {
            Session.set('modal', {
                name: 'usersRemove',
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
    'click #users .reactive-table tbody tr': function(){
        var selectedUser = Session.get('selectedUser');
        if (selectedUser && selectedUser._id == this._id) {
            Session.set('selectedUser', null);
        } else {
            Session.set('selectedUser', this);
        }
    }
});


Template.userStores.helpers({
    stores: function () {
        var stores = this.profile.stores;
        return Stores.find({_id: {$in: stores}}).fetch();
    }
});