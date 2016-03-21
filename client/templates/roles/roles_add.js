Template.addRoles.events({
	'submit #addRoles-form': function(event, template){
		event.preventDefault();

		var role = {
			rolename: template.find('#rolename').value,
			system: template.find('input[name=system]').checked,
			flags: 0
		};

		template.findAll('input[name=flag]').forEach(function(flag){
			if(flag.checked){
				role.flags += Number(flag.value);
			}
		});

		Meteor.call('addRole', role, function(){
			event.target.reset();
		})

	}
});