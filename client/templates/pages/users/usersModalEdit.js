Template.usersEdit.helpers({
    user: function(){
        //return Users.findOne({_id:this._id});
        user = Users.findOne({_id:this._id});
        return user;
    },
    allStores: function(){
        return Stores.find();
    }
});
    //,
    //roles: function(){
    //    return [
    //        'Директор',
    //        'Продавец',
    //        'Бухгалтер'
    //    ]
    //}
//
//Handlebars.registerHelper('selected', function(option, value){
//    if (option === value) {
//        return ' selected';
//    } else {
//        return ''
//    }
//});

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
            'profile.flags': 0,
            'profile.role': template.find('#role').value,
            'profile.phone': template.find('#phone').value,
            'profile.stores': stores
        };

        Meteor.call('users-update', this._id, user, function(){
            Session.set('modal', null);
        })
    }
});

Template.usersEdit.rendered = function(){
    var flags = user.profile.flags;
    this.findAll('input[name=flag]').forEach(function(checkbox){
        var flag = Number(checkbox.value);
        checkbox.checked = (flags & flag) === flag;
    });
};