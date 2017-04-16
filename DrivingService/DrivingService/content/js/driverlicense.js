/// <reference path="angular.js" />
var app = angular.module("drivinglicense", []);
app.controller("licenselistController", function ($location, $scope, $http) {
    //列表
    var _drivingList = function () {
        $http.get(api + "/driving/DrivingList", {}).success(function (result) {
            $scope.drivingList = result;
        })
    }
    _drivingList();
    //领证
    $scope.getDriving = function (Driving_Card,id) {
        $http.get(api + "/driving/getdriving", {
            params: {
                Driving_Card: Driving_Card,
                Gave_User: localStorage.getItem("userName"),
                id:id
            }
        }).success(function (result) {
            alert("领证成功！");
            _drivingList();
        })
    }
    //查询
    $scope.select = function () {
        var drivingList = angular.copy($scope.drivingList);
        if ($scope.student == "") {
            _drivingList();
        }
        else {
            $scope.drivingList = [];
            angular.forEach(drivingList, function (item) {
                if (item.Name.indexOf($scope.student) > -1)
                    $scope.drivingList.push(item);
            })

        }
    }
    //清楚查询关键字
    $scope.clear = function () {
        _drivingList();
        $scope.student = "";
    }
})