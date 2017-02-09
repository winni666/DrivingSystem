/// <reference path="angular.js" />
var app = angular.module("studentModule", []);
app.controller('studentlistController', function ($location, $scope, $http) {
    //学员列表
    var _studentlist = function () {
        $http.get(api + "/student/list", {}).success(function (result) {
            $scope.studentlist = result;
        })
    }
    _studentlist();

    //添加学员
    $scope.addStudent = function () {

    }
})