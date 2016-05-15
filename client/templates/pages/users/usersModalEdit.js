Template.usersEdit.helpers({
    allStores: function(){
        return Stores.find();
    }
});

Template.usersEdit.events({
    'submit #form-usersEdit': function(event, template){
        event.preventDefault();

        var fio = template.find('#fio').value;
        fio = fio.split(' ');

        var stores = template.findAll("input[name=stores]:checked").map(function(store){return store.value});

        var user = {
            'profile.first_name': fio[1],
            'profile.last_name': fio[0],
            'profile.path_name': fio[2],
            'profile.role': template.find('#role').value,
            'profile.phone': template.find('#phone').value,
            'profile.stores': stores,
            'profile.flags': 0
        };

		template.findAll('input[name=flag]').forEach(function(flag){
			if(flag.checked){
				user['profile.flags'] += Number(flag.value);
			}
		});

        Meteor.call('users-update', this.user._id, user, function(){
            Session.set('modal', null);
        })
    }
});

Template.usersEdit.rendered = function(){
	const user = Users.findOne({_id: this.data._id});

	if(!user.profile) return;

	if(user.profile.flags > 0){
		this.findAll('input[name=flag]').forEach(function(checkbox){
			var flag = Number(checkbox.value);
			checkbox.checked = (user.profile.flags & flag) === flag;
		});
	}

	if(user.profile.stores && user.profile.stores.length){
		this.findAll("input[name=stores]").forEach(function(store){
			store.checked = user.profile.stores.some(function(s){ return store.value === s });
		});
	}
};