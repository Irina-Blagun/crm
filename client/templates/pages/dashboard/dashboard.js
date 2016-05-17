Template.dashboard.events({
	'click #exit': function () {
		Meteor.logout();
	}
});

Template.dashboard.helpers({
	acc: function(){
		var toDate = new Date();
		var mDate = new Date(new Date(toDate).setMonth(toDate.getMonth()-4));
		var fromDate = new Date(new Date(mDate).setDate(mDate.getDay()-mDate.getDay()+1));

		var data = Accounting.find({created: {$lt: toDate, $gte: fromDate}}, {
			sort: [
				["created", "asc"]
			]
		}).fetch();

		var results = [];
		var summ = 0;

		data.reduce(function(previousMonth, currentItem, index){

			var currentMonth = new Date(currentItem.created).getMonth();

			if(previousMonth && previousMonth !== currentMonth){
				results.push(summ);
				summ = 0;
			}

			summ += currentItem.price.total_amount;

			if(data.length-1 == index){
				results.push(summ);
			}

			return currentMonth;

		}, null);

		return data
	}
});

Template.dashboard.rendered = function(){

	toDate = new Date();
	year = moment(new Date()).year();
	day = new Date(year, 0, 1);

	Deps.autorun(function(){

/// Start Диаграмма прибыли предприятия по месяцам

		var tDate = new Date();
		var mDate = new Date(new Date(tDate).setMonth(tDate.getMonth()-tDate.getMonth()));
		var fromDate = new Date(new Date(mDate).setDate(mDate.getDay()-mDate.getDay()+1));
		fromDateMonth = fromDate;

		var data = Accounting.find({created: {$lt: toDate, $gte: fromDateMonth}}, {
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
		drawChart(results, monthe);

/// End Диаграмма прибыли предприятия

/// Start Диаграмма при изменении даты начала отсчёта

		$(function () {
			$('#datetimepicker1').datetimepicker({
				locale: 'ru',
				format: 'DD MMMM YYYY',
				showTodayButton: true,
				showClear: true,
				defaultDate: new Date(),
				maxDate: new Date(),
				minDate: day
			});
			$("#datetimepicker1").on("dp.change", function (e) {
				$('#datetimepicker2').data("DateTimePicker").minDate(e.date);
				var formatDate = moment(e.date).format();
				fromDateMonth = moment(formatDate).toDate();
				var data = Accounting.find({created: {$lt: toDate, $gte: fromDateMonth}}, {
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
				drawChart(results, monthe);
			});
		});

/// End Диаграмма при изменении даты начала отсчёта

/// Start Диаграмма при изменении конечной даты

		$(function () {
			$('#datetimepicker2').datetimepicker({
				locale: 'ru',
				format: 'DD MMMM YYYY',
				showTodayButton: true,
				showClear: true,
				defaultDate: new Date(),
				maxDate: new Date()
			});
			$("#datetimepicker2").on("dp.change", function (e) {
				$('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
				var formatToDate = moment(e.date).format();
				toDate = moment(formatToDate).toDate();
				toDate.setHours(23, 59, 59, 999);
				var data = Accounting.find({created: {$lt: toDate, $gte: fromDateMonth}}, {
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
				drawChart(results, monthe);
			});
		});

		/// End Диаграмма при изменении конечной даты

	})
};

function drawChart(series, labels){
	new Chartist.Line('.ct-chart', {
		labels: labels,
		series: [series]
	}, {
		fullWidth: true,
		chartPadding: {
			right: 40
		},
		axisY: {
			onlyInteger: true,
			offset: 100
		}
		//,
		//lineSmooth: Chartist.Interpolation.simple({
		//	divisor: 2
		//})
	});
	setTimeout (
		function() {
			var path = document.querySelector('.ct-series-a path');
			var length = path.getTotalLength();
		},
		3000);
}
