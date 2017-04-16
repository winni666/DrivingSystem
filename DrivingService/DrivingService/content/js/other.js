/// <reference path="angular.js" />

var app = angular.module("otherModule", []);
//管理员列表
app.controller('newsController', function ($location, $scope, $http) {
    var _newsList = function () {
        $http.get(api+"/other/newslist", {}).success(function (result) {
            $scope.newsList = result;
        })
    }
    _newsList();
    //查询
    $scope.select = function () {
        var newsList = angular.copy($scope.newsList);

        if ($scope.newstitle == "")
            _newsList();

        else {
            $scope.newsList = [];
            angular.forEach(newsList, function (item) {
                if (item.news_title.indexOf($scope.newstitle) > -1)
                    $scope.newsList.push(item);
            })
        }
    }
    //清楚查询关键字
    $scope.clear = function () {
        _newsList();
        $scope.newstitle = "";
    }
    //删除
    $scope._delete = function (news_id) {
        if (window.confirm('确定要删除此新闻吗？')) {
            $http.get(api + "/other/deletenews", { params: { news_id: news_id } }).success(function (result) {
                alert("删除成功!");
                _newsList();
            })
        } else {
            return false;
        }
    }
    //跳转
    $scope.newdetails = function (Id) {
        $location.path('/newsdetails/' + Id);
    }
})

app.controller('newsdetailsController', function ($location, $scope, $http,$routeParams) {
    var id = $routeParams.Id;
    var _newsdetails = function (id) {
        $http.get(api + "/other/NewsInfo", {
            params: {
                news_id: id
            }
        }).success(function (result) {
            $scope.newsdetails = result;
        })
    }
    _newsdetails(id);


    $scope.addNews = function () {
        if ($scope.news_title == null) {
            alert("姓名不能为空！");
            return;
        }
        if ($scope.news_content == null) {
            alert("身份证号不能为空！");
            return;
        }
        $http.get(api + "/other/NewsAdd", {
            params: {
                news_title: $scope.news_title,
                news_content:$scope.news_content,
                news_author: localStorage.getItem("userName")
            }
        }).success(function (result) {
            if (result.success == true) {
                alert("添加成功！");
                $location.path("/newslist");
            }
            else
                alert(result.reason);
        })
    }

})

app.controller('statistController', function ($location, $scope, $http, $routeParams) {

    //统计图1
    setTimeout(function () {
        $http.get(api + "other/DrivingStatics").success(function (res) {
            var _data = [];
            res.forEach(function (item) {
                var obj = {
                    name: item.SignDriving,
                    y: item.Count
                }
                _data.push(obj);
            })

            Highcharts.chart('container1', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: '驾驶证报名统计'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: '比例',
                    colorByPoint: true,
                    data: _data
                }]
            });
        })

    })
})