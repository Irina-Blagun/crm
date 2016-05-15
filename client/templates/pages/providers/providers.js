Template.providers.helpers({
    providers: function(){
        return Providers.find({deleted: false})
    },
    settings: function(){
        return {
            rowsPerPage: 10,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                { key: 'name', label: 'Наименование' }
            ],
            rowClass: function(provider){
                var selectedProvider = Session.get('selectedProvider');
                if(selectedProvider && selectedProvider._id == provider._id){
                    return 'row--selected'
                }
            }
        };
    },
    buttonStateDisabled: function(){
        return !Session.get('selectedProvider') && 'disabled'
    }
});

Template.providers.events({
    'click #add': function () {
        Session.set('selectedProvider', null);
    },
    'click #edit': function () {
        var selectedProvider = Session.get('selectedProvider');
        var provider = Providers.findOne({_id: selectedProvider._id});
        if (selectedProvider) {
            Session.set('modal', {
                name: 'providersEdit',
                data: {
                    _id: provider._id,
                    name: provider.name,
                    address: provider.address,
                    unp: provider.unp,
                    email: provider.email,
                    phone: provider.phone,
                    bank:{
                        name: provider.bank.name,
                        address: provider.bank.address
                    },
                    created: provider.created,
                    cid: provider.cid,
                    deleted: provider.deleted,
                    delete_date: provider.delete_date
                }
            });
        }
    },
    'click #remove': function () {
        var selectedProvider = Session.get('selectedProvider');
        if (selectedProvider) {
            Session.set('modal', {
                name: 'providersRemove',
                data: {
                    provider: Session.get('selectedProvider')
                }
            });
        }
    },
    'click #providers .reactive-table tbody tr': function(){
        var selectedProvider = Session.get('selectedProvider');
        if (selectedProvider && selectedProvider._id == this._id) {
            Session.set('selectedProvider', null);
        } else {
            Session.set('selectedProvider', this);
        }
    }
});


