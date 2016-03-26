if (Companies.find().count() === 0 && Meteor.isServer) {
	var now = new Date().getTime();

	var cid = Companies.insert({
		name: 'Coca-Cola',
		created: now,
		uid: null
	});


	var uid = Accounts.createUser({
		email: 'tom@cocacola.com',
		password: 'admin',
		profile: {
			first_name: 'Tom',
			last_name: 'Coleman',
			path_name: 'Younger',
			flags: 9999,
			role: null,
			cid: cid
		}
	});

	Companies.update(cid, { $set: { uid: uid } });
}