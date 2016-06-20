Template.usersAdd.helpers({
    allStores: function(){
        return Stores.find({deleted: false});
    }
});

Template.usersAdd.events({
    'change #checkAll': function(){

        $('#checkAll').click(function(){
            $('input[name=flag]').prop('checked', this.checked);
        });

        $('input[name=flag]').change(function(){
            var check = ($('input[name=flag]').filter(":checked").length == $('input[name=flag]').length);
            $('#checkAll').prop("checked", check);
        });
    },
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

        var users = Users.find({'profile.deleted': false}).fetch();
        var repeatedPhone = false;

        users.forEach(function(item, i){
            if(item.profile.phone == template.find('#phone').value){
                repeatedPhone = true;
            }
        });

        if(repeatedPhone == true){
            throwMessage('danger', 'Пользователь с таким номером телефона уже существует');
        } else if(stores == 0){
            throwMessage('danger', 'Пользователю не назначен ни один магазин');
        } else {
            if(document.forms[0].checkValidity()){
                Meteor.call('users-create', user, function(err){
                    if(err){
                        throwMessage('danger', 'Пользователь с таким e-mail уже существует');
                    } else {
                        Session.set('modal', null);
                        throwMessage('success', 'Пользователь добавлен');
                    }
                });
            } else {
                throwMessage('danger', 'Не все поля заполнены корректно');
            }
        }
    }
});
