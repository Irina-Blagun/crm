Template.company.helpers({
    company: function(){
        return Companies.findOne({_id: Meteor.companyId()});
    }
});