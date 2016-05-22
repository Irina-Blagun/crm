Template.usersAdd.helpers({
    allStores: function(){
        return Stores.find();
    }
});

Template.usersAdd.onCreated = function(x,y){
	console.log(this.allStores);
};

Template.usersAdd.events({
    'click button': function(event, template){
        event.preventDefault();

        var fio = template.find('#fio').value;
        fio = fio.split(' ');

        var stores = template.findAll("input[name=stores]:checked").map(function(store){return store.value});

        var user = {
            email: template.find('#email').value,
            profile: {
                first_name: fio[1],
                last_name: fio[0],
                path_name: fio[2],
                role: template.find('#role').value,
                phone: template.find('#phone').value,
                cid: Meteor.companyId(),
                stores: stores,
                flags: 0
            }
        };

        template.findAll('input[name=flag]').forEach(function(flag){
            if(flag.checked){
                user.profile.flags += Number(flag.value);
            }
        });

        Meteor.call('users-create', user, function(){
            Session.set('modal', null);
        })
    }
});


function checkFields(keys, fields){
	
}