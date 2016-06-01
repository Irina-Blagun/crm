Template.storeSales.helpers({
    store: function () {
        return Stores.findOne({_id: Session.get('store') || localStorage.getItem('store')})
    },
    accounting: function(){
        console.log(Session.get('store') || localStorage.getItem('store'));
        console.log(Session.get('toDate'));
        var result = Accounting.find({sid: Session.get('store') || localStorage.getItem('store'), type: 'Продажа', created: {$lt: Session.get('toDate'), $gte: Session.get('fromDate')}});
        return result
    },
    resultSum: function(){
        var res = Accounting.find({sid: Session.get('store') || localStorage.getItem('store'), type: 'Продажа', created: {$lt: Session.get('toDate'), $gte: Session.get('fromDate')}});
        var resultSum = 0;
        res.forEach(function(item, i) {
            resultSum += item.price.total_amount
        });
        if(resultSum !== 0){
            return accounting.formatNumber(resultSum, 0, ' ');
        } else {
            return 0
        }

    },
    settings: function(){
        return {
            rowsPerPage: 10,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                { key: 'product_id', label: 'Наименование товара', fn: function(value){
                        var product = Products.findOne({_id: value});
                        return product.name
                    }
                },
                { key: 'price.total_amount', label: 'Cумма', fn: function(value){
                    return accounting.formatNumber(value, 0, " ")
                }
                },
                { key: 'created', label: 'Дата', sortOrder: 0, sortDirection: 'descending', hidden: false, fn: function(value){
                        return moment(value).format('LLL')
                    }
                }
            ]
        };
    }
});

Template.storeSales.rendered = function(){
    Deps.autorun(function(){
        $(function () {
            $('#datetimepicker1').datetimepicker({
                locale: 'ru',
                format: 'DD MMMM YYYY',
                showTodayButton: true,
                defaultDate: new Date(),
                maxDate: new Date()
            });

            var date = new Date();
            var year = date.getUTCFullYear();
            var month = date.getUTCMonth();
            var day = date.getUTCDate();

            var fromDate = new Date(year, month, day+1, 0, 0, 0);
            var toDate = new Date(year, month, day+1, 23, 59, 59);

            Session.set('fromDate', fromDate);
            Session.set('toDate', toDate);

            resultSum = 20;


            $("#datetimepicker1").on("dp.change", function(e) {

                var dateCal = moment(e.date).format();
                dateCal = moment(dateCal).toDate();

                var year = dateCal.getUTCFullYear();
                var month = dateCal.getUTCMonth();
                var day = dateCal.getUTCDate();

                var fromDate = new Date(year, month, day+1, 0, 0, 0);
                var toDate = new Date(year, month, day+1, 23, 59, 59);

                Session.set('fromDate', fromDate);
                Session.set('toDate', toDate);
            });
        })
    })
};