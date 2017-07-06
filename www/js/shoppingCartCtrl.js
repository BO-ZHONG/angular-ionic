// 购物车控制器
(function (angular) {
       angular.module('myApp')
          .controller('shoppingCartCtrl',['$scope','myfactory','$cordovaVibration','$state','$ionicHistory',function ($scope,myfactory,$cordovaVibration,$state,$ionicHistory) {
            $scope.cartData=myfactory.cartData;
            $scope.showDelete =false;
            $scope.isDisabled=true;
            $scope.isSelect=false;
            $scope.allPrice=0;
            $scope.price=0;
            $scope.num=0;
            // $scope.values=1;
            //封装购物车页面的加减按钮
            function add_minus(data,type) {
                $scope.indexs=$scope.cartData.indexOf(data);
                var values=angular.element(document.getElementsByClassName('values'));
                var i=angular.element(document.getElementsByClassName('i'));
                var old_Values=values[$scope.indexs].value;
                var new_Values;
                if(type != 2 && values[$scope.indexs].value == 1){
                  return;
                }
                if(type == 2){
                  values[$scope.indexs].value++;
                  new_Values=values[$scope.indexs].value;
                  $scope.allPrice+=(new_Values-old_Values)*$scope.price;
                }else{
                  values[$scope.indexs].value--;
                  new_Values=values[$scope.indexs].value;
                  $scope.allPrice+=(new_Values-old_Values)*$scope.price;
                }
                i[$scope.indexs].innerHTML='x'+values[$scope.indexs].value;
                $scope.nums=values[$scope.indexs].value;
            }
            $scope.add_minus={
              jian:function (data) {
                add_minus(data,1)
              },
              jia:function (data) {
                add_minus(data,2)
              }
            };
            // 删除列表中的项
            $scope.onItemDelete = function(item) {
              $scope.cartData.splice($scope.cartData.indexOf(item), 1);
              $scope.showDelete=false;
            };
            //按钮是否选中
            function isSelect($event,data,type) {
                var num=$scope.cartData.indexOf(data);
                var i=angular.element(document.getElementsByClassName('i'));
                $scope.price=parseFloat($event.target.dataset.price.substring(1));
                if(type == 1){
                  $scope.allPrice+=$scope.price*parseFloat(i[num].innerHTML.substring(1));
                }else{
                  $scope.allPrice=$scope.allPrice-$scope.price*parseFloat(i[num].innerHTML.substring(1));
                }
            };
            $scope.isSelect=function ($event,data) {
              var onffo=true;
              if($event.target.checked ){
                $scope.isDisabled =false;
                isSelect($event,data,1)
              }else{
                isSelect($event,data,2);
                angular.forEach(angular.element(document.getElementsByClassName('checks')),function (data,index,array) {
                  if(onffo){
                    if(data.checked){
                      $scope.isDisabled =false;
                      onffo=false;
                    }else {
                      $scope.isDisabled = true;
                    }
                  }
                });
              }
            };
            //全选按钮函数封装
            function forData(className,on_off,className_One) {
                var i=angular.element(document.getElementsByClassName(className_One));
                $scope.allPrice=0;
                angular.forEach(angular.element(document.getElementsByClassName(className)),function (data,index) {
                  data.checked=on_off;
                  if(on_off == true){
                    $scope.allPrice+=parseFloat(data.dataset.price.substring(1))*parseFloat(i[index].innerHTML.substring(1));
                  }else{
                    $scope.allPrice=0;
                  }
                });
                $scope.isDisabled =!on_off;
            };
            // 全选按钮
            $scope.allSelect=function ($event) {
              if($event.target.checked == true ){
                 forData('checks',true,'i')
              }else{
                 forData('checks',false)
              }
            };
            // 从购物车页面跳到订单页面
            $scope.order=function () {
              myfactory.cartDatass.splice(0,myfactory.cartDatass.length);
              angular.forEach(angular.element(document.getElementsByClassName('checks')),function (data,index,array) {
                if(data.checked){
                  myfactory.cartDatass.push( data.dataset.mydata.replace(/"([^"]*)"/g,"$1").split(","));
                }
              });
              $state.go('Order',{allPrice:$scope.allPrice});
            };
            // $scope.$on('$ionicView.enter',function (p1, p2) {
            //   $scope.allPrice=0;
            //   angular.forEach(angular.element(document.getElementsByClassName('checks')),function (data,index,array) {
            //     data.checked = false;
            //   });
            // })

          }]);
})(angular)

