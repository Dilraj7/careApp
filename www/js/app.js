// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','angles','firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    fb = new Firebase("https://crackling-inferno-2875.firebaseio.com/");
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.chart', {
    url: "/chart",
    views: {
      'menuContent': {
        templateUrl: "templates/chart.html",
        controller: 'ChartCtrl'
      }
    }
  })

  .state('app.historique', {
    url: "/historique",
    views: {
      'menuContent': {
        templateUrl: "templates/historique.html",
        controller: 'HistoriqueCtrl'
      }
    }
  })

  .state('app.feed', {
    url: "/feed",
    views: {
      'menuContent': {
        templateUrl: "templates/feed.html",
        controller: 'FeedCtrl'
      }
    }
  })

    .state('app.analytics', {
      url: "/analytics",
      views: {
        'menuContent': {
          templateUrl: "templates/analytics.html",
          controller: 'AnalyticsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/analytics/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/analytic.html",
        controller: 'AnalyticCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/chart');
});
