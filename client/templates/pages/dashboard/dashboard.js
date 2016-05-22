Template.dashboard.events({
	'click #exit': function () {
		Meteor.logout();
	}
});

Template.dashboard.rendered = function(){

	toDate = new Date();
	year = toDate.getUTCFullYear();
	month = toDate.getUTCMonth();
	day = toDate.getUTCDate();
	dateMin = new Date(year, month-month, day-day+1);

	Deps.autorun(function(){

/// Start При загрузке страницы

		fromDate = new Date(year, month-month, day-day+1);
		fromDateMonth = fromDate;

		var data = Accounting.find({type: 'Приход', created: {$lt: toDate, $gte: fromDateMonth}}, {
			sort: [
				["created", "asc"]
			]
		}).fetch();

		var results = [];
		var summ = 0;
		var monthes = [];
		var monthe = [];

		data.reduce(function(previousMonth, currentItem, index){
			var currentMonth = new Date(currentItem.created).getMonth();
			if(currentMonth > fromDateMonth.getMonth() && index == 0 && data.length-1 !== index){
				for(var i=0; i < currentMonth-fromDateMonth.getMonth(); i++){
					results.push(0);
					monthes.push(fromDateMonth.getMonth()+i);
				}
			}
			if(previousMonth && previousMonth !== currentMonth){
				results.push(summ);
				monthes.push(previousMonth);
				summ = 0;
			}
			summ += currentItem.price.total_amount;
			if(data.length-1 == index){
				if(results.length == 0){
					results.push(0);
					monthes.push(currentMonth);
				}
				results.push(summ);
				monthes.push(currentMonth);
			}

			return currentMonth;
		}, null);
		var monthName = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
		for(var i=0; i < monthes.length; i++){
			var a = monthName[monthes[i]];
			monthe.push(a);
		}

		var data2 = Accounting.find({type: 'Продажа', created: {$lt: toDate, $gte: fromDateMonth}}, {
			sort: [
				["created", "asc"]
			]
		}).fetch();

		var results2 = [];
		var summ2 = 0;
		var monthes2 = [];

		data2.reduce(function(previousMonth, currentItem, index){
			var currentMonth = new Date(currentItem.created).getMonth();
			if(currentMonth > fromDateMonth.getMonth() && index == 0 && data2.length-1 !== index){
				for(var i=0; i < currentMonth-fromDateMonth.getMonth(); i++){
					results2.push(0);
					monthes2.push(fromDateMonth.getMonth()+i);
				}
			}
			if(previousMonth && previousMonth !== currentMonth){
				results2.push(summ2);
				monthes2.push(previousMonth);
				summ2 = 0;
			}
			summ2 += currentItem.price.total_amount;
			if(data2.length-1 == index){
				if(results2.length == 0){
					results2.push(0);
					monthes2.push(currentMonth);
				}
				results2.push(summ2);
				monthes2.push(currentMonth);
			}

			return currentMonth;
		}, null);

		drawChart(results, results2, monthe);

/// End При загрузке страницы

/// Start Диаграмма при изменении даты начала отсчёта

		$(function () {
			$('#datetimepicker1').datetimepicker({
				locale: 'ru',
				format: 'DD MMMM YYYY',
				showTodayButton: true,
				//showClear: true,
				defaultDate: new Date(),
				maxDate: new Date(),
				minDate: dateMin
			});
			$("#datetimepicker1").on("dp.change", function (e) {
				$('#datetimepicker2').data("DateTimePicker").minDate(e.date);
				var formatDate = moment(e.date).format();
				fromDateMonth = moment(formatDate).toDate();
				var data = Accounting.find({type: 'Приход', created: {$lt: toDate, $gte: fromDateMonth}}, {
					sort: [
						["created", "asc"]
					]
				}).fetch();

				var results = [];
				var summ = 0;
				var monthes = [];
				var monthe = [];

				data.reduce(function(previousMonth, currentItem, index){
					var currentMonth = new Date(currentItem.created).getMonth();
					if(currentMonth > fromDateMonth.getMonth() && index == 0 && data.length-1 !== index){
						for(var i=0; i < currentMonth-fromDateMonth.getMonth(); i++){
							results.push(0);
							monthes.push(fromDateMonth.getMonth()+i);
						}
					}
					if(previousMonth && previousMonth !== currentMonth){
						results.push(summ);
						monthes.push(previousMonth);
						summ = 0;
					}
					summ += currentItem.price.total_amount;
					if(data.length-1 == index){
						if(results.length == 0){
							results.push(0);
							monthes.push(currentMonth);
						}
						results.push(summ);
						monthes.push(currentMonth);
					}

					return currentMonth;
				}, null);
				var monthName = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
				for(var i=0; i < monthes.length; i++){
					var a = monthName[monthes[i]];
					monthe.push(a);
				}

				if(data.length == 0){
					results.push(0);
					results.push(summ);
					monthe.push('В выбранный период прибыли не было','');
				}

				var data2 = Accounting.find({type: 'Продажа', created: {$lt: toDate, $gte: fromDateMonth}}, {
					sort: [
						["created", "asc"]
					]
				}).fetch();

				var results2 = [];
				var summ2 = 0;
				var monthes2 = [];
				var monthe2 = [];

				data2.reduce(function(previousMonth, currentItem, index){
					var currentMonth = new Date(currentItem.created).getMonth();
					if(currentMonth > fromDateMonth.getMonth() && index == 0 && data2.length-1 !== index){
						for(var i=0; i < currentMonth-fromDateMonth.getMonth(); i++){
							results2.push(0);
							monthes2.push(fromDateMonth.getMonth()+i);
						}
					}
					if(previousMonth && previousMonth !== currentMonth){
						results2.push(summ2);
						monthes2.push(previousMonth);
						summ2 = 0;
					}
					summ2 += currentItem.price.total_amount;
					if(data2.length-1 == index){
						if(results2.length == 0){
							results2.push(0);
							monthes2.push(currentMonth);
						}
						results2.push(summ2);
						monthes2.push(currentMonth);
					}

					return currentMonth;
				}, null);

				drawChart(results, results2, monthe);
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
				defaultDate: new Date(),
				maxDate: new Date()
			});
			$("#datetimepicker2").on("dp.change", function (e) {
				$('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
				var formatToDate = moment(e.date).format();
				toDate = moment(formatToDate).toDate();
				toDate.setHours(23, 59, 59, 999);
				var data = Accounting.find({type: 'Приход', created: {$lt: toDate, $gte: fromDateMonth}}, {
					sort: [
						["created", "asc"]
					]
				}).fetch();
				var results = [];
				var summ = 0;
				var monthes = [];
				var monthe = [];
				data.reduce(function(previousMonth, currentItem, index){
					var currentMonth = new Date(currentItem.created).getMonth();
					if(currentMonth > fromDateMonth.getMonth() && index == 0 && data.length-1 !== index){
						for(var i=0; i < currentMonth-fromDateMonth.getMonth(); i++){
							results.push(0);
							monthes.push(fromDateMonth.getMonth()+i);
						}
					}
					if(previousMonth && previousMonth !== currentMonth){
						results.push(summ);
						monthes.push(previousMonth);
						summ = 0;
					}
					summ += currentItem.price.total_amount;
					if(data.length-1 == index){
						if(results.length == 0){
							results.push(0);
							monthes.push(currentMonth);
						}
						results.push(summ);
						monthes.push(currentMonth);
					}

					return currentMonth;
				}, null);
				var monthName = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
				for(var i=0; i < monthes.length; i++){
					var a = monthName[monthes[i]];
					monthe.push(a);
				}

				if(data.length == 0){
					results.push(0);
					results.push(summ);
					monthe.push('В выбранный период прибыли не было','');
				}

				var data2 = Accounting.find({type: 'Продажа', created: {$lt: toDate, $gte: fromDateMonth}}, {
					sort: [
						["created", "asc"]
					]
				}).fetch();

				var results2 = [];
				var summ2 = 0;
				var monthes2 = [];
				var monthe2 = [];

				data2.reduce(function(previousMonth, currentItem, index){
					var currentMonth = new Date(currentItem.created).getMonth();
					if(currentMonth > fromDateMonth.getMonth() && index == 0 && data2.length-1 !== index){
						for(var i=0; i < currentMonth-fromDateMonth.getMonth(); i++){
							results2.push(0);
							monthes2.push(fromDateMonth.getMonth()+i);
						}
					}
					if(previousMonth && previousMonth !== currentMonth){
						results2.push(summ2);
						monthes2.push(previousMonth);
						summ2 = 0;
					}
					summ2 += currentItem.price.total_amount;
					if(data2.length-1 == index){
						if(results2.length == 0){
							results2.push(0);
							monthes2.push(currentMonth);
						}
						results2.push(summ2);
						monthes2.push(currentMonth);
					}

					return currentMonth;
				}, null);

				drawChart(results, results2, monthe);
			});
		});

		/// End Диаграмма при изменении конечной даты

	});



















	$("#monthes").click(function(){
		console.log(fromDateMonth);
		console.log(toDate);

		var data = Accounting.find({type: 'Приход', created: {$lt: toDate, $gte: fromDateMonth}}, {
			sort: [
				["created", "asc"]
			]
		}).fetch();

		var results = [];
		var summ = 0;
		var monthes = [];
		var monthe = [];

		data.reduce(function(previousMonth, currentItem, index){
			var currentMonth = new Date(currentItem.created).getMonth();
			if(currentMonth > fromDateMonth.getMonth() && index == 0 && data.length-1 !== index){
				for(var i=0; i < currentMonth-fromDateMonth.getMonth(); i++){
					results.push(0);
					monthes.push(fromDateMonth.getMonth()+i);
				}
			}
			if(previousMonth && previousMonth !== currentMonth){
				results.push(summ);
				monthes.push(previousMonth);
				summ = 0;
			}
			summ += currentItem.price.total_amount;
			if(data.length-1 == index){
				if(results.length == 0){
					results.push(0);
					monthes.push(currentMonth);
				}
				results.push(summ);
				monthes.push(currentMonth);
			}

			return currentMonth;
		}, null);
		var monthName = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
		for(var i=0; i < monthes.length; i++){
			var a = monthName[monthes[i]];
			monthe.push(a);
		}

		var data2 = Accounting.find({type: 'Продажа', created: {$lt: toDate, $gte: fromDateMonth}}, {
			sort: [
				["created", "asc"]
			]
		}).fetch();

		var results2 = [];
		var summ2 = 0;
		var monthes2 = [];

		data2.reduce(function(previousMonth, currentItem, index){
			var currentMonth = new Date(currentItem.created).getMonth();
			if(currentMonth > fromDateMonth.getMonth() && index == 0 && data2.length-1 !== index){
				for(var i=0; i < currentMonth-fromDateMonth.getMonth(); i++){
					results2.push(0);
					monthes2.push(fromDateMonth.getMonth()+i);
				}
			}
			if(previousMonth && previousMonth !== currentMonth){
				results2.push(summ2);
				monthes2.push(previousMonth);
				summ2 = 0;
			}
			summ2 += currentItem.price.total_amount;
			if(data2.length-1 == index){
				if(results2.length == 0){
					results2.push(0);
					monthes2.push(currentMonth);
				}
				results2.push(summ2);
				monthes2.push(currentMonth);
			}

			return currentMonth;
		}, null);

		if(data.length == 0){
			results.push(0);
			results.push(summ);
			monthe.push('В выбранный период прибыли не было','');
		}

		drawChart(results, results2, monthe);
	});

	$("#allTime").click(function(){$("#allTime").click(function(){
			console.log(fromDateMonth);
			console.log(toDate);

			var data = Accounting.find({type: 'Приход', created: {$lt: toDate, $gte: fromDateMonth}}, {
				sort: [
					["created", "asc"]
				]
			}).fetch();

			var results = [];
			var summ = 0;

			data.forEach(function(item, i) {
				summ += item.price.total_amount
			});

			results.push(summ);
			summ = 0;

			console.log(results);

			var data2 = Accounting.find({type: 'Продажа', created: {$lt: toDate, $gte: fromDateMonth}}, {
				sort: [
					["created", "asc"]
				]
			}).fetch();

			var results2 = [];
			var summ2 = 0;

			data2.forEach(function(item, i) {
				summ2 += item.price.total_amount
			});

			results2.push(summ2);
			summ2 = 0;

			console.log(results2);

			var res = results2 - results;

			if(res > 0){
				var restype = ['Прибыль'];
			} else if(res < 0){
				var restype = ['Убыток'];
				res = 0 - res;
			} else {
				var restype = ['За выбранный период прибыли не было'];
			}

			console.log(res);
			console.log(restype);
            //
			//if(data.length == 0){
			//	results.push(0);
			//	results.push(summ);
			//	monthe.push('В выбранный период прибыли не было','');
			//}
            //
			drawChartBar(res, restype);

		})
	})
};


function drawChartBar(series, labels) {
	new Chartist.Bar('.ct-chart', {
		labels: labels,
		series: [series]
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



















function drawChart(series, series2, labels){
	console.log(series, series2, labels);
	new Chartist.Line('.ct-chart', {
			labels: labels,
			series: [
				series,
				series2
			]
		}, {
		fullWidth: true,
		chartPadding: {
			right: 80
		},
		axisY: {
			onlyInteger: true,
			offset: 200,
			divisor: 1000000,
			labelInterpolationFnc: function(value) {
				value = accounting.formatNumber(value, 0, " ");
				return value + ' Br'
		}
	}
		//,
		//lineSmooth: Chartist.Interpolation.simple({
		//	divisor: 2
		//})
	});
	setTimeout (
		function() {
			var path = document.querySelector('.ct-series path');
			var length = path.getTotalLength();
		},
		3000);


	var $tooltip = $('<div class="tooltip tooltip-hidden"></div>').appendTo($('.ct-chart'));

	$(document).on('mouseenter', '.ct-point', function() {
		var seriesName = $(this).closest('.ct-series').attr('ct:series-name'),
			value = $(this).attr('ct:value');

		$tooltip.text(seriesName + ': ' + value);
		$tooltip.removeClass('tooltip-hidden');
	});

	$(document).on('mouseleave', '.ct-point', function() {
		$tooltip.addClass('tooltip-hidden');
	});

	$(document).on('mousemove', '.ct-point', function(event) {
		console.log(event);
		$tooltip.css({
			left: (event.offsetX || event.originalEvent.layerX) - $tooltip.width() / 2,
			top: (event.offsetY || event.originalEvent.layerY) - $tooltip.height() - 20
		});
	});
}