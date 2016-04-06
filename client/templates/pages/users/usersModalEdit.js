Template.usersEdit.helpers({
   user: function(){
       return Users.findOne({_id:this._id});
   }
});

Template.usersEdit.events({
    'submit #form-usersEdit': function(event, template){
        event.preventDefault();

        var fio = template.find('#fio').value;
        fio = fio.split(' ');

        var user = {
            'profile.first_name': fio[1],
            'profile.last_name': fio[0],
            'profile.path_name': fio[2],
            'profile.flags': 1000,
            'profile.role': template.find('#role').value,
            'profile.phone': template.find('#phone').value
        };

        Meteor.call('users-update', this._id, user, function(){
            alert('update')
        })
    }
});