Template.users.helpers({
	settings: function(){
        return {
            collection: Users,
            rowsPerPage: 10,
            showFilter: false,
			showNavigation: 'auto',
            fields: [
				{ key: 'createdAt', label: 'Регистрация', fn: function(value){
					return moment(value).format('DD MMM YYYY, HH:MM:SS')
				} },
				{ key: 'profile.first_name', label: 'Имя' },
				{ key: 'profile.comp_flags', label: 'Права', hidden: !Meteor.userCheckAccess(-1) },
				{ key: 'profile.last_name', label: 'Фамилия' },
                { label: '', tmpl: Template.usersTableActions }
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
    },
    'click #remove': function(){
        Session.set('modal', {
            name: 'usersRemove',
            data: {
                _id: this._id
            }
        });
    }
});