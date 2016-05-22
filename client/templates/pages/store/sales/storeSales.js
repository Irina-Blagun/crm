Template.storeSales.helpers({
    store: function () {
        store = localStorage.getItem('item');
        return Stores.findOne({_id: store})
    },
    accounting: function(){
        date = new Date();
        year = date.getUTCFullYear();
        month = date.getUTCMonth();
        day = date.getUTCDate();

        fromDate = new Date(year, month, day, 0, 0, 0);
        toDate = new Date(year, month, day, 23, 59, 59);

        console.log(date);

        return Accounting.find({sid: store, type: 'Продажа', created: {$lt: toDate, $gte: fromDate}})
    },
    settings: function(){
        return {
            rowsPerPage: 10,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                { key: 'type', label: 'Тип' },
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
                        //return moment(value).format('DD MMM YYYY, HH:MM')
                        return moment(value).format('LLL')
                    }
                }
            ]
        };
    }
});


Template.storeSales.rendered = function(){

    Deps.autorun(function(){

/// Start Диаграмма продажи товаров за сегодня

        var data = Accounting.find({sid: store, type: 'Продажа', created: {$lt: toDate, $gte: fromDate}}, {
            sort: [
                ["created", "asc"]
            ]
        }).fetch();

        var results = [];
        var summ = 0;
        var time = [];

        data.reduce(function(previousItem, currentItem, index){
            var currenTime = new Date(currentItem.created).getTime();
            var currentTime = moment(currenTime).format("HH:mm");
            if(currentTime > fromDate.getTime() && index == 0 && data.length-1 !== index){
                for(var i=0; i < currentTime-fromDate.getTime(); i++){
                    results.push(0);
                    time.push(fromDate.getTime()+i);
                }
            }
            if(previousItem && previousItem !== currentTime){
                results.push(summ);
                time.push(previousItem);
                summ = 0;
            }
            summ += currentItem.price.total_amount;
            if(data.length-1 == index){
                results.push(summ);
                time.push(currentTime);
            }

            return currentTime;
        }, null);

        if(data.length == 0){
            results.push(0);
            results.push(summ);
            time.push('Сегодня продаж не было');
            drawChart1(results, time);
        } else {
            drawChart(results, time);
        }

/// End Диаграмма продажи товаров за сегодня

/// Start Диаграмма продажи товаров за дату

        $(function () {
            $('#datetimepicker1').datetimepicker({
                locale: 'ru',
                format: 'DD MMMM YYYY',
                showTodayButton: true,
                defaultDate: new Date(),
                maxDate: new Date()
            });
            $("#datetimepicker1").on("dp.change", function (e) {

                dateCal = moment(e.date).format();
                fromDateCal = moment(dateCal).toDate();

                yearCal = fromDateCal.getUTCFullYear();
                monthCal = fromDateCal.getUTCMonth();
                dayCal = fromDateCal.getUTCDate()+1;

                fromDateTime = new Date(yearCal, monthCal, dayCal, 0, 0, 0);
                toDateTime = new Date(yearCal, monthCal, dayCal, 23, 59, 59);

                date = fromDateTime;

                var data = Accounting.find({sid: store, type: 'Продажа', created: {$lt: toDateTime, $gte: fromDateTime}}, {
                    sort: [
                        ["created", "asc"]
                    ]
                }).fetch();

                var results = [];
                var summ = 0;
                var time = [];

                data.reduce(function(previousItem, currentItem, index){
                    var currenTime = new Date(currentItem.created).getTime();
                    var currentTime = moment(currenTime).format("HH:mm");
                    if(currentTime > fromDateTime.getTime() && index == 0 && data.length-1 !== index){
                        for(var i=0; i < currentTime-fromDateTime.getTime(); i++){
                            results.push(0);
                            time.push(fromDateTime.getTime()+i);
                        }
                    }
                    if(previousItem && previousItem !== currentTime){
                        results.push(summ);
                        time.push(previousItem);
                        summ = 0;
                    }
                    summ += currentItem.price.total_amount;
                    if(data.length-1 == index){
                        results.push(summ);
                        time.push(currentTime);
                    }

                    return currentTime;
                }, null);

                if(data.length == 0){
                    results.push(0);
                    results.push(summ);
                    if (fromDateTime < fromDate){
                        time.push('В выбранную дату продаж не было');
                    } else {
                        console.log(fromDateTime);
                        console.log(fromDate);
                        time.push('Сегодня продаж не было');
                    }
                    drawChart1(results, time);
                } else {
                    drawChart(results, time);
                }
            });
        });

/// End Диаграмма продажи товаров за дату

    })
};


//++++++++++++++++++++++++++++

(function(window, document, Chartist) {
    'use strict';

    var defaultOptions = {
        labelClass: 'ct-label',
        labelOffset: {
            x: 0,
            y: -10
        },
        textAnchor: 'middle',
        labelInterpolationFnc: Chartist.noop
    };

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.ctPointLabels = function(options) {

        options = Chartist.extend({}, defaultOptions, options);

        return function ctPointLabels(chart) {
            if(chart instanceof Chartist.Bar) {
                chart.on('draw', function(data) {
                    if(data.type === 'bar') {
                        data.element.attr({
                            style: 'stroke-width: 40px'
                        });
                    }
                });
            }
        };
    };

}(window, document, Chartist));

//++++++++++++++++++++++++++++++++++++++++++++

function drawChart(series, labels) {
    new Chartist.Bar('.ct-chart', {
        labels: labels,
        series: series
    }, {
        plugins: [
            Chartist.plugins.ctPointLabels({
                textAnchor: 'middle'
            })
        ],
        distributeSeries: true,
        axisY: {
            onlyInteger: true,
            offset: 200,
            divisor: 1000000,
            labelInterpolationFnc: function(value) {
                value = accounting.formatNumber(value, 0, " ");
                return value + ' Br'
            }
        }
    });
    setTimeout (
        function() {
            var path = document.querySelector('.ct-series path');
            var length = path.getTotalLength();
        },
        3000);

    var $tooltip = $('<div class="tooltip tooltip-hidden"></div>').appendTo($('.ct-chart'));

    $(document).on('mouseenter', '.ct-bar', function() {
        var seriesName = $(this).closest('.ct-series').attr('ct:series-name'),
            value = $(this).attr('ct:value');

        $tooltip.text('Сумма: ' + value);
        $tooltip.removeClass('tooltip-hidden');
    });

    $(document).on('mouseleave', '.ct-bar', function() {
        $tooltip.addClass('tooltip-hidden');
    });

    $(document).on('mousemove', '.ct-bar', function(event) {
        console.log(event);
        $tooltip.css({
            left: (event.offsetX || event.originalEvent.layerX) - $tooltip.width() / 2,
            top: (event.offsetY || event.originalEvent.layerY) - $tooltip.height() - 20
        });
    });
}

function drawChart1(series, labels) {
    new Chartist.Bar('.ct-chart', {
        labels: [labels],
        series: [0]
    }, {
        plugins: [
            Chartist.plugins.ctPointLabels({
                textAnchor: 'middle'
            })
        ],
        distributeSeries: true,
        axisY: {
            type : Chartist.FixedScaleAxis,
            labelInterpolationFnc: function(value) {
                value = accounting.formatNumber(value, 0, " ");
                return value + ' Br'
            }
        }
    });
}