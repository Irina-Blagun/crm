Template.sidebar.helpers({
	activeRouteClass: function() {
		var args = Array.prototype.slice.call(arguments, 0);
		args.pop();

		var active = args.some(function(name){
			return Router.current() && Router.current().route.getName() === name
		});

		return active && 'sidebar-nav__item--active';
	}
});