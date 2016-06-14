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
                { key: 'name', label: 'Наименование', sortOrder: 0, sortDirection: 'ascending' },
                { key: 'address', label: 'Адрес'},
                { key: 'unp', label: 'УНП' },
                { key: 'phone', label: 'Телефон' },
                { key: 'email', label: 'E-mail', hidden: !Meteor.userCheckAccess(2) },
                { key: 'bank.name', label: 'Наименование банка', hidden: !Meteor.userCheckAccess(2) },
                { key: 'bank.address', label: 'Адрес банка', hidden: !Meteor.userCheckAccess(2) },
                { key: 'created', label: 'Дата добавления', sortByValue: true, hidden: Meteor.userCheckAdmin(), fn: function(value){
                        //return
                        return moment(value).format('LLL')
                    }
                }
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
        var provider = Providers.findOne({_id: selectedProvider._id});
        if (selectedProvider) {
            Session.set('modal', {
                name: 'providersRemove',
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
    'click #providers .reactive-table tbody tr': function(){
        var selectedProvider = Session.get('selectedProvider');
        if (selectedProvider && selectedProvider._id == this._id) {
            Session.set('selectedProvider', null);
        } else {
            Session.set('selectedProvider', this);
        }
    }
});


