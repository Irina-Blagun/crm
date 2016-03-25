Template.enroll.events({
	'submit #form-enroll': function(event, template){
		event.preventDefault();

		var password = template.find('#password').value;
		// TODO: Сделать ввод повторого пароля(2-ое поле)

		alert(password);

		Accounts.resetPassword(this.token, password, function(err){
			if(err){
				// TODO: Обработать ошибку
			}
		});
	}
});