/**
 * Created by ilya.suhodolskiy on 28.03.16.
 */

Template.header.events({
    'click #exit': function () {
        Meteor.logout();
        localStorage.setItem('store', null);
        localStorage.removeItem('product');
        Router.go('/login')
    }
});