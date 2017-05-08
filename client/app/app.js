angular.module('app',[
  'ngRoute',
  'ngMaterial',
  'app.input',
  'app.dashboard',
  'app.auth',
  'app.services'
])
.config(function($locationProvider, $routeProvider, $mdThemingProvider, $httpProvider) {
  $locationProvider.hashPrefix('');
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('blue');
  $routeProvider
    .when('/', {
      templateUrl: './app/landing/landingTemplate.html',
      controller: 'authController'
    })
    .when('/input', {
      templateUrl: './app/input/inputTemplate.html',
      controller: 'inputController'
    })
    .when('/dashboard', {
      templateUrl: './app/dashboard/dashboardTemplate.html',
      controller: 'dashboardController'
    })
    .when('/logout', {
      redirectTo: '/'
    })
})
.controller('navController', function($scope, $location, $interval) {
    $scope.showSignUp = false;

    $scope.renderNavButtons = function() {
      var currentPath = $location.path();
      return currentPath !== "/";
    }

    $scope.handleDashboardClick = function() {
      $location.path('dashboard');
    }

    $scope.handleInputClick = function() {
      $location.path('input');
    }

    $scope.handleLogoutClick = function() {
      $location.path('logout');
    }

    $interval(function(){
      $scope.showSignUp = $location.url() !== "/";
    }, 500);
})
.run((Auth, $rootScope, $location, $http) => Auth.status($rootScope, $location, $http))

// .     .       .  .   . .   .   . .    +  .
//   .     .  :     .    .. :. .___---------___.
//        .  .   .    .  :.:. _".^ .^ ^.  '.. :"-_. .
//     .  :       .  .  .:../:            . .^  :.:\.
//         .   . :: +. :.:/: .   .    .        . . .:\
//  .  :    .     . _ :::/:               .  ^ .  . .:\
//   .. . .   . - : :.:./.                        .  .:\
//   .      .     . :..|:                    .  .  ^. .:|
//     .       . : : ..||        .                . . !:|
//   .     . . . ::. ::\(                           . :)/
//  .   .     : . : .:.|. ######              .#######::|
//   :.. .  :-  : .:  ::|.#######           ..########:|
//  .  .  .  ..  .  .. :\ ########          :######## :/
//   .        .+ :: : -.:\ ########       . ########.:/
//     .  .+   . . . . :.:\. #######       #######..:/
//       :: . . . . ::.:..:.\           .   .   ..:/
//    .   .   .  .. :  -::::.\.       | |     . .:/
//       .  :  .  .  .-:.":.::.\             ..:/
//  .      -.   . . . .: .:::.:.\.           .:/
// .   .   .  :      : ....::_:..:\   ___.  :/
//    .   .  .   .:. .. .  .: :.:.:\       :/
//      +   .   .   : . ::. :.:. .:.|\  .:/|
//      .         +   .  .  ...:: ..|  --.:|
// .      . . .   .  .  . ... :..:.."(  ..)"
//  .   .       .      :  .   .: ::/  .  .::\
