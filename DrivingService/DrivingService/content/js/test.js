/// <reference path="angular.js" />
var app = angular.module("testModule", []);
app.controller("testlistController", function ($location, $scope, $http) {
    //考试学生列表
    var testlist = function () {
        $http.get(api + "/test/list", {}).success(function (result) {
            $scope.testList = result;
        })
    }
    testlist();
    //查询
    $scope.select = function () {
        if ($scope.searchstudent == null || $scope.subject == "")
        {
            testlist();
        }
        $http.get(api + "/test/select", {
            params:{
                Name:$scope.searchstudent,
                Subject: $scope.subject
                }
        }).success(function (result) {
            $scope.testList = result;
        })

    }

    //清楚查询关键字
    $scope.clearName = function () {
        $scope.searchstudent = null;
        $scope.select();
    }

    //可安排考试的学生
    $scope.$watchGroup(["subject", "isMe", "driving"], function () {

        if ($scope.subject == "" || $scope.subject == undefined) {
            $scope.testStudent = undefined;
            return;
        }
        if ($scope.driving == "" || $scope.driving == undefined) {
            $scope.testStudent = undefined;
            return;
        }
        var object = {
            Subject: $scope.subject,
            Driving: $scope.driving,
        };
        if ($scope.isMe == "1") {
            object.SignUser = localStorage.getItem("userName");
        }

        $http.get(api + "/test/TestStudent", {
            params: object
        }).success(function (result) {
            angular.forEach(result, function (item) {
                item.selected = false;
            })
            $scope.testStudent = result;
        })
    })
    //全选

    $scope.toggleAll = function () {
        $scope.selectedAll = !$scope.selectedAll;

        $scope.testStudent.forEach(function (item) {
            item.selected = $scope.selectedAll;
        })

    }

    //安排考试
    $scope.addtest = function () {
        var ids = "";
        if ($scope.date == null)
        {
            alert("请选择考试时间！");
            return;
        }

        if ($scope.room == null)
        {
            alert("请选择考试场地！");
            return;
        }
        angular.forEach($scope.testStudent, function (item) {
            if (item.selected)
                ids += item.Id + ",";
        })

        if (ids == "")
        {
            alert("请选择学生！");
            return;
        }
        
        $http.get(api + "/test/AddTest", {
            params: {
                subject: $scope.subject,
                date: $scope.date,
                room: $scope.room,
                driving: $scope.driving,
                ids: ids
            }
        }).success(function (result) {
            if (result.success == true) {
                alert("成功安排考试！");
                $location.path("/testlist");
            }
            else
                alert(result.reason);
        })

    }

    //打分模态框
    $scope.showAddScore = false;
    $scope.showScore = function (testid,cardid,name,drivingtype,subject) {
        $scope.showAddScore = true;
        $scope.TestScore = '';
        $scope.testid = testid;
        $scope.cardid = cardid;
        $scope.name = name;
        $scope.drivingtype = drivingtype;
        $scope.subject = subject;
    }
    //关闭
    var _cancel = function () {
        $scope.showAddScore = false;
    }
    $scope.cancel = _cancel;

    //录入成绩
    $scope.add = function () {
        if ($scope.TestScore=='') {
            alert("请输入分数！");
            return;
        }
       
        $http.get(api + "/test/AddScore", {
            params: {
                testid: $scope.testid,
                score: $scope.TestScore,
            }
        }).success(function (result) {
            if (result.success == true) {
                testlist();
                _cancel();
                alert("成功录入成绩！");
                if ($scope.subject == '科目五')
                {
                    addDrivingList();
                }
            }
            else
                alert(result.reason);
        })

    }
    //写入driving
    var addDrivingList = function () {
        $http.get(api + "/test/AddDrivingList", {
            params:{
                cardid:$scope.cardid,
                name:$scope.name,
                drivingtype:$scope.drivingtype,
            }
        }).success(function (result) {})
    }

})

