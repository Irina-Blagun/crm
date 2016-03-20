Template.userItem.helpers({
    userClass: function(){
        if(Accounts.userId() === this._id) return 'success'
    }
});