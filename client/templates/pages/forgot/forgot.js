Template.forgot.events({
    'submit #form-forgot': function(event, template){
        event.preventDefault();

        var email = template.find('#email').value;

        Accounts.forgotPassword({email: email}, function(err){
            if(err){
                throwMessage('danger', 'Ссылка не отправлена');
            } else {
                throwMessage('success', 'Ссылка для восстановления пароля отправлена на указанный e-mail')
            }
        });
    }
});
