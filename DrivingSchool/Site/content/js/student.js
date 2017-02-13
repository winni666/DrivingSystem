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

    $("#studentAdd").validate({
        submitHandler: function (form) {
            var reg = /^1\d{10}$/;
            if (reg.test($("#phoneInput").val()) == false) {
                alert("请输入正确的手机号码！");
                return;
            }
            

            var data = new FormData(document.getElementById("studentAdd"));

            $http.get(api + "/student/Add", { params: data }).success(function (result) {
                if (result.success == true) {
                    alert("添加成功！");
                    $location.path("/studentlist");
                }
                else
                    alert(result.reason);
            })

        }
    })
})