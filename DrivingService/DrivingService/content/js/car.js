/// <reference path="angular.js" />
var app = angular.module("car", []);

app.controller("carlistController", function ($location, $scope, $http) {

    //列表
    var _carList = function () {
        $http.get(api + "/car/List", {}).success(function (result) {
            $scope.carList = result;
        })
    }
    _carList();

    //删除
    $scope._delete = function (car_id) {
        if (window.confirm('你确定要删除此车辆吗？')) {
            $http.get(api + "/car/delete", { params: { carid: car_id } }).success(function (result) {
                alert("删除成功!");
                _carList();
            })
        } else {
            return false;
        }
    }
    //添加
    $scope.add = function () {
        var reg = /^学\w{4}$/;
        if (reg.test($("#carNumber").val()) == false) {
            alert("请输入正确的车牌号！");
            return;
        }

        if ($scope.carNumber == null)
        {
            alert("车牌号不能为空！");
            return;
        }
        $http.get(api + "/car/add", {
            params: {
                car_type:$scope.carType,
                //car_state:$scope.carState,
                car_number:$scope.carNumber,
                car_remark: $scope.carRemark
            }
        }).success(function (result) {
            if (result.success == true) {
                alert("添加成功！");
                $location.path("/car_list");
            }
            else
                alert(result.reason);
        })
    }
    //查询
    $scope.select = function () {
        var carList = angular.copy($scope.carList);

        if ($scope.car == "")
            _carList();

        else {
            $scope.carList = [];
            angular.forEach(carList, function (item) {
                if (item.car_type.indexOf($scope.car) > -1 || item.car_name.indexOf($scope.car) > -1)
                    $scope.carList.push(item);
            })
        }
    }
    //清楚查询关键字
    $scope.clear = function () {
        _carList();
        $scope.car = "";
    }
})