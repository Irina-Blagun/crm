Template.users.helpers({
    users: function(){
        return Users.find();
    },
    settings: function(){
        return {
            collection: Users,
            rowsPerPage: 10,
            showFilter: true,
            fields: ['_id', 'createdAt']
        };
    }
});