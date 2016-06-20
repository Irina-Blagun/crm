Template.storeSelect.helpers({
	stores: function(){
		if(Meteor.userId()){
			var user = Users.findOne({_id: Meteor.userId()});
			return Stores.find({deleted: false, _id: {$in: user.profile.stores}}, {
				sort: [
					["name", "asc"]
				]});
		} else {
			return
		}
	},
	'storeSelected': function(){
		return localStorage.getItem('store') || Session.get('store');
	},
	'visible': function(){
		var pages = ['orders', 'storeSales', 'productsAccounting'];
		
		return pages.some(function(page){
			return Router.current() && Router.current().route.getName() === page 
		});
	}
});

Template.storeSelect.events({
	'change #store-select': function(event, template){

		var store = event.target.options[event.target.selectedIndex].value;

		Session.set('store', store);
		localStorage.setItem('store', store);

		Session.set('selectedItem', null);
		Session.set('selectedItemAcc', null);

	},
	'click #store-select': function(event){

		if(localStorage.getItem('store') == null){
			var store = event.target.options[event.target.selectedIndex].value;

			Session.set('store', store);
			localStorage.setItem('store', store);

			Session.set('selectedItem', null);
			Session.set('selectedItemAcc', null);
		}

	}

});