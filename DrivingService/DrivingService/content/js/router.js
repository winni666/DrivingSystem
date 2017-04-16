angular.module('mainRouter', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.otherwise({ redirectTo: '/' });
        $routeProvider
             .when('/', {
                 templateUrl: '/views/_home.html',
                 controller: 'homeController'
             })
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
              .when('/changepassword/:user_Id', {
                  templateUrl: '/views/_UserChange.html',
                  controller: 'usereditController',
              })
            .when('/studentlist', {
                templateUrl: '/views/_StudentList.html',
                controller: 'studentlistController',
            })
             .when('/student_Physical_Tuition', {
                 templateUrl: '/views/_Student_Is.html',
                 controller: 'studentIsController',
             })
            .when('/studentadd', {
                templateUrl: '/views/_StudentAdd.html',
                controller: 'studentlistController',
            })
             .when('/editstudent/:Id', {
                 templateUrl: '/views/_StudentEdit.html',
                 controller: 'studentEditController',
             })
             .when('/testlist', {
                 templateUrl: '/views/_TestList.html',
                 controller: 'testlistController',
             })
            .when('/addtest', {
                templateUrl: '/views/_TestAdd.html',
                controller: 'testlistController',
            })
             .when('/driving_list', {
                 templateUrl: '/views/_DrivingList.html',
                 controller: 'licenselistController',
             })
            .when('/car_list', {
                templateUrl: '/views/_CarList.html',
                controller: 'carlistController',
            })
            .when('/car_add', {
                templateUrl: '/views/_CarAdd.html',
                controller: 'carlistController',
            })
             .when('/teacherlist', {
                 templateUrl: '/views/_TeacherList.html',
                 controller: 'teacherlistController',
             })
            .when('/teacherAdd', {
                templateUrl: '/views/_TeacherAdd.html',
                controller: 'teacherAddController',
            })
            .when('/study', {
                templateUrl: '/views/_Study.html',
                controller: 'studylistController',
            })
            .when('/studylist', {
                templateUrl: '/views/_StudyList.html',
                controller: 'studylistController',
            })
            .when('/newslist', {
                templateUrl: '/views/_NewsList.html',
                controller: 'newsController',
            })
            .when('/newsdetails/:Id', {
                templateUrl: '/views/_NewsDetails.html',
                controller: 'newsdetailsController',
            })

            .when('/newsadd', {
                templateUrl: '/views/_NewsAdd.html',
                controller: 'newsdetailsController',
            })
         .when('/drivingType', {
             templateUrl: '/views/_StatiDriving.html',
             controller: 'statistController',
         })
        .when('/register', {
            templateUrl: '/views/_Statiregister.html',
            controller: 'homeController',
        })
        $locationProvider.html5Mode(true);//启用html5模式
    }]);


