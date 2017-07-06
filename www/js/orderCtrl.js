// 确认订单页面控制器
(function (angular) {
     angular.module('myApp')
         .controller('orderCtrl',['$scope','$state','$ionicHistory','myfactory','$stateParams',function($scope,$state,$ionicHistory,myfactory,$stateParams) {
            $scope.allPrices=$stateParams.allPrice;
            $scope.cartDatass=myfactory.cartDatass;
            $scope.site=function () {
              $state.go('siteAll')//跳转到管理收货地址页面
            };
           $scope.sitehtml=function () {
             $state.go('site');//修改编辑收货地址页面
           };
           //删除收货地址
           $scope.onItemDelete = function(item) {
             $scope.list1.splice( $scope.list1.indexOf(item), 1);
           };
           //修改地址
           $scope.revise=function (index) {
             myfactory.index=index;//得到要修改的位置
             myfactory.offon=false;//意味重新修改原有的地址
             $state.go('site');
           }
            //收货地址存储
            $scope.sites=myfactory.sites;
            $scope.hui=function () {
              $ionicHistory.goBack();
            };
            var sizeSet='';
            $scope.offon=myfactory.offon;
            //保存收货地址
            $scope.keep=function () {
              if($scope.offon == false){
                angular.forEach(angular.element(document.getElementsByClassName('inputContent')),function (data) {
                  sizeSet+=data.value;
                  myfactory.keeps.splice(myfactory.index,1,sizeSet);//替换原来位置的内容
                });
                myfactory.offon=true;
              }else{
                angular.forEach(angular.element(document.getElementsByClassName('inputContent')),function (data) {
                  sizeSet+=data.value;
                });
                myfactory.keeps.push(sizeSet);
              }
            };
            $scope.list1=myfactory.keeps;
            $scope.hui=function () {
              $ionicHistory.goBack();
              angular.forEach(angular.element(document.getElementsByClassName('radios')),function (data,index,array) {
                if(data.checked){
                  myfactory.sites=data.dataset.site;
                }
              })
            };
          }]);
})(angular)

