/// <reference path="angular.js" />
var app = angular.module("teacher", []);

app.controller("teacherlistController", function ($location, $scope, $http) {

    //列表
    var _teacherList = function () {
        $http.get(api + "/teacher/List", {}).success(function (result) {
            $scope.teacherList = result;
        })
    }
    _teacherList();

    //删除
    $scope._delete = function (Teacher_Id) {
        if (window.confirm('你确定要删除此记录吗？')) {
            $http.get(api + "/teacher/delete", { params: { Teacher_Id: Teacher_Id } }).success(function (result) {
                alert("删除成功!");
                _teacherList();
            })
        } else {
            return false;
        }
    }
    //编辑框
    $scope.showEdit = false;

    //编辑初始换
    $scope.editbox = function (Teacher_Id) {
        $scope.showEdit = true;
        $http.get(api + "/teacher/info", {
            params: { Teacher_Id: Teacher_Id }
        }).success(function (result) {
            $scope.teacherinfo = result;
        })
    }
    //提交编辑
    $scope.edit = function (Teacher_Id) {
        $http.get(api + "/teacher/edit", {
            params: {
                Teacher_Id: Teacher_Id,
                //Teacher_Name:$scope.teacherinfo.Teacher_Name,
                Teacher_Driving: $scope.teacherinfo.Teacher_Driving,
                Teacher_Subject: $scope.teacherinfo.Teacher_Subject,
                Teacher_Time: $scope.teacherinfo.Teacher_Time,
                //Teacher_number:$scope.teacherinfo.Teacher_number,
                Teacher_Remark: $scope.teacherinfo.Teacher_Remark
            }
        }).success(function (result) {
            if (result.success == true) {
                alert("编辑成功！");
                $scope.showEdit = false;
                _teacherList();
            }
            else
                alert(result.reason);
        })
    }
    //关闭
    $scope.cancel = function () {
        $scope.showEdit = false;
    }

    ////查询
    $scope.select = function () {
        var teacherList = angular.copy($scope.teacherList);

        if ($scope.teacher == "")
            _teacherList();

        else {
            $scope.teacherList = [];
            angular.forEach(teacherList, function (item) {
                if (item.Teacher_Name.indexOf($scope.teacher) > -1)
                    $scope.teacherList.push(item);
            })
        }
    }
    //清楚查询关键字
    $scope.clear = function () {
        _teacherList();
        $scope.teacher = "";
    }
})

app.controller("teacherAddController", function ($location, $scope, $http) {

    //添加
    $scope.add = function () {
        if ($scope.teachername == null) {
            alert("姓名不能为空！");
            return;
        }
        if ($scope.teachernumber == null) {
            alert("身份证号不能为空！");
            return;
        }
        $http.get(api + "/teacher/add", {
            params: {
                Teacher_Name:$scope.teachername,
                Teacher_Subject:$scope.teachersubject,
                Teacher_Driving:$scope.teacherdriving,
                Teacher_Time:$scope.teachertime,
                Teacher_Remark: $scope.teacherremark,
                Teacher_number:$scope.teachernumber
                }
                }).success(function (result) {
            if (result.success == true) {
                alert("添加成功！");
                $location.path("/teacherlist");
            }
            else
                alert(result.reason);
                })
    }

})