Template.enroll.events({
	'submit #form-enroll': function(event, template){
		event.preventDefault();

		var password = template.find('#password').value;

		var password2 = template.find('#password2').value;

		if(password == '' && password2 == ''){
			throwMessage('danger', 'Пароль не введён');
		} else if(password !== password2) {
			throwMessage('danger', 'Пароли не совпадают');
		} else {
			Accounts.resetPassword(this.token, password, function(err){
				if(err){
					throwMessage('danger', 'Пароль не установлен');
				} else {
					throwMessage('success', 'Пароль установлен');
					Router.go('/')
				}
			});
		}
	}
});