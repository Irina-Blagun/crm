/**
 * Created by ilya.suhodolskiy on 28.03.16.
 */

Template.header.events({
    'click #exit': function () {
        Meteor.logout();
        Router.go('/login')
    }
});