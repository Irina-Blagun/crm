Template.unitsEdit.events({
    'submit #form-unitsEdit': function(event, template){
        event.preventDefault();

        var unit = {
            'name': template.find('#name').value,
            'short_name': template.find('#short_name').value
        };

        var units = Units.find().fetch();
        var repeated = false;
        var repeatedName = '';

        units.forEach(function(item, i){
            if(item.name == template.find('#name').value){
                repeated = true;
                repeatedName = item.name;
            }
        });

        if(repeated == true && repeatedName !== this.name){
            throwMessage('danger', 'Единица измерения уже добавлена');
        } else {
            if(document.forms[0].checkValidity()){
                Meteor.call('units-update', this._id, unit, function(){
                    Session.set('modal', null);
                    throwMessage('success', 'Изменения сохранены');
                });
            } else {
                throwMessage('danger', 'Не все поля заполнены корректно');
            }
        }
    }
});