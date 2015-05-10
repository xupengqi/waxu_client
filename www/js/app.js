// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('waxu', ['ionic', 'waxu.controllers'])

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
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('explore', {
    url: "/explore",
    abstract: true,
    templateUrl: "templates/index.html",
    controller: 'IndexCtrl'
  })
  .state('explore.destinations', {
    url: "/destinations",
    views: {
      'bodyContent': {
        templateUrl: "templates/destinations.html",
        controller: 'DestinationsCtrl'
      }
    }
  })
  .state('explore.filter', {
    url: "/filter/:destinationId",
    views: {
      'bodyContent': {
        templateUrl: "templates/filter.html",
        controller: 'FilterCtrl'
      }
    }
  })
  .state('explore.itinerary', {
    url: "/itinerary",
    views: {
      'bodyContent': {
        templateUrl: "templates/itinerary.html",
        controller: 'ItineraryCtrl'
      }
    }
  })


  .state('trips', {
    url: "/trips",
    abstract: true,
    templateUrl: "templates/index.html",
    controller: 'IndexCtrl'
  })
  .state('trips.all', {
    url: "/all",
    views: {
      'bodyContent': {
        templateUrl: "templates/placeholder.html"
      }
    }
  })
  .state('trips.trip', {
    url: "/:tripId",
    views: {
      'bodyContent': {
        templateUrl: "templates/placeholder.html"
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/explore/filter/1');
});
