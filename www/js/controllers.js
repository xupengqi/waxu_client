angular.module('waxu.controllers', [])

.controller('IndexCtrl', function($scope, $ionicModal, $timeout) {
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

  $scope.destinations = [
    { name: 'Los Angeles', enabled: true, id: '553330761d265d2a7bcb905e', background: ['/img/los angeles/1.jpg', '/img/los angeles/2.jpg', '/img/los angeles/3.jpg', '/img/los angeles/4.jpg', '/img/los angeles/5.jpg'] },
    { name: 'San Francisco', enabled: false, id: 2, background: ['/img/san francisco/1.jpg', '/img/san francisco/2.jpg', '/img/san francisco/3.jpg', '/img/san francisco/4.jpg', '/img/san francisco/5.jpg'] },
    { name: 'Budapest', enabled: false, id: 3, background: ['/img/budapest/1.jpg', '/img/budapest/2.jpg', '/img/budapest/3.jpg'] },
    { name: 'Paris', enabled: false, id: 4, background: ['/img/paris/1.jpg', '/img/paris/2.jpg', '/img/paris/3.jpg'] }
  ];

  $scope.filterData = {
    city: null,
    from: '2015/5/1',
    to: '2015/5/1',
    tags: [],
    budget: null,
    pace: null,
    type: {},
    poi: {}
  };

  $scope.test = function() {
    console.log(this);
  };
})

.controller('DestinationsCtrl', function($scope) {
  for(var i=0; i<$scope.destinations.length; i++) {
    $scope.destinations[i].bg = $scope.destinations[i].background[Math.floor(Math.random() * $scope.destinations[i].background.length)];
  }
})
.controller('DestinationList', function($scope) {
  $scope.Math = window.Math;
})
.controller('FilterCtrl', function($scope, $stateParams) {

  $scope.budgetList = [['Budget', 'budget'], ['Mid-range', 'mid-range'], ['Luxury', 'luxury']];
  $scope.typeList1 = [['Business', 'business'], ['Romantic', 'romantic']];
  $scope.typeList2 = [['Family', 'family-friendly'], ['Adventure', 'adventure']];
  $scope.paceList = [['Slow', 0], ['Normal', 1], ['Fast', 2]];
  $scope.poiList1 = [['Landmarks', 'landmark'], ['Museums', 'museum'], ['Amusement Parks', 'amusement-park']];
  $scope.poiList2 = [['Local Foods', 'local-foods'], ['Nature', 'nature'], ['Outdoor Activities', 'outdoor']];
  $scope.poiList3 = [['Shopping', 'shopping'], ['Theater & Concert', 'theater'], ['Famous Restaurants', 'restaurant']];
  $scope.poiList4 = [['Tour & Activities', 'tour'], ['Nightlife', 'nighitlife'], ['Spas & Wellness', 'spa']];

  $scope.destination = null;
  for(var i=0; i<$scope.destinations.length; i++) {
    if ($scope.destinations[i].id == $stateParams.destinationId) {
      $scope.destination = $scope.destinations[i];
    }
  }

  $scope.filterData.city = $scope.destination.id;

})


.factory('WaxuService', function($q, $timeout, $http) {
  var urlBase = 'http://doojiaapp.com:3000/';

  var getItinerary = function(filters) {
    console.log(filters);
    return $http.post(urlBase + "trip/", filters);
  };

  return {
      getItinerary : getItinerary
  };
})
.controller('ItineraryCtrl', function($scope, $ionicLoading, WaxuService) {
  $scope.loadingIndicator = $ionicLoading.show({
    content: 'Loading Data',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 500
  });

  $scope.filterData.tags = [];
  $scope.filterData.tags.push($scope.filterData.budget);
  var i;
  var typeKeys = Object.keys($scope.filterData.type);
  for (i=0; i<typeKeys.length; i++) {
    if ($scope.filterData.type[typeKeys[i]]) {
      $scope.filterData.tags.push(typeKeys[i]);
    }
  }
  var poiKeys = Object.keys($scope.filterData.poi);
  for (i=0; i<poiKeys.length; i++) {
    if ($scope.filterData.poi[poiKeys[i]]) {
      $scope.filterData.tags.push(poiKeys[i]);
    }
  }

  WaxuService.getItinerary($scope.filterData).success(
    function(itinerary) {
      $ionicLoading.hide();
      console.log(itinerary);
      $scope.itinerary = itinerary;
    }
  );
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});
