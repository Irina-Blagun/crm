Template.accountingRemove.events({
    'click #remove': function(event, template){
        event.preventDefault();
        
        Meteor.call('accounting-remove', this.accounting._id, function(){
            Session.set('modal', null);
            throwMessage('success', 'Учётная операция удалена');
        })
    }
});

Template.accountingRemove.helpers({
    type: function() {
        var type = this.accounting.type;

        if(type == 'Приход'){
            type = 'поступлении'
        } else if(type == 'Продажа'){
            type = 'продаже'
        }
        return type
    }
});