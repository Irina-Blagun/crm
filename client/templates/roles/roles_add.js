Template.addRoles.events({
    'click #addRoles-button': function(e, t){

        function flags() {
            var flags = 0;
            var cbx = document.getElementById("flags").getElementsByTagName("input");
            for (i=0; i < cbx.length; i++) {
                if (cbx[i].type == "checkbox" && cbx[i].checked) {
                    flags +=+ cbx[i].value;
                }
            }
            return flags;
        }

        var role = {
            rolename : t.find('#rolename').value,
            flag : flags()
        }

        Meteor.call('addRole', role, function(){
            $('.addRoles-form')[0].reset();
        })
    }
});