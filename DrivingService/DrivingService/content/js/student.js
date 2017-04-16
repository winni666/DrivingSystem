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
    //初始化
    $scope.studentData = {
        Name: "",
        Sex: "",
        Age: "",
        Phone: "",
        CardId: "",
        SignPoint: "",
        Photo: "",
        IsPhysical: "",
        IsTuition: "",
        State: "",
        SignDriving: "",
        Remarks: "",
    };
    //查询 
    $scope.select = function () {
        var studentlist = angular.copy($scope.studentlist);

        if ($scope.searchstudent == "")
            _studentlist();

        else {
            $scope.studentlist = [];
            angular.forEach(studentlist, function (item) {
                if (item.Name.indexOf($scope.searchstudent) > -1)
                    $scope.studentlist.push(item);
            })
        }
    }
    //清楚查询关键字
    $scope.clear = function () {
        _studentlist();
        $scope.searchstudent = "";
    }

    //删除管
    $scope._deletestudent = function (studentname) {
        // alert("确定删除吗？");
        if (window.confirm('你确定要删除吗？')) {
            $http.get(api + "/student/Delete", {
                params: {
                    Name: studentname
                }
            }).success(function (rusult) {
                alert("删除成功！");
                _studentlist();
            })
        } else {
            return false;
        }

    }
    //跳转到编辑页
    $scope.editpage = function (Id) {
        $location.path('/editstudent/' + Id);
    }
    //跳转到成绩录入页
    $scope.addScore = function (Id) {
        $location.path('/addscore/' + Id);
    }

    //添加学员
    $("#studentAdd").validate({
        submitHandler: function (form) {
            var reg = /^1\d{10}$/;
            if (reg.test($("#phoneInput").val()) == false) {
                alert("请输入正确的手机号码！");
                return;
            }
            $http.get(api + "/student/Add", {
                params: {
                    Name: $scope.studentData.Name,
                    Sex: $scope.studentData.Sex,
                    Age: $scope.studentData.Age,
                    Phone: $scope.studentData.Phone,
                    CardId: $scope.studentData.CardId,
                    SignPoint: $scope.studentData.SignPoint,
                    Photo: $scope.studentData.Photo,
                    //IsPhysical: $scope.studentData.IsPhysical,
                    //IsTuition: $scope.studentData.IsTuition,
                    State: $scope.studentData.State,
                    SignDriving: $scope.studentData.SignDriving,
                    Remarks: $scope.studentData.Remarks,
                    user_Name: localStorage.getItem("userName")
                }
            }).success(function (result) {
                if (result.success == true) {
                    alert("添加成功！");
                    $location.path("/studentlist");
                }
                else
                    alert(result.reason);
            })

        }
    })
    //查看
    $scope.showModal = false;
    $scope.viewStudent = function (Id) {
        $scope.showModal = true;
        $http.get(api + "/student/Info", {
            params: { Id: Id }
        }).success(function (result) {
            $scope.studentInfo = result;

        })
    }
    //关闭
    $scope.cancel = function () {
        $scope.showModal = false;

    }

})

app.controller('studentEditController', function ($location, $scope, $http, $routeParams) {
    //初始化编辑页
    var studentId = $routeParams.Id;
    $http.get(api + "/student/Info", {
        params: { Id: studentId }
    }).success(function (result) {
        $scope.studentInfo = result;

    });

    //提交编辑
    $scope.editStudent = function () {
        var reg = /^1\d{10}$/;
        if (reg.test($("#phoneInput").val()) == false) {
            alert("请输入正确的手机号码！");
            return;
        }
        $http.get(api + "/student/Edit", {
            params: {
                Id: $scope.studentInfo.Id,
                Name: $scope.studentInfo.Name,
                Sex: $scope.studentInfo.Sex,
                Age: $scope.studentInfo.Age,
                Phone: $scope.studentInfo.Phone,
                CardId: $scope.studentInfo.CardId,
                SignPoint: $scope.studentInfo.SignPoint,
                Photo: $scope.studentInfo.Photo,
                IsPhysical: $scope.studentInfo.IsPhysical,
                //IsTuition: $scope.studentInfo.IsTuition,
                State: $scope.studentInfo.State,
                SignDriving: $scope.studentInfo.SignDriving,
                Remarks: $scope.studentInfo.Remarks,
                //user_Name: localStorage.getItem("userName")
            }
        }).success(function (result) {
            if (result.success) {
                alert("编辑成功！");
                $location.path('/studentlist');
            }
            else
                alert(result.reason);
        })
    }

})
//体检/缴费
app.controller('studentIsController', function ($location, $scope, $http, $routeParams) {
    var _studentlist = function () {
        $http.get(api + "/student/list", {}).success(function (result) {

            $scope.not_tuition_physical = [];

            angular.forEach(result, function (item) {
                if (item.IsTuition == '否' || item.IsPhysical == '否')
                    $scope.not_tuition_physical.push(item);
            })
        })
    }
    _studentlist();

    //查询 
    $scope.selectIs = function () {
        var not_tuition_physical = angular.copy($scope.not_tuition_physical);

        if ($scope.Is_student == "")
            _studentlist();

        else {
            $scope.not_tuition_physical = [];
            angular.forEach(not_tuition_physical, function (item) {
                if (item.Name.indexOf($scope.Is_student) > -1)
                    $scope.not_tuition_physical.push(item);
            })
        }
    }
    //清楚查询关键字
    $scope.clear = function () {
        _studentlist();
        $scope.Is_student = "";
    }


//提交体检
    $scope.editPhysical = function (Id) {
        if (window.confirm('是否体检合格？')) {
            $http.get(api + '/student/EditPhysical', {
                params: {
                    Id: Id
                }
            }).success(function (result) {
                if (result.success) {
                    alert("体检合格！");
                    _studentlist();
                }
                else
                    alert(result.reason);
            })
            return true;
        }
        else {
            return false;
        }
    }
//提交缴费
    $scope.editTuition = function (Id) {
        if (window.confirm('是否缴费？')) {

            $http.get(api + '/student/EditTuition', {
                params: {
                    Id: Id
                }
            }).success(function (result) {
                if (result.success) {
                    alert("缴费成功！");
                    _studentlist();
                }
                else
                    alert(result.reason);
            })

            return true;
        }
        else {
            return false;
        }

    }

})

