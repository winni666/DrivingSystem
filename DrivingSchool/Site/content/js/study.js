/// <reference path="angular.js" />
var app = angular.module("studyModule", []);
app.controller("studylistController", function ($location, $scope, $http) {
    //学车列表
    var _studylist = function () {
        $http.get(api + "/study/list", {}).success(function (result) {
            $scope.studyList = result;
        })
    }
    _studylist();
    //查询
    $scope.select = function () {
        var studyList = angular.copy($scope.studyList);

        if ($scope.student == "")
            _studylist();

        else {
            $scope.studyList = [];
            angular.forEach(studyList, function (item) {
                if (item.Study_studentname.indexOf($scope.student) > -1 || item.Teacher_Name.indexOf($scope.student) > -1)
                    $scope.studyList.push(item);
            })
        }
    }
    //清除查询关键字
    $scope.clear = function () {
        _studylist();
        $scope.student = "";
    }
    //取消学车
    $scope.delete = function (Study_Id) {
        if (window.confirm('你确定要取消此记录吗？')) {
            $http.get(api + "/study/delete", { params: { Study_Id: Study_Id } }).success(function (result) {
                alert("取消成功!");
                _studylist();
            })
        } else {
            return false;
        }

    }
    //完成学车
    $scope.finish = function (Study_Id) {
        $http.get(api + "/study/finish", { params: { Study_Id: Study_Id } }).success(function (result) {
            alert("已完成!");
            _studylist();
        })
    }

    //监听 教练、车辆、学生
    $scope.$watchGroup(["date", "time", "driving", "subject"], function () {
        selectTeacher($scope.date, $scope.time, $scope.driving, $scope.subject);

        selectCar($scope.date, $scope.time, $scope.driving);

        selectStudent($scope.date, $scope.time, $scope.driving, $scope.subject);
    })



    //可选的教练
    var selectTeacher = function (date, time, driving, subject) {
        $http.get(api + "/study/SelectTeacher", {
            params: {
                time: time,
                date: date,
                subject: subject,
                driving: driving
            }
        }).success(function (result) {
            angular.forEach(result, function (item) {
                item.selected = false;
            })
            $scope.teacherList = result;

        })
    }
    //可选的车
    var selectCar = function (date, time, driving) {
        $http.get(api + "/study/SelectCar", {
            params: {
                time: time,
                date: date,
                driving: driving
            }
        }).success(function (result) {
            angular.forEach(result, function (item) {
                item.selected = false;
            })
            $scope.carList = result;
        })
    }

    //可安排考试的学生
    var selectStudent = function (date, time, driving, subject) {
        $http.get(api + "/study/SelectStudent", {
            params: {
                time: time,
                date: date,
                subject: subject,
                driving: driving
            }
        }).success(function (result) {
            angular.forEach(result, function (item) {
                item.selected = false;
            })
            $scope.studentList = result;
        })
    }
    //全选
    $scope.toggleAll = function () {
        $scope.selectedAll = !$scope.selectedAll;

        $scope.studentList.forEach(function (item) {
            item.selected = $scope.selectedAll;
        })

    }
    $scope.submitStudy = function () {

    }

    //安排考试
    $scope.submitStudy = function () {
        var ids = "";
        var teacherid = "";
        var carid = "";

        if ($scope.date == null) {
            alert("请选择学车日期！");
            return;
        }
        if ($scope.time == null) {
            alert("请选择徐彻时间段！");
            return;
        }
        
        if ($scope.driving == null) {
            alert("请选择驾驶证类型！");
            return;
        }
        if ($scope.subject == null) {
            alert("请选择学车科目！");
            return;
        }
        if ($scope.room == null) {
            alert("请选择学车场地！");
            return;
        }

        angular.forEach($scope.teacherList, function (item) {
            if (item.selected)
                teacherid = item.Teacher_Id;
        })
        if (teacherid == "") {
            alert("请选择教练！");
            return;
        }

        angular.forEach($scope.carList, function (item) {
            if (item.selected)
                carid = item.car_number;
        })
        if (carid == "") {
            alert("请选择车牌！");
            return;
        }
        angular.forEach($scope.studentList, function (item) {
            if (item.selected)
                ids += item.Id + ",";
        })

        if (ids == "") {
            alert("请选择学生！");
            return;
        }
        
        $http.get(api + "/study/AddStudy", {
            params: {
                Study_date: $scope.date,
                Study_time: $scope.time,
                Study_driving: $scope.driving,
                Study_subject: $scope.subject,
                study_room: $scope.room,
                Study_carnumber: carid,
                Study_teacherId: teacherid,
                ids: ids
            }
        }).success(function (result) {
            if (result.success == true) {
                alert("成功安排学车！");
                $location.path("/studylist");
            }
            else
                alert(result.reason);
        })

    }
})

