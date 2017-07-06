//详细商品页面控制器
(function (angular) {
  angular.module('myApp')
       .controller('listCtrl',['$rootScope','$scope','myfactory','$state','$ionicTabsDelegate','$ionicPopover','$ionicListDelegate','$timeout','picResize',function ($rootScope,$scope,myfactory,$state,$ionicTabsDelegate,$ionicPopover,$ionicListDelegate,$timeout,picResize) {
         // 对图片进行自适应配置
         $scope.$on('$ionicView.loaded',function (p1, p2) {
           picResize()
         });
         window.onresize=function () {
           picResize()
         };
         // 商品对话框数据的保存
         // 初始商品数量为1
          $scope.values=1;
          // 监听接收商品数量的变化
          $scope.$on('values',function (p1, p2) {
            $scope.values=p2;
            myfactory.num=$scope.values;
          });
          // 向下传递商品数量的变化值
          $scope.$broadcast('values',$scope.values);
          // 创建对话框
          $ionicPopover.fromTemplateUrl("template/model.html",{
            scope:$scope,
            animation:'slide-in-up'
          }).then(function (popover) {
            $scope.popover=popover;
          });
          // 设置判断nums，如果nums=1那么是跳转到购物车页面；如果nums=2那么跳转到立即购物页面
          var nums=0;
          $scope.openPopover=function ($evnet,num) {
            nums=num;
            $scope.popover.show($evnet);
          };
          $scope.closePopover = function() {
            $scope.popover.hide();
          };
          // 获取保存上一个关联页面所保存的数据
          var  Data=myfactory.storage.getVal('datas');
          var  i;
          // 找数组最大值
          Array.prototype.max=function () {
            var max=this[0];
            var len=this.length;
            var i;
            for(i=0;i<len;i++){
              if(this[i]>max){
                max=this[i];
              }
            }
            return max;
          };
          $scope.views={
            all:function () {
              $scope.view=[];
              $scope.all=Data.details_assess.all;
              var lens=[$scope.all.A.length,$scope.all.B.length,$scope.all.C.length];
              var max=lens.max();
              for(i=0;i<max;i++){
                if($scope.all.A.length>i){
                  $scope.view.push($scope.all.A[i]);
                }
                if($scope.all.B.length>i){
                  $scope.view.push($scope.all.B[i]);
                }
                if($scope.all.C.length>i){
                  $scope.view.push($scope.all.C[i]);
                }
              }
            },
            A:function () {
              $scope.view=Data.details_assess.all.A;
            },
            B:function () {
              $scope.view=Data.details_assess.all.B;
            },
            C:function () {
              $scope.view=Data.details_assess.all.C;
            },
            cart_data:function (pic,title,price) {
              if($scope.spec == undefined){
                  return;//没选择型号就跳出
              }
              if(nums == 1){
                // 被选中的数据保存到服务利于购物车渲染
                myfactory.cartData.push( [$scope.spec,pic,title,price,$scope.values]);
              }else{
                $scope.allPrice=0;
                // 删除原先数据
                myfactory.cartDatass.splice(0,myfactory.cartDatass.length);
                // 再添加新数据
                myfactory.cartDatass.push( [$scope.spec,pic,title,price,$scope.values]);
                // 商品总价的计算
                $scope.allPrice+=price.substring(1)*$scope.values;
                // 跳到确认订单页面
                $state.go('Order',{allPrice:$scope.allPrice})
              }
              $scope.closePopover();
          },
          // 通过点击返回型号
          selects:function ($event) {
            $scope.spec= $event.target.value;
          }
        };
        $scope.goCart=function () {
          $state.go('home.cart')
        };
        // 取出放在本地的数据
        var datass=localStorage.getItem("a");
        var b=angular.fromJson(datass);
        $scope.views.datas=b;
  }])

})(angular)

