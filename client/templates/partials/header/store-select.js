Template.storeSelect.helpers({
	stores: function(){
		return Stores.find()
	},
	'storeSelected': function(){
		return Session.get('storeSelected')
	}
});