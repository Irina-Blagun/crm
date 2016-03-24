Template.forgot.events({
    'submit #form-forgot': function(event, template){
        event.preventDefault();

        var email = template.find('#email').value;

        Accounts.forgotPassword({email: email}, function(err){
            if (err) {
                console.log(err);
                // TODO: обработать ошибку
            } else {
                console.log('OK');
            }
        });
    }
});
