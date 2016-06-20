Template.movement.rendered = function(){

    toDate = new Date();
    year = toDate.getUTCFullYear();
    month = toDate.getUTCMonth();
    day = toDate.getUTCDate();
    dateMin = new Date(year, month - month, day - day + 1);

    Deps.autorun(function(){

/// Start При загрузке страницы

        fromDate = new Date(year, month - 5, day - day + 1);
        fromDateMonth = fromDate;

        var dataComing = Accounting.find({
            product_id: localStorage.getItem('product'),
            type: 'Приход',
            created: {$lt: toDate, $gte: fromDateMonth}
        }).fetch();

        var dataSale = Accounting.find({
            product_id: localStorage.getItem('product'),
            type: 'Продажа',
            created: {$lt: toDate, $gte: fromDateMonth}
        }).fetch();

        var resultComing = 0;
        var resultSale = 0;
        var results = [];

        dataComing.forEach(function(item, i){
            resultComing += item.price.total_amount;
        });

        results.push(resultComing);
        resultComing = 0;

        dataSale.forEach(function(item, i){
            resultSale += item.price.total_amount;
        });

        results.push(resultSale);
        resultSale = 0;

        if(results[0] !== 0 || results[1] !== 0) {
            drawChartPie(results);
        } else {
            drawChartPie1();
        }


/// End при загрузке страницы


/// Start Диаграмма при изменении даты начала отсчёта

        $(function () {
            $('#datetimepicker1').datetimepicker({
                locale: 'ru',
                format: 'DD MMMM YYYY',
                showTodayButton: true,
                maxDate: new Date(),
                minDate: dateMin
            });
            $("#datetimepicker1").on("dp.change", function(e){
                $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
                var formatDate = moment(e.date).format();
                fromDateMonth = moment(formatDate).toDate();

                var dataComing = Accounting.find({
                    product_id: localStorage.getItem('product'),
                    type: 'Приход',
                    created: {$lt: toDate, $gte: fromDateMonth}
                }).fetch();

                var dataSale = Accounting.find({
                    product_id: localStorage.getItem('product'),
                    type: 'Продажа',
                    created: {$lt: toDate, $gte: fromDateMonth}
                }).fetch();

                var resultComing = 0;
                var resultSale = 0;
                var results = [];

                dataComing.forEach(function(item, i){
                    resultComing += item.price.total_amount;
                });

                results.push(resultComing);
                resultComing = 0;

                dataSale.forEach(function(item, i){
                    resultSale += item.price.total_amount;
                });

                results.push(resultSale);
                resultSale = 0;

                if(results[0] !== 0 || results[1] !== 0){
                    drawChartPie(results);
                } else {
                    drawChartPie1();
                }

            });
        });

/// End Диаграмма при изменении даты начала отсчёта

/// Start Диаграмма при изменении конечной даты

        $(function () {
            $('#datetimepicker2').datetimepicker({
                locale: 'ru',
                format: 'DD MMMM YYYY',
                showTodayButton: true,
                //showClear: true,
                // defaultDate: new Date(),
                maxDate: new Date()
            });
            $("#datetimepicker2").on("dp.change", function(e){
                $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
                var formatToDate = moment(e.date).format();
                toDate = moment(formatToDate).toDate();
                toDate.setHours(23, 59, 59, 999);

                var dataComing = Accounting.find({
                    product_id: localStorage.getItem('product'),
                    type: 'Приход',
                    created: {$lt: toDate, $gte: fromDateMonth}
                }).fetch();

                var dataSale = Accounting.find({
                    product_id: localStorage.getItem('product'),
                    type: 'Продажа',
                    created: {$lt: toDate, $gte: fromDateMonth}
                }).fetch();

                var resultComing = 0;
                var resultSale = 0;
                var results = [];

                dataComing.forEach(function(item, i){
                    resultComing += item.price.total_amount;
                });

                results.push(resultComing);
                resultComing = 0;

                dataSale.forEach(function(item, i){
                    resultSale += item.price.total_amount;
                });

                results.push(resultSale);
                resultSale = 0;

                if(results[0] !== 0 || results[1] !== 0){
                    drawChartPie(results);
                } else {
                    drawChartPie1();
                }

            });
        });
        /// End Диаграмма при изменении конечной даты
    })
};

function drawChartPie(series){
    var data = {
        series: series
    };

    var sum = function(a, b) { return a + b };

    new Chartist.Pie('.ct-chart', data, {
        labelInterpolationFnc: function(value){
            if(value !== 0){
                return accounting.formatNumber(value, 0, ' ') + ' Br ' + '(' + Math.round(value / data.series.reduce(sum) * 100) + '%)';
            } else {
                return ''
            }
        }
    });
}

function drawChartPie1(){
    var data = {
        series: [1,1]
    };

    new Chartist.Pie('.ct-chart', data, {
        labelInterpolationFnc: function(value){
            return 'Учётных операций не было'
        }
    });
}