Template.reset.events({
    'submit #form-reset': function(event, template){
        event.preventDefault();

        var newPassword = template.find('#password').value;

        var password2 = template.find('#password2').value;
        
        if(newPassword == '' && password2 == ''){
            throwMessage('danger', 'Пароль не введён');
        } else if(newPassword !== password2) {
            throwMessage('danger', 'Пароли не совпадают');
        } else {
            Accounts.resetPassword(this.token, newPassword, function(err){
                if(err){
                    throwMessage('danger', 'Новый пароль не установлен');
                } else {
                    throwMessage('success', 'Новый пароль установлен');
                    Router.go('/')
                }
            });
        }
    }
});