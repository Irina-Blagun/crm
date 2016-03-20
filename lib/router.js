Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    waitOn: function (){
        return [Meteor.subscribe('users')];
    }
});

Router.route('/home', function () {
    this.render('home');
});

Router.route('/users', function () {
    this.render('users');
});

Router.route('/roles', function () {
    this.render('roles');
});

Router.route('/login', function () {
    this.render('login');
});

Router.route('/register', function () {
    this.render('register');
});

Router.route('/user/:id', {
    name: 'userInfo',
    waitOn: function(){
        return [
            Meteor.subscribe('user', this.params.id)
        ];
    },
    data: function(){
        return Users.findOne(this.params.id)
    }
});

Router.route('/roles/add', function () {
    this.render('addRoles');
});

Router.route('/roles/edit/:id', {
    name: 'editRoles',
    waitOn: function(){
        return [
            Meteor.subscribe('roles', this.params.id)
        ];
    },
    data: function(){
        return Roles.findOne(this.params.id)
    }
});

var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}

Router.onBeforeAction(requireLogin, {only: 'users'});

