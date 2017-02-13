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
        IsTuition: "",
        State: "",
        SignDriving: "",
        Remarks: "",
    };

    //删除管理员
    $scope._deletestudent = function (studentname) {
        // alert("确定删除吗？");

        $http.get(api + "/student/Delete", {
            params: {
                Name: studentname
            }
        }).success(function (rusult) {
            alert("删除成功！");
            _studentlist();
        })
    }
    //跳转到编辑页
    $scope.editpage = function (Id) {
        $location.path('/editstudent/' + Id);
    }
    //添加学员
    $("#studentAdd").validate({
        submitHandler: function (form) {
            var reg = /^1\d{10}$/;
            if (reg.test($("#phoneInput").val()) == false) {
                alert("请输入正确的手机号码！");
                return;
            }
            //var data = new FormData(document.getElementById("studentAdd"));
            $http.get(api + "/student/Add", {
                params: {
                    Name: $scope.studentData.Name,
                    Sex: $scope.studentData.Sex,
                    Age: $scope.studentData.Age,
                    Phone: $scope.studentData.Phone,
                    CardId: $scope.studentData.CardId,
                    SignPoint: $scope.studentData.SignPoint,
                    Photo: $scope.studentData.Photo,
                    IsTuition: $scope.studentData.IsTuition,
                    State: $scope.studentData.State,
                    SignDriving: $scope.studentData.SignDriving,
                    Remarks: $scope.studentData.Remarks,
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
    $scope.viewStudent = function () {
        $scope.showModal = true;
        //请求数据
    }
    $scope.cancel = function () {
        $scope.showModal = false;
    }

})

app.controller('studentEditController', function ($location, $scope, $http, $routeParams) {

    var studentId = $routeParams.Id;
})


