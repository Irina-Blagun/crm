Template.usersEdit.helpers({
    allStores: function(){
        // return Stores.find({deleted: false});
        return Stores.find({deleted: false}, {
            sort: [
                ["name", "asc"]
            ]});
    }
});

Template.usersEdit.events({
    'change #checkAll': function(){
        $('#checkAll').click(function(){
            $('input[name=flag]').prop('checked', this.checked);
        });
    },
    'change input[name=flag]': function(){
            var check = ($('input[name=flag]').filter(":checked").length == $('input[name=flag]').length);
            $('#checkAll').prop("checked", check);
    },
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
        

        var users = Users.find({'profile.deleted': false}).fetch();
        var repeated = false;
        var repeatedPhone = '';

        users.forEach(function(item, i){
            if(item.profile.phone == template.find('#phone').value){
                repeated = true;
                repeatedPhone = item.profile.phone;
            }
        });

        if(repeated == true && repeatedPhone != this.profile.phone){
            throwMessage('danger', 'Пользователь с таким номером телефона уже существует');
        } else if(stores == 0){
            throwMessage('danger', 'Пользователю не назначен ни один магазин');
        } else {
            if(document.forms[0].checkValidity()){
                Meteor.call('users-update', this._id, user, function(){
                    Session.set('modal', null);
                    throwMessage('success', 'Изменения сохранены');
                });
            } else {
                throwMessage('danger', 'Не все поля заполнены корректно');
            }
        }
    }
});

Template.usersEdit.rendered = function(){
	const user = Users.findOne({_id: this.data._id});

	if(!user.profile) return;

	if(user.profile.flags > 0){
		this.findAll('input[name=flag]').forEach(function(checkbox){
            if(Meteor.isCompanyAdmin() && Meteor.userId() == user._id){
                checkbox.checked = true;
                checkbox.disabled = true;
            } else {
                var flag = Number(checkbox.value);
                checkbox.checked = (user.profile.flags & flag) === flag;
            }
		});
        this.findAll('input[name=all]').forEach(function(all){
            if(Meteor.isCompanyAdmin() && Meteor.userId() == user._id){
                all.disabled = true;
            }
        });
        if($('input[name=flag]').filter(":checked").length == $('input[name=flag]').length) {
            var check = ($('input[name=flag]').filter(":checked").length == $('input[name=flag]').length);
            $('#checkAll').prop("checked", check);
        }
	}

	if(user.profile.stores && user.profile.stores.length){
        var _userId = Meteor.userId();
		this.findAll("input[name=stores]").forEach(function(store){
            console.log(_userId, user._id);
			if(Meteor.isCompanyAdmin() && Meteor.userId() == user._id){
                store.checked = true;
                store.disabled = true;
            } else {
                store.checked = user.profile.stores.some(function(s){
                    return store.value === s
                });
            }
		});
	}
};