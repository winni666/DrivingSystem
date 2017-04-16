/// <reference path="angular.js" />

var app = angular.module("userModule", []);
//管理员列表
app.controller('userlistController', function ($location, $scope, $http) {
    var _userlist = function () {
        $http.get(api + "/user/list", {}).success(function (result) {
            $scope.userlist = result;
        })
    }
    _userlist();
    //初始化
    $scope.userData = {
        user_Name: "",
        user_Password: "",
        user_Type: "",
        user_Point: ""
    };
    //删除管理员
    $scope._deleteuser = function (username) {
        if (window.confirm('你确定要删除吗？')) {
            $http.get(api + "/user/delete", {
                params: {
                    user_Name: username
                }
            }).success(function (rusult) {
                alert("删除成功！");
                _userlist();
            })
            return true;
        } else {
          return false;
        }

        
    }
    //添加管理员
    $scope.adduser = function () {
        $http.get(api + "/user/add", {
            params: {
                user_Name: $scope.userData.user_Name,
                // user_Name: $("#form-field-1").val(),
                user_Password: $("#form-field-2").val(),
                user_Type: $('#form-field-3 option:selected').val(),
                user_Point: $('#form-field-4 option:selected').val()
            }
        }).success(function (result) {
            if (result.success) {
                alert("添加成功!");
                $location.path('/userlist');
            }
            else
                alert(result.reason);
        })
    }

    //跳转到编辑页
    $scope.editpage = function (user_Id) {
        $location.path('/edituser/' + user_Id);
    }
    //查询
    $scope.select = function () {
        var userlist = angular.copy($scope.userlist);

        if ($scope.searchUser == "" || $scope.searchUser == undefined)
            _userlist();
        else {
            $scope.userlist = [];

            angular.forEach(userlist, function (item) {
                if (item.user_Name.indexOf($scope.searchUser) > -1)
                    $scope.userlist.push(item);
            });
        }
    }
    //清除用户查询关键字
    $scope.clear = function () { 
        _userlist();
        $scope.searchUser = "";
    }

})
//编辑页初始化
app.controller('usereditController', function ($location, $scope, $http, $routeParams) {
    var userId = $routeParams.user_Id;
    $http.get(api + "/user/Info", {
        params: {
            user_Id: userId
        }
    }).success(function (result) {
        $scope.username = result.user_Name;
        $scope.password = result.user_Password;
        $scope.type = result.user_Type;
        $scope.point = result.user_Point;
    })

    //编辑用户
    $scope.edituser = function () {
        $http.get(api + "/user/Edit", {
            params: {
                user_Id: userId,
                user_Name: $("#form-field-1").val(),
                user_Password: $("#form-field-2").val(),
                user_Type: $('#form-field-3 option:selected').val(),
                user_Point: $('#form-field-4 option:selected').val()
            }
        }).success(function (result) {
            if (result.success) {
                alert("编辑成功!");
                $location.path('/userlist');
            }
            else
                alert(result.reason);
        })
    }
    //
    $scope.change = function () {
        $http.get(api + "/user/ChangePassword", {
            params: {
                userid: userId,
                oldpassword:$scope.oldpassword,
                newpassword: $scope.newpassword,
            }
        }).success(function (result) {
            if (result.success) {
                alert("修改成功!");
                $location.path('/userlist');
            }
            else
                alert(result.reason);
        })
    }

})
