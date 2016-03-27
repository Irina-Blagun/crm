var now = new Date().getTime();

if (Companies.find().count() === 0 && Meteor.isServer) {

	var cid = Companies.insert({
		name: 'Coca-Cola',
		created: now,
		uid: null
	});

	var sid = Stores.insert({
		name: 'ColaStore',
		address: 'New York',
		created: now,
		cid: cid
	});

	Stores.insert({
		name: 'FantaStore',
		address: 'New York',
		created: now,
		cid: cid
	});

	Stores.insert({
		name: 'SpriteStore',
		address: 'New York',
		created: now,
		cid: cid
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
			cid: cid,
			stores: [sid]
		}
	});

	Companies.update(cid, { $set: { uid: uid } });
}
