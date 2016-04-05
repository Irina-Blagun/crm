Template.users.helpers({
	settings: function(){
        return {
            collection: Users,
            rowsPerPage: 10,
            showFilter: false,
            fields: [
				{ key: 'createdAt', label: 'Регистрация' },
				{ key: 'profile.first_name', label: 'Имя' },
				{ key: 'profile.comp_flags', label: 'Права', hidden: !Meteor.userCheckAccess(-1) },
				{ key: 'profile.last_name', label: 'Фамилия' },
                { key: 'profile.last_name', label: 'Name', tmpl: Template.usersTableActions }
			]
        };
    }
});

Template.usersTableActions.events({
    'click .btn': function(){
        Session.set('modal', {
            name: 'usersEdit',
            data: {
                _id: this._id
            }
        });
    }
});