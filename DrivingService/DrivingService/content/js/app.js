/// <reference path="angular.js" />


(function (angular) {
    var app = angular.module("app", ["mainRouter", "userModule", "studentModule", "testModule", "drivinglicense", "car", "teacher", "studyModule", "otherModule"]);
    app.controller('homeController', function ($location, $scope, $http) {
        $scope.userName = localStorage.getItem("userName");
        $scope.userType = localStorage.getItem('userType');

        $scope.logout = function () {
            localStorage.clear();
            window.location.href = "/login.html";
        }

        $scope.changepage = function () {
            $location.path('/changepassword/' + localStorage.getItem('userId'));
        }

        //富文本框
        //setTimeout(function () {
        //    $('#edit').editable({ inlineMode: false, alwaysBlank: true })

        //}, 1000)
        //柱状图
        $http.get(api + "/other/register", {}).success(function (result) {
            var _categories = [];

            var _data = [];
            angular.forEach(result, function (item) {
                var date = new Date(item.BeginDate);
                _categories.push(date.getMonth() + 1+'月');
                _data.push(item.Count);
            })

            var chart = Highcharts.chart('container', {
                title: {
                    text: '报名统计'
                },
                subtitle: {
                    text: '各月份报名人数统计'
                },
                xAxis: {
                    categories: _categories.reverse(),
                },
                series: [{
                    type: 'column',
                    colorByPoint: true,
                    data: _data.reverse(),
                    showInLegend: false
                }]
            });

        })
    })


})(window.angular)