$(document).ready(function() {

	// # AJAX / JSON NEW MEMBER & RECENT ACTIVITY REQUEST & RESPONSE

	var HTML;

	var usersURL = 'js/users.json';
	var activityURL = 'js/activity.json';

	var usersCallback = function (data) {

		$.each(data, function(arrayID, key) {

			$.each(key, function(userID, userData){

				HTML = '<div class="new-member-container clearfix">';
				HTML += '<img src="' + userData.userImgURL + '" alt="profile picture" class="new-member-profile-image">';
				HTML += '<div class="new-user-name-date-container">';
				HTML += '<div class="new-user-name dark-gray-font">' + userData.userName + '</div>';
				HTML += '<div class="new-user-email purple-font"><a href="mailto:' + userData.userEmail + '">' + userData.userEmail + '</a></div>';
				HTML += '</div> <!-- closing new-user-name-date-container -->';
 				HTML += '<div class="new-user-date gray-font">10/15/15</div>';
 				HTML += '</div> <!-- closing new-member-container -->';
        
 				$('.new-members').append(HTML);
			});
		});
    }

	var activityCallback = function (data) {

		$.each(data, function(arrayID, key) {

			$.each(key, function(activityID, activityData){

				HTML = '<div class="new-member-container clearfix">';
				HTML += '<img src="' + activityData.userImgURL + '" alt="profile picture" class="new-member-profile-image">';
				HTML += '<div class="new-user-name-date-container">';
				HTML += '<div class="new-user-name dark-gray-font">' + activityData.userName + ' ' + activityData.userAction + '<span class="dark-gray-font">' + ' ' + activityData.groupName + '</span></div>';
				HTML += '<div class="new-user-email dark-gray-font">' + activityData.activityTime + '</div>';
				HTML += '</div> <!-- closing new-user-name-date-container -->';
 				HTML += '<div class="new-user-date"><i class="fa fa-angle-right fa-2x purple-font"></i></div>';
 				HTML += '</div> <!-- closing new-member-container -->';
        
 				$('.recent-activity').append(HTML);
			});
		});
    }

	$.getJSON(usersURL, usersCallback);
	$.getJSON(activityURL, activityCallback);


	// # SWITCH DASHBOARD

	var $navDashboard = $('.main-container nav ul li');

	$navDashboard.on('click', function(e) {

		e.preventDefault();

		$(this).siblings().removeClass('selected');
		$(this).addClass('selected');

	});

	// # NOTIFICATIONS

	var $bell = $('.header-icon');
	var $closeNotification = $('.close-notification');
	var $notification = $('.notification');

	$bell.on('click', function() {

		$notification.removeClass('inactive');
		$closeNotification.removeClass('inactive');
		$('.green-dot').hide();

	});

	$closeNotification.on('click', function() {
		$notification.addClass('inactive');
		$closeNotification.addClass('inactive');
		$('.recent-activity').hide();
	})

	// # TOGGLE ON/OFF

	var $notificationsToggle = $('.settings-toggle-button');

	$notificationsToggle.on('click', function() {

		var $on = $(this).find(".fa-toggle-on");
		var $off = $(this).find(".fa-toggle-off");

		if($off.css('display') == 'none') {
			$on.css('display','none');
			$off.css('display','inline');
		} else {
			$on.css('display','inline');
			$off.css('display','none');
		}
	});

	// # SUBMISSION VALIDATION FORM

	var $sendButton = $('#send-button');
	var $submittedMessage = $('.submitted-message');

	$sendButton.on('click', function() {

		if (!$('#user-search').val() || !$('#user-message').val()) {
			$submittedMessage.text("Please Enter Missing Info");
			$submittedMessage.removeClass("purple-font");
			$submittedMessage.addClass("red-font");
		} else {
			$submittedMessage.text("Submission Successful!");
			$submittedMessage.removeClass("red-font");
			$submittedMessage.addClass("purple-font");
		}

	});

	// # TRAFFIC CHART TYPES

	$('.line-graph-types li').on('click', function() {

		$(this).removeClass('line-graph-shown');
		$(this).siblings().removeClass('line-graph-shown');
		$(this).addClass('line-graph-shown');

		var $data =  $(this).data('content');
		console.log($data);
        var $contentDiv = '#' + $data;
        console.log($contentDiv);
        $($contentDiv).siblings().css('display','none');
        $($contentDiv).css('display','block');

	});

	// # HIDE ALERT

	var $alert = $('.alert');

	$alert.on('click', function() {

		$(this).css('display','none');

	});


	$('.wrapper-dropdown-3').on('click', function() {
		$('#dropdown').toggleClass('inactive');
	});

	$('#dropdown li').on('click', function(e) {

		e.preventDefault();
		var text = $(this).text();
		$('.current-selection').text(text);

	});

	var donutChart = $('#donut-chart').get(0).getContext("2d");
	var barChart = $('#bar-chart').get(0).getContext("2d");
	var lineChartWeekly = $('#line-chart-weekly').get(0).getContext("2d");
	var lineChartHourly = $('#line-chart-hourly').get(0).getContext("2d");
	var lineChartDaily = $('#line-chart-daily').get(0).getContext("2d");
	var lineChartMonthly = $('#line-chart-monthly').get(0).getContext("2d");

	var barChartData = {
    	labels: ["S", "M", "T", "W", "T", "F", "S"],
	    datasets: [
	        {
	            label: "Daily Traffic",
	            fillColor: "#7A67EE",
	            strokeColor: "#7A67EE",
	            highlightFill: "#7A67EE",
	            highlightStroke: "#7A67EE",
	            data: [75, 100, 175, 125, 225, 200, 100]
	        }
	    ]
	};

	var barChartOptions = {
	    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	    scaleBeginAtZero : false,

	    //Boolean - Whether grid lines are shown across the chart
	    scaleShowGridLines : true,

	    //String - Colour of the grid lines
	    scaleGridLineColor : "rgba(0,0,0,.05)",

	    //Number - Width of the grid lines
	    scaleGridLineWidth : 1,

	    //Boolean - Whether to show horizontal lines (except X axis)
	    scaleShowHorizontalLines: true,

	    //Boolean - Whether to show vertical lines (except Y axis)
	    scaleShowVerticalLines: true,

	    //Boolean - If there is a stroke on each bar
	    barShowStroke : true,

	    //Number - Pixel width of the bar stroke
	    barStrokeWidth : 1,

	    //Number - Spacing between each of the X value sets
	    barValueSpacing : 5,

	    //Number - Spacing between data sets within X values
	    barDatasetSpacing : 5,

	   	responsive: true,

	    // Boolean - Determines whether to draw tooltips on the canvas or not
    	showTooltips: false,

	   	animation: false

	}

	var mybarChart = new Chart(barChart).Bar(barChartData, barChartOptions);

	var lineChartDailyData = {
	    labels: ["S", "M", "T", "W", "T", "F", "S"],
	    datasets: [
	        {
	            label: "Daily",
	            fillColor: "rgba(0,0,205,0.1)",
	            strokeColor: "rgba(0,0,205,0.4)",
	            pointColor: "#fff",
	            pointStrokeColor: "rgba(0,0,205,1)",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: [	400, 125, 100, 150, 200, 250, 300]
	        }
	    ]
	};

	var lineChartHourlyData = {
	    labels: ["00:00-1:59", "2:00-3:59", "04:00-5:59", "06:00-7:59", "08:00-09:59", "10:00-11:59", "12:00-13:59", "14:00-15:59", "16:00-17:59", "18:00-19:59", "20:00-21:59", "22:00-23:59"],
	    datasets: [
	        {
	            label: "Hourly",
	            fillColor: "rgba(0,0,205,0.1)",
	            strokeColor: "rgba(0,0,205,0.4)",
	            pointColor: "#fff",
	            pointStrokeColor: "rgba(0,0,205,1)",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: [	25, 15, 15, 50, 30, 25, 20, 40, 30, 20, 15, 10]
	        }
	    ]
	};

	var lineChartWeeklyData = {
	    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
	    datasets: [
	        {
	            label: "Weekly",
	            fillColor: "rgba(0,0,205,0.1)",
	            strokeColor: "rgba(0,0,205,0.4)",
	            pointColor: "#fff",
	            pointStrokeColor: "rgba(0,0,205,1)",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: [	0, 750, 1250, 1000, 1500, 2000, 1500, 1750, 2250, 1750, 2250]
	        }
	    ]
	};

	var lineChartMonthlyData = {
	    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
	    datasets: [
	        {
	            label: "Monthly",
	            fillColor: "rgba(0,0,205,0.1)",
	            strokeColor: "rgba(0,0,205,0.4)",
	            pointColor: "#fff",
	            pointStrokeColor: "rgba(0,0,205,1)",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: [	2000, 2500, 3000, 3500, 3700, 3900, 3400, 2900, 2700, 2500, 3500, 4000]
	        }
	    ]
	};

	var lineChartOptions = {

	    ///Boolean - Whether grid lines are shown across the chart
	    scaleShowGridLines : true,

	    //String - Colour of the grid lines
	    scaleGridLineColor : "rgba(0,0,0,.05)",

	    //Number - Width of the grid lines
	    scaleGridLineWidth : 1,

	    //Boolean - Whether to show horizontal lines (except X axis)
	    scaleShowHorizontalLines: true,

	    //Boolean - Whether to show vertical lines (except Y axis)
	    scaleShowVerticalLines: true,

	    //Boolean - Whether the line is curved between points
	    bezierCurve : false,

	    //Number - Tension of the bezier curve between points
	    bezierCurveTension : 0.4,

	    //Boolean - Whether to show a dot for each point
	    pointDot : true,

	    //Number - Radius of each point dot in pixels
	    pointDotRadius : 6,

	    //Number - Pixel width of point dot stroke
	    pointDotStrokeWidth : 1,

	    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	    pointHitDetectionRadius : 20,

	    //Boolean - Whether to show a stroke for datasets
	    datasetStroke : true,

	    //Number - Pixel width of dataset stroke
	    datasetStrokeWidth : 2,

	    //Boolean - Whether to fill the dataset with a colour
	    datasetFill : true,

	   	responsive: true,

	   	animation: false,

	    //String - A legend template
	    // legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

	   	// Boolean - Determines whether to draw tooltips on the canvas or not
    	showTooltips: false

	};

	var myLineChartWeekly = new Chart(lineChartWeekly).Line(lineChartWeeklyData, lineChartOptions);
	var myLineChartHourly = new Chart(lineChartHourly).Line(lineChartHourlyData, lineChartOptions);
	var myLineChartDaily = new Chart(lineChartDaily).Line(lineChartDailyData, lineChartOptions);
	var myLineChartMonthly = new Chart(lineChartMonthly).Line(lineChartMonthlyData, lineChartOptions);

	var data = [
		{
			value: 35,
			color: "#70DB93",
			heightlight: "#70DB93",
			label: "Tablets"
		},
		{
			value: 35,
			color: "#5F9EA0",
			heightlight: "#5F9EA0",
			label: "Phones"
		},
		{
			value: 155,
			color: "#7A67EE",
			heightlight: "#7A67EE",
			label: "Desktop"
		}
	];

	var options = {
	    //Boolean - Whether we should show a stroke on each segment
	    segmentShowStroke : false,

	    //String - The colour of each segment stroke
	    segmentStrokeColor : "#fff",

	    //Number - The width of each segment stroke
	    segmentStrokeWidth : 2,

	    //Number - The percentage of the chart that we cut out of the middle
	    percentageInnerCutout : 50, // This is 0 for Pie charts

	    //Number - Amount of animation steps
	    animationSteps : 0,

	    //String - Animation easing effect
	    animationEasing : "easeOutBounce",

	    //Boolean - Whether we animate the rotation of the Doughnut
	    animateRotate : false,

	    //Boolean - Whether we animate scaling the Doughnut from the centre
	    animateScale : false,

	    responsive: true,

	    // Boolean - Determines whether to draw tooltips on the canvas or not
    	showTooltips: false,
	}

	var donutChart = new Chart(donutChart).Doughnut(data, options);

});