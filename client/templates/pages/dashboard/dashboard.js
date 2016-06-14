Template.dashboard.helpers({
	sum: function () {
		var sumComingSale = Session.get('sum');
		if(sumComingSale > 0) {
			return 'Прибыль за выбранный период = ' + accounting.formatNumber(sumComingSale, 0, ' ') + ' Br'
		} else if(sumComingSale < 0) {
			return 'Убыток за выбранный период = ' + accounting.formatNumber(sumComingSale*[-1], 0, ' ') + ' Br'
		} else {
			return ''
		}
	}
});

Template.dashboard.rendered = function() {

	toDate = new Date();
	year = toDate.getUTCFullYear();
	month = toDate.getUTCMonth();
	day = toDate.getUTCDate();
	dateMin = new Date(year, month - month, day - day + 1);

	Deps.autorun(function () {

/// Start При загрузке страницы

		fromDate = new Date(year, month - month, day - day + 1);
		fromDateMonth = fromDate;

		var data = Accounting.find({type: 'Приход', created: {$lt: toDate, $gte: fromDateMonth}}, {
			sort: [
				["created", "asc"]
			]
		}).fetch();

		var summComing = 0;
		var resultComingSale = [];

		data.forEach(function(item, i) {
			summComing += item.price.total_amount
		});
		resultComingSale.push(summComing);

		var results = [];
		var summ = 0;
		var monthes = [];
		var monthe = [];

		data.reduce(function (previousMonth, currentItem, index) {
			var currentMonth = new Date(currentItem.created).getMonth();

			if (previousMonth == currentMonth-1) {
				results.push(summ);
				monthes.push(previousMonth);
				summ = 0;
				console.log('2', monthes);
			}
			summ += currentItem.price.total_amount;

			if (data.length - 1 == index) {
				if (results.length == 0) {
					results.push(0);
					monthes.push(currentMonth);
				}
				results.push(summ);
				monthes.push(currentMonth);
			}

			return currentMonth;
		}, null);

		var monthName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
		for (var i = 0; i < monthes.length; i++) {
			var a = monthName[monthes[i]];
			monthe.push(a);
		}
	
		var data2 = Accounting.find({type: 'Продажа', created: {$lt: toDate, $gte: fromDateMonth}}, {
			sort: [
				["created", "asc"]
			]
		}).fetch();

		var summSale = 0;
		data2.forEach(function(item, i) {
			summSale += item.price.total_amount
		});
		resultComingSale.push(summSale);

		var sumComingSale = resultComingSale[1] - resultComingSale[0];
		Session.set('sum', sumComingSale);

		var results2 = [];
		var summ2 = 0;
		var monthes2 = [];

		data2.reduce(function (previousMonth, currentItem, index) {
			var currentMonth = new Date(currentItem.created).getMonth();

			if (previousMonth == currentMonth-1) {
				results2.push(summ2);
				monthes2.push(previousMonth);
				summ2 = 0;
			}
			summ2 += currentItem.price.total_amount;
			if (data2.length - 1 == index) {
				if (results2.length == 0) {
					results2.push(0);
					monthes2.push(currentMonth);
				}
				results2.push(summ2);
				monthes2.push(currentMonth);
			}

			return currentMonth;
		}, null);

		drawChart(results, results2, monthe);



		// По магазинам

		// $("#allTime").click(function () {

			$(function () {

			var allStores = Stores.find({deleted: false}, {
				sort: [
					["name", "asc"]
				]
			}).fetch();

			var stores = [];

			allStores.forEach(function (item, i) {
				stores.push(item.name)
			});

			var date = new Date();

			var year = date.getUTCFullYear();
			var month = date.getUTCMonth();
			var day = date.getUTCDate();

			var fromDateMonth = new Date(year, month, day, 0, 0, 0);
			var toDate = new Date(year, month, day, 23, 59, 59);

			var resultsComing = [];
			var resultSumComing = 0;
			var resultsSale = [];
			var resultSumSale = 0;

			allStores.forEach(function (item, i) {
				var dataComing = Accounting.find({
					type: 'Приход',
					sid: item._id,
					created: {$lt: toDate, $gte: fromDateMonth}
				}).fetch();

				dataComing.forEach(function (item, i) {
					resultSumComing += item.price.total_amount
				});

				resultsComing.push(resultSumComing);
				resultSumComing = 0;


				var dataSale = Accounting.find({
					type: 'Продажа',
					sid: item._id,
					created: {$lt: toDate, $gte: fromDateMonth}
				}).fetch();

				dataSale.forEach(function (item, i) {
					resultSumSale += item.price.total_amount
				});

				resultsSale.push(resultSumSale);
				resultSumSale = 0;

			});

			drawChartBar(resultsComing, resultsSale, stores);

		});


/// End При загрузке страницы

/// Start Диаграмма при изменении даты начала отсчёта

		$(function () {
			$('#datetimepicker1').datetimepicker({
				locale: 'ru',
				format: 'DD MMMM YYYY',
				showTodayButton: true,
				//showClear: true,
				// defaultDate: new Date(),
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

				data.reduce(function (previousMonth, currentItem, index) {
					var currentMonth = new Date(currentItem.created).getMonth();
					if (currentMonth > fromDateMonth.getMonth() && index == 0 && data.length - 1 !== index) {
						for (var i = 0; i < currentMonth - fromDateMonth.getMonth(); i++) {
							results.push(0);
							monthes.push(fromDateMonth.getMonth() + i);
						}
					}
					if (previousMonth && previousMonth !== currentMonth) {
						results.push(summ);
						monthes.push(previousMonth);
						summ = 0;
					}
					summ += currentItem.price.total_amount;
					if (data.length - 1 == index) {
						if (results.length == 0) {
							results.push(0);
							monthes.push(currentMonth);
						}
						results.push(summ);
						monthes.push(currentMonth);
					}

					return currentMonth;
				}, null);
				var monthName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
				for (var i = 0; i < monthes.length; i++) {
					var a = monthName[monthes[i]];
					monthe.push(a);
				}

				if (data.length == 0) {
					results.push(0);
					results.push(0);
					results.push(summ);
					monthe.push('', 'Учётных операций не было', '');
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

				data2.reduce(function (previousMonth, currentItem, index) {
					var currentMonth = new Date(currentItem.created).getMonth();
					if (currentMonth > fromDateMonth.getMonth() && index == 0 && data2.length - 1 !== index) {
						for (var i = 0; i < currentMonth - fromDateMonth.getMonth(); i++) {
							results2.push(0);
							monthes2.push(fromDateMonth.getMonth() + i);
						}
					}
					if (previousMonth && previousMonth !== currentMonth) {
						results2.push(summ2);
						monthes2.push(previousMonth);
						summ2 = 0;
					}
					summ2 += currentItem.price.total_amount;
					if (data2.length - 1 == index) {
						if (results2.length == 0) {
							results2.push(0);
							monthes2.push(currentMonth);
						}
						results2.push(summ2);
						monthes2.push(currentMonth);
					}

					return currentMonth;
				}, null);

				var summComing = 0;
				var resultComingSale = [];

				data.forEach(function(item, i) {
					summComing += item.price.total_amount
				});
				resultComingSale.push(summComing);
				var summSale = 0;
				data2.forEach(function(item, i) {
					summSale += item.price.total_amount
				});
				resultComingSale.push(summSale);

				var sumComingSale = resultComingSale[1] - resultComingSale[0];
				Session.set('sum', sumComingSale);

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
				// defaultDate: new Date(),
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
				data.reduce(function (previousMonth, currentItem, index) {
					var currentMonth = new Date(currentItem.created).getMonth();
					if (currentMonth > fromDateMonth.getMonth() && index == 0 && data.length - 1 !== index) {
						for (var i = 0; i < currentMonth - fromDateMonth.getMonth(); i++) {
							results.push(0);
							monthes.push(fromDateMonth.getMonth() + i);
						}
					}
					if (previousMonth && previousMonth !== currentMonth) {
						results.push(summ);
						monthes.push(previousMonth);
						summ = 0;
					}
					summ += currentItem.price.total_amount;
					if (data.length - 1 == index) {
						if (results.length == 0) {
							results.push(0);
							monthes.push(currentMonth);
						}
						results.push(summ);
						monthes.push(currentMonth);
					}

					return currentMonth;
				}, null);
				var monthName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
				for (var i = 0; i < monthes.length; i++) {
					var a = monthName[monthes[i]];
					monthe.push(a);
				}

				if (data.length == 0) {
					results.push(0);
					results.push(0);
					results.push(summ);
					monthe.push('', 'Учётных операций не было', '');
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

				data2.reduce(function (previousMonth, currentItem, index) {
					var currentMonth = new Date(currentItem.created).getMonth();
					if (currentMonth > fromDateMonth.getMonth() && index == 0 && data2.length - 1 !== index) {
						for (var i = 0; i < currentMonth - fromDateMonth.getMonth(); i++) {
							results2.push(0);
							monthes2.push(fromDateMonth.getMonth() + i);
						}
					}
					if (previousMonth && previousMonth !== currentMonth) {
						results2.push(summ2);
						monthes2.push(previousMonth);
						summ2 = 0;
					}
					summ2 += currentItem.price.total_amount;
					if (data2.length - 1 == index) {
						if (results2.length == 0) {
							results2.push(0);
							monthes2.push(currentMonth);
						}
						results2.push(summ2);
						monthes2.push(currentMonth);
					}

					return currentMonth;
				}, null);

				var summComing = 0;
				var resultComingSale = [];

				data.forEach(function(item, i) {
					summComing += item.price.total_amount
				});
				resultComingSale.push(summComing);
				var summSale = 0;
				data2.forEach(function(item, i) {
					summSale += item.price.total_amount
				});
				resultComingSale.push(summSale);

				var sumComingSale = resultComingSale[1] - resultComingSale[0];
				Session.set('sum', sumComingSale);

				drawChart(results, results2, monthe);
			});
		});

		/// End Диаграмма при изменении конечной даты

	});


	// $(function(){
	// 	console.log(fromDateMonth);
	// 	console.log(toDate);
    //
	// 	var data = Accounting.find({type: 'Приход', created: {$lt: toDate, $gte: fromDateMonth}}, {
	// 		sort: [
	// 			["created", "asc"]
	// 		]
	// 	}).fetch();
    //
	// 	var results = [];
	// 	var summ = 0;
    //
	// 	data.forEach(function(item, i) {
	// 		summ += item.price.total_amount
	// 	});
    //
	// 	results.push(summ);
	// 	summ = 0;
    //
	// 	console.log(results);
    //
	// 	var data2 = Accounting.find({type: 'Продажа', created: {$lt: toDate, $gte: fromDateMonth}}, {
	// 		sort: [
	// 			["created", "asc"]
	// 		]
	// 	}).fetch();
    //
	// 	var results2 = [];
	// 	var summ2 = 0;
    //
	// 	data2.forEach(function(item, i) {
	// 		summ2 += item.price.total_amount
	// 	});
    //
	// 	results2.push(summ2);
	// 	summ2 = 0;
    //
	// 	console.log(results2);
    //
	// 	var res = results2 - results;
    //
	// 	if(res > 0){
	// 		var restype = ['Прибыль'];
	// 	} else if(res < 0){
	// 		var restype = ['Убыток'];
	// 		res = 0 - res;
	// 	} else {
	// 		var restype = ['За выбранный период прибыли не было'];
	// 	}
    //
	// 	console.log(res);
	// 	console.log(restype);
	// 	//
	// 	//if(data.length == 0){
	// 	//	results.push(0);
	// 	//	results.push(summ);
	// 	//	monthe.push('В выбранный период прибыли не было','');
	// 	//}
	// 	//
	//
    //
	// })
	// })
};


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
							style: 'stroke-width: 30px'
						});
					}
				});
			}
		};
	};

}(window, document, Chartist));

function drawChartBar(series, series1, labels) {
	new Chartist.Bar('.ct-chart-bar', {
		labels: labels,
		series: [
			series,
			series1
		]
	}, {
		plugins: [
			Chartist.plugins.ctPointLabels({
				textAnchor: 'middle'
			})
		],
		seriesBarDistance: 40,
		chartPadding: {
			right: 30,
			top: 30,
			left: -80
		},
		axisY: {
			onlyInteger: true,
			offset: 190,
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
			// var length = path.getTotalLength();
		},
		3000);

	var $tooltip = $('<div class="tooltip tooltip-bar tooltip-hidden"></div>').appendTo($('.ct-chart-bar'));

	$(document).on('mouseenter', '.ct-bar', function() {
		var seriesName = $(this).closest('.ct-series').attr('ct:series-name'),
			value = $(this).attr('ct:value');

		$tooltip.text('Сумма: ' + accounting.format(value, 0, ' ') + ' Br');
		$tooltip.removeClass('tooltip-hidden');
	});

	$(document).on('mouseleave', '.ct-bar', function() {
		$tooltip.addClass('tooltip-hidden');
	});

	$(document).on('mousemove', '.ct-bar', function(event) {
		$tooltip.css({
			left: (event.offsetX || event.originalEvent.layerX) - $tooltip.width() / 2,
			top: (event.offsetY || event.originalEvent.layerY) - $tooltip.height() - 20
		});
	});
}

function drawChart(series, series2, labels){
	new Chartist.Line('.ct-chart', {
		labels: labels,
		series: [
			series,
			series2
		]
	}, {
		fullWidth: true,
		chartPadding: {
			right: 80,
			top: 30,
			left: -40
		},
		axisY: {
			onlyInteger: true,
			offset: 140,
			divisor: 1000000,
			labelInterpolationFnc: function (value) {
				value = accounting.formatNumber(value, 0, " ");
				return value + ' Br'
			}
		}
		//,
		//lineSmooth: Chartist.Interpolation.simple({
		//	divisor: 2
		//})
	});
	setTimeout(
		function () {
			var path = document.querySelector('.ct-series path');
			// var length = path.getTotalLength();
		},
		3000);


	var $tooltip = $('<div class="tooltip tooltip-hidden tooltip-line"></div>').appendTo($('.ct-chart-line'));
    
	$(document).on('mouseenter', '.ct-point', function() {
		var seriesName = $(this).closest('.ct-series').attr('ct:series-name'),
			value = $(this).attr('ct:value');

		$tooltip.text('Сумма: ' + accounting.format(value, 0, ' ') + ' Br');
		$tooltip.removeClass('tooltip-hidden');
	});
    
	$(document).on('mouseleave', '.ct-point', function() {
		$tooltip.addClass('tooltip-hidden');
	});
    
	$(document).on('mousemove', '.ct-point', function(event) {
		$tooltip.css({
			left: (event.offsetX || event.originalEvent.layerX) - $tooltip.width() / 2,
			top: (event.offsetY || event.originalEvent.layerY) - $tooltip.height() - 20
		});
	});

}