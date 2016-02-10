// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//angular.module('starter', ['ionic', 'starter.controllers'])
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngIOS9UIWebViewPatch'])


.run(function($ionicPlatform, $ionicPopup) {
        $ionicPlatform.ready(function() {
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }
        });
    })



.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {

    // We need to setup some parameters for http requests
    // These three lines are all you need for CORS support
   $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  })



.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

/*   .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardCtrl'
      }
    }
  })*/

   .state('dashboard', {
      url: "/dashboard",
      templateUrl: "templates/dashboard.html",
       controller: 'DashboardCtrl'
      
    })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      cache: false,
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.employeeSkills', {
      cache: false,
      url: '/employeeSkills',
      views: {
        'menuContent': {
          templateUrl: 'templates/employeeSkills.html',
          controller: 'employeeSkillsCtrl'
        }
      }
    })
    .state('app.skillsDetail', {
      cache: false,
      url: '/skillsDetail',
      views: {
        'menuContent': {
          templateUrl: 'templates/skillsDetail.html',
          controller: 'skillsDetailCtrl'
        }
      }
    })

    .state('app.TRapprovals', {
      cache: false,
      url: '/TRapprovals',
      views: {
        'menuContent': {
          templateUrl: 'templates/TRapprovals.html',
          controller: 'TRapprovalsCtrl'
        }
      }
    })

    

 /* .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })*/
  .state('app.single', {
    url: '/tsList/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/tsList.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  .state('login', {
      url: "/login",
      templateUrl: "login.html",
      controller: 'LoginCtrl'
    });
  // if none of the above states are matched, use this as the fallback

  //Clear session storage
  $urlRouterProvider.otherwise('/login');


  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/playlists');
});
