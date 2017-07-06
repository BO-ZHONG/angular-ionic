(function (angular) {
       angular.module('myApp')
         .controller("homeCtrl",['$rootScope','$scope','myfactory','$state','$ionicHistory','$ionicSlideBoxDelegate','$cordovaVibration',function ($rootScope,$scope,myfactory,$state, $ionicHistory,$ionicSlideBoxDelegate,$cordovaVibration) {
              $scope.views={
                listPic:[],
                listDatas:[],
                // 获取轮播图图片
                getPic:function () {
                  myfactory.getPic().then(function (res) {
                    if (res.status == 200 && res.data){
                      $scope.views.listPic=res.data.src;
                      $ionicSlideBoxDelegate.update();
                    }
                  },function (res) {
                      // error下的处理方式
                  })

                },
                // 获取需要加载的列表数据
                getData:function () {
                  myfactory.getData().then(function (res) {
                    if(res.status == 200 && res.data){
                      $scope.views.listDatas=res.data.data;
                    }
                  })
                },
                change:function(data){
                  $state.go("list.index");
                  // 点击时把数据保存到服务myfactory中，以便跳转到详细商品页面时利于渲染
                  myfactory.storage.setVal('datas',data);
                  var a=angular.toJson(data);//也可以保存到服务中
                  localStorage.setItem("a",a);
                },
                back:function () {
                  $ionicHistory.goBack();
                }
              }
              $scope.views.getPic();
              $scope.views.getData();
            }]);
})(angular)

// app.controller('shoppingCartCtrl',function ($scope,myfactory,$cordovaVibration,$state,$ionicHistory) {
//     $scope.cartData=myfactory.cartData;
//     $scope.showDelete =false;
//     $scope.isDisabled=true;
//     $scope.isSelect=false;
//     $scope.allPrice=0;
//     $scope.price=0;
//     $scope.num=0;
//     $scope.values=1;
//     $scope.add_minus={
//         jian:function (data) {
//             $scope.indexs=$scope.cartData.indexOf(data);
//             var values=angular.element(document.getElementsByClassName('values'));
//             var i=angular.element(document.getElementsByClassName('i'));
//             if(values[$scope.indexs].value == 1){
//                 return;
//             }
//             values[$scope.indexs].value--;
//             i[$scope.indexs].innerHTML='x'+values[$scope.indexs].value;
//             $scope.nums=values[$scope.indexs].value;
//         },
//         jia:function (data) {
//             $scope.indexs=$scope.cartData.indexOf(data);
//             var values=angular.element(document.getElementsByClassName('values'));
//             var i=angular.element(document.getElementsByClassName('i'));
//             values[$scope.indexs].value++;
//             i[$scope.indexs].innerHTML='x'+values[$scope.indexs].value;
//             $scope.nums=values[$scope.indexs].value;
//         }
//     };
//     $scope.onItemDelete = function(item) {
//         $scope.cartData.splice($scope.cartData.indexOf(item), 1);
//         $scope.showDelete=false;
//     };
//     $scope.isSelect=function ($event,data) {
//         var datas=true;
//         if($event.target.checked ){
//             $scope.isDisabled =false;
//             $scope.price=parseFloat($event.target.dataset.price.substring(1));
//             var num=$scope.cartData.indexOf(data);
//             var i=angular.element(document.getElementsByClassName('i'));
//             $scope.allPrice+=$scope.price*parseFloat(i[num].innerHTML.substring(1));
//             myfactory.allPrice=$scope.allPrice;
//
//         }else{
//             $scope.price=parseFloat($event.target.dataset.price.substring(1));
//             $scope.num=$event.target.dataset.num;
//             var num=$scope.cartData.indexOf(data);
//             var i=angular.element(document.getElementsByClassName('i'));
//             $scope.allPrice=$scope.allPrice-$scope.price*parseFloat(i[num].innerHTML.substring(1));
//             myfactory.allPrice=$scope.allPrice;
//           angular.forEach(angular.element(document.getElementsByClassName('checks')),function (data,index,array) {
//                 if(datas){
//                     if(data.checked){
//                         $scope.isDisabled =false;
//                         datas=false;
//                     }else {
//                         $scope.isDisabled = true;
//                     }
//                 }
//             });
//         }
//     };
//     $scope.allSelect=function ($event) {
//         if($event.target.checked == true ){
//           $cordovaVibration.vibrate(1000);
//             $scope.allPrice=0;
//             angular.forEach(angular.element(document.getElementsByClassName('checks')),function (data,index) {
//                 data.checked=true;
//                 var i=angular.element(document.getElementsByClassName('i'));
//                 $scope.allPrice+=parseFloat(data.dataset.price.substring(1))*parseFloat(i[index].innerHTML.substring(1));
//             });
//             $scope.isDisabled =false;
//         }else{
//             angular.forEach(angular.element(document.getElementsByClassName('checks')),function (data) {
//                 data.checked=false;
//                 $scope.allPrice=0;
//             });
//             $scope.isDisabled =true;
//         }
//     };
//     $scope.order=function () {
//       myfactory.cartDatass.splice(0,myfactory.cartDatass.length);
//       angular.forEach(angular.element(document.getElementsByClassName('checks')),function (data,index,array) {
//         if(data.checked){
//           myfactory.cartDatass.push( data.dataset.mydata.replace(/"([^"]*)"/g,"$1").split(","));
//         }
//       });
//       $state.go('Order',{allPrice:$scope.allPrice});
//     };
//     $scope.$on('$ionicView.enter',function (p1, p2) {
//       $scope.allPrice=0;
//       angular.forEach(angular.element(document.getElementsByClassName('checks')),function (data,index,array) {
//         data.checked = false;
//       });
//     })
//
// });
//支付详情页面控制器
// app.controller('orderCtrl',function($scope,$state,$ionicHistory,myfactory,$stateParams) {
//     $scope.allPrices=$stateParams.allPrice;
//     $scope.cartDatass=myfactory.cartDatass;
//     $scope.site=function () {
//       $state.go('siteAll')
//     };
//     $scope.sites=myfactory.sites;
//     $scope.hui=function () {
//       $ionicHistory.goBack();
//     };
//     var sizeSet='';
//     $scope.offon=myfactory.offon;
//     $scope.keep=function () {
//       if($scope.offon == false){
//         angular.forEach(angular.element(document.getElementsByClassName('inputContent')),function (data) {
//           sizeSet+=data.value;
//           myfactory.keeps.splice(myfactory.index,1,sizeSet);
//         });
//         myfactory.offon=true;
//       }else{
//         angular.forEach(angular.element(document.getElementsByClassName('inputContent')),function (data) {
//           sizeSet+=data.value;
//         });
//         myfactory.keeps.push(sizeSet);
//       }
//
//     };
//     $scope.sitehtml=function () {
//       $state.go('site');
//     };
//     $scope.list1=myfactory.keeps;
//     $scope.hui=function () {
//       $ionicHistory.goBack();
//       angular.forEach(angular.element(document.getElementsByClassName('radios')),function (data,index,array) {
//            if(data.checked){
//              myfactory.sites=data.dataset.site;
//            }
//       })
//     };
//     $scope.onItemDelete = function(item) {
//       $scope.list1.splice( $scope.list1.indexOf(item), 1);
//     };
//     $scope.revise=function (index) {
//       myfactory.index=index;
//       myfactory.offon=false;
//       $state.go('site');
//
//     }
//
//
// });
//详细商品页面控制器
// app.controller('listCtrl',function ($rootScope,$scope,myfactory,$state,$ionicTabsDelegate,$ionicPopover,$ionicListDelegate,$timeout) {
//     $scope.values=1;
//     $scope.$on('values',function (p1, p2) {
//        $scope.values=p2;
//         myfactory.num=$scope.values;
//    });
//     $scope.$broadcast('values',$scope.values);
//     $ionicPopover.fromTemplateUrl("template/model.html",{
//        scope:$scope,
//        animation:'slide-in-up'
//    }).then(function (popover) {
//        $scope.popover=popover;
//    });
//    var nums=0;
//    $scope.openPopover=function ($evnet,num) {
//         nums=num;
//         $scope.popover.show($evnet);
//    };
//     $scope.closePopover = function() {
//         $scope.popover.hide();
//     };
//
//     $scope.views={
//         datas:myfactory.storage.getVal('datas'),
//         A:function () {
//              $rootScope.view=myfactory.storage.getVal('datas').details_assess.all.A;
//         },
//         B:function () {
//             $rootScope.view=myfactory.storage.getVal('datas').details_assess.all.B;
//         },
//        C:function () {
//             $rootScope.view=myfactory.storage.getVal('datas').details_assess.all.C;
//         },
//
//         cart_data:function (pic,title,price) {
//           if($scope.spec == undefined){
//             return;
//           }
//           if(nums == 1){
//             myfactory.cartData.push( [$scope.spec,pic,title,price,$scope.values]);
//           }else{
//             $scope.allPrice=0;
//             myfactory.cartDatass.splice(0,myfactory.cartDatass.length);
//             myfactory.cartDatass.push( [$scope.spec,pic,title,price,$scope.values]);
//             $scope.allPrice+=price.substring(1)*$scope.values
//             $state.go('Order',{allPrice:$scope.allPrice})
//           }
//           $scope.closePopover();
//         },
//         selects:function ($event) {
//             $scope.spec= $event.target.value;
//         }
//     };
//     $scope.goCart=function () {
//       $state.go('home.cart')
//     }
//     var datass=localStorage.getItem("a");
//     var b=angular.fromJson(datass);
//     $scope.views.datas=b;
// });

// app.controller('evaluateCtrl',function ($rootScope,$scope,myfactory,$state,$ionicTabsDelegate) {
//
//     $rootScope.view=[];
//     if($rootScope.q='0'){
//         $rootScope.all=myfactory.storage.getVal('datas').details_assess.all;
//         for(var i=0;i<$rootScope.all.A.length;i++){
//             $rootScope.view.push($rootScope.all.A[i]);
//             $rootScope.view.push($rootScope.all.B[i]);
//             $rootScope.view.push($rootScope.all.C[i]);
//         }
//
//     }
//
// });
