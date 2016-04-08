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
				{ key: 'profile', label: 'ФИО', fn: function(value){
                    return `${value.last_name} ${value.first_name} ${value.path_name}`
                } },
				{ key: 'profile.comp_flags', label: 'Права', hidden: !Meteor.userCheckAccess(-1) },
				{ key: 'profile.role', label: 'Должность' },
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