Template.storeSelect.helpers({
	stores: function(){
		var user = Users.findOne({_id: Meteor.userId()});
		return Stores.find({deleted: false, _id: {$in: user.profile.stores}});
	},
	'storeSelected': function(){
		return localStorage.getItem('store');
	}
});

Template.storeSelect.events({
	'change #store-select': function(event, template){

		var store = event.target.options[event.target.selectedIndex].value;

		Session.set('store', store);
		localStorage.setItem('store', store);

		Session.set('selectedItem', null);
		Session.set('selectedItemAcc', null);

	}

});