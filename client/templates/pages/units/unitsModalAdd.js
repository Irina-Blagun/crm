Template.unitsAdd.events({
    'click button': function(event, template){
        event.preventDefault();

        var unit = {
            'name': template.find('#name').value,
            'short_name': template.find('#short_name').value
        };
        
        var units = Units.find().fetch();
        var repeated = false;

        units.forEach(function(item, i){
            if(item.name == template.find('#name').value){
                repeated = true;
            }
        });

        if(repeated == true){
            throwMessage('danger', 'Единица измерения уже добавлена');
        } else {
            if(document.forms[0].checkValidity()){
                Meteor.call('units-create', unit, function(){
                    Session.set('modal', null);
                    throwMessage('success', 'Единица изменения добавлена');
                });
            } else {
                throwMessage('danger', 'Не все поля заполнены корректно');
            }
        }

    }
});