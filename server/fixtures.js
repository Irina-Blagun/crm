var now = new Date();

if (Companies.find().count() === 0 && Meteor.isServer) {

	Tree.insert({
		text: 'Первая тестовая категория',
		parent: "#"
	});

	var cid = Companies.insert({
		name: '0c',
		created: now,
		uid: null,
		email: '0c.company.sales@gmail.com',
		address: 'г.Минск, ул.Немига, 22',
		unp: 896596857,
		phone: '+375296379686',
		bank: {
			name: 'Беларусбанк, отделение №510/316',
			address: 'ул.Максима Танка, 34'
		}
	});

	var sid = Stores.insert({
		name: 'ColaStore',
		address: 'New York',
		created: now,
		cid: cid,
		deleted: false,
		delete_date: null
	});

	Stores.insert({
		name: 'FantaStore',
		address: 'New York',
		created: now,
		cid: cid,
		deleted: false,
		delete_date: null
	});

	Stores.insert({
		name: 'SpriteStore',
		address: 'New York',
		created: now,
		cid: cid,
		deleted: false,
		delete_date: null
	});

	Providers.insert({
		name: 'ООО "Обои"'
	});


	var uid = Accounts.createUser({
		email: 'tom@cocacola.com',
		password: 'admin',
		profile: {
			first_name: 'Tom',
			last_name: 'Coleman',
			path_name: 'Y.',
			comp_flags: 9999,
			flags: 9999,
			role: null,
			cid: cid,
			deleted: false,
			delete_date: null,
			stores: [sid]
		}
	});

	Accounts.createUser({
		email: 'ira@cocacola.com',
		password: 'admin',
		profile: {
			first_name: 'Ira',
			last_name: 'Blagun',
			path_name: 'O.',
			comp_flags: 9999,
			flags: 9999,
			role: null,
			cid: cid,
			deleted: false,
			delete_date: null,
			stores: [sid]
		}
	});

	Accounts.createUser({
		email: 'tom@cocacola.com',
		password: 'admin',
		profile: {
			first_name: 'Ira',
			last_name: 'Blagun',
			path_name: 'O.',
			comp_flags: 9999,
			flags: 9999,
			role: null,
			cid: cid,
			deleted: false,
			delete_date: null,
			stores: [sid]
		}
	});

	Companies.update(cid, { $set: { uid: uid } });
}
