angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

/************ Chart Controller **************/
.controller('ChartCtrl', function($firebaseArray,$scope) {
            var i = 0;
  $scope.settings = {
    showEvaluation: false
  };

    $scope.test = {};

    $scope.test.numberSelection = 20;
    $scope.test.numberSelection2 = 56;
    $scope.test.numberSelection3 = 42;
    $scope.test.numberSelection4 = 34;
    $scope.test.numberSelection5 = 39;

  //Globals
    $scope.options = {
        // Boolean - Whether to animate the chart
        animation: true,

        // Number - Number of animation steps
        animationSteps: 60,

        // String - Animation easing effect
        animationEasing: "easeOutQuart",

        // Boolean - If we should show the scale at all
        showScale: true,

        // Boolean - If we want to override with a hard coded scale
        scaleOverride: false,

        // ** Required if scaleOverride is true **
        // Number - The number of steps in a hard coded scale
        scaleSteps: null,
        // Number - The value jump in the hard coded scale
        scaleStepWidth: null,
        // Number - The scale starting value
        scaleStartValue: null,

        // String - Colour of the scale line
        scaleLineColor: "rgba(0,0,0,.1)",

        // Number - Pixel width of the scale line
        scaleLineWidth: 1,

        // Boolean - Whether to show labels on the scale
        scaleShowLabels: true,

        // Interpolated JS string - can access value
        scaleLabel: "<%=value%>",

        // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
        scaleIntegersOnly: true,

        // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: false,

        // String - Scale label font declaration for the scale label
        scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // Number - Scale label font size in pixels
        scaleFontSize: 12,

        // String - Scale label font weight style
        scaleFontStyle: "normal",

        // String - Scale label font colour
        scaleFontColor: "#666",

        // Boolean - whether or not the chart should be responsive and resize when the browser does.
        responsive: false,

        // Boolean - Determines whether to draw tooltips on the canvas or not
        showTooltips: true,

        // Array - Array of string names to attach tooltip events
        tooltipEvents: ["mousemove", "touchstart", "touchmove"],

        // String - Tooltip background colour
        tooltipFillColor: "rgba(0,0,0,0.8)",

        // String - Tooltip label font declaration for the scale label
        tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // Number - Tooltip label font size in pixels
        tooltipFontSize: 14,

        // String - Tooltip font weight style
        tooltipFontStyle: "normal",

        // String - Tooltip label font colour
        tooltipFontColor: "#fff",

        // String - Tooltip title font declaration for the scale label
        tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // Number - Tooltip title font size in pixels
        tooltipTitleFontSize: 14,

        // String - Tooltip title font weight style
        tooltipTitleFontStyle: "bold",

        // String - Tooltip title font colour
        tooltipTitleFontColor: "#fff",

        // Number - pixel width of padding around tooltip text
        tooltipYPadding: 6,

        // Number - pixel width of padding around tooltip text
        tooltipXPadding: 6,

        // Number - Size of the caret on the tooltip
        tooltipCaretSize: 8,

        // Number - Pixel radius of the tooltip border
        tooltipCornerRadius: 6,

        // Number - Pixel offset from point x to tooltip edge
        tooltipXOffset: 10,

        // String - Template string for single tooltips
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

        // String - Template string for single tooltips
        multiTooltipTemplate: "<%= value %>",

        // Function - Will fire on animation progression.
        onAnimationProgress: function(){},

        // Function - Will fire on animation completion.
        onAnimationComplete: function(){}
    };

    $scope.chart = {};
    $scope.showMeTheNumber = function(){

        $scope.chart = {
          labels: ["Alimentation", "Hydratation", "Sommeil", "Activité", "Obs.Medicale"],
          datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "#1A2530",
                    pointColor: "#DF4949",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [$scope.test.numberSelection, $scope.test.numberSelection2, $scope.test.numberSelection3, $scope.test.numberSelection4, $scope.test.numberSelection5]
                },
                // {
                //     label: "My Second dataset",
                //     fillColor: "rgba(151,187,205,0.2)",
                //     strokeColor: "rgba(151,187,205,1)",
                //     pointColor: "rgba(151,187,205,1)",
                //     pointStrokeColor: "#fff",
                //     pointHighlightFill: "#fff",
                //     pointHighlightStroke: "rgba(151,187,205,1)",
                //     data: [28, 48, 40, 19, 96, 27, 100]
                // }
            ]
        };

        /************* Save Data in Firebase *************/
        var ref = new Firebase("https://crackling-inferno-2875.firebaseio.com/");
        $scope.evaluation = $firebaseArray(ref.child('users').child('evaluation'));

        $scope.evaluation.$add({
            alimentation: $scope.test.numberSelection,
            hydratation: $scope.test.numberSelection2,
            sommeil: $scope.test.numberSelection3,
            activite: $scope.test.numberSelection4,
            obsmedicale: $scope.test.numberSelection5
        }).then(function(ref) {
              var id = ref.key();
              console.log("added record with id " + id);
              $scope.evaluation.$indexFor(id); // returns location in the array
        });

        i=i+1;
    }

    

    $scope.compare = function(){
      $scope.chart.datasets = [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "#1A2530",
            pointColor: "#DF4949",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [$scope.test.numberSelection, $scope.test.numberSelection2, $scope.test.numberSelection3, $scope.test.numberSelection4, $scope.test.numberSelection5]
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "#d35400",
          pointColor: "#27ae60",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [35, 47, 63, 26, 56],
          legend:"Old one"
        }
      ]
       
    }

    
})


/************ Historique Controller **************/
.controller('HistoriqueCtrl', function($firebaseObject,$scope) {
    var ref = new Firebase("https://crackling-inferno-2875.firebaseio.com/");
    // download physicsmarie's profile data into a local object
    // all server changes are applied in realtime
    $scope.user = $firebaseObject(ref.child('users').child('evaluation'));
  })

.controller('AnalyticsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Alimentation', id: 1 },
    { title: 'Hydratation', id: 2 },
    { title: 'Sommeil', id: 3 },
    { title: 'Activité', id: 4 },
    { title: 'Obs.Medicale', id: 5 }
  ];

})

.controller('AnalyticCtrl', function($scope, $stateParams) {

});