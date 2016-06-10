Template.usersRemove.events({
    'click #remove': function(event, template){
        event.preventDefault();

        if(this._id == Meteor.userId()){
            throwMessage('danger', 'Удаление невозможно');
            return
        }

        Meteor.call('users-remove', this._id, function(){
            Session.set('modal', null);
            throwMessage('success', 'Пользователь удалён');
        })
    }
});