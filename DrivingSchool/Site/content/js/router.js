angular.module('mainRouter', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.otherwise({ redirectTo: '/' });
    $routeProvider
        .when('/home', {
            templateUrl: '/views/_home.html',
            controller: 'homeController'
        })
        .when('/userlist', {
            templateUrl: '/views/_UserList.html',
            controller: 'userlistController',
        })
         .when('/adduser', {
             templateUrl: '/views/_UserAdd.html',
             controller: 'userlistController',
         })
         .when('/edituser/:user_Id', {
             templateUrl: '/views/_UserEdit.html',
             controller: 'usereditController',
         })
        .when('/studentlist', {
            templateUrl: '/views/_StudentList.html',
            controller: 'studentlistController',
        })
        .when('/studentadd', {
            templateUrl: '/views/_StudentAdd.html',
            controller: 'studentlistController',
        })
    $locationProvider.html5Mode(true);//启用html5模式
}]);