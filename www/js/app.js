    var app=angular.module('myApp', ['ionic' , 'ngCordova']);
    app.directive('cartnum',function () {
        return{
            restrict:'E',
            scope:false,
            template:'<div class="cartStyle">'
                                +'<input type="button" value="-" ng-click="add_minus.jian()"/>'
                                +'<input type="text"  value="{{values}}" name="values" disabled >'
                               + '<input type="button" value="+" ng-click="add_minus.jia()"/>'
                      +'</div>' ,
            replace:true,
            controller:function ($scope) {
                $scope.add_minus={
                  jian:function () {
                      if($scope.values == 1){
                          return;
                      }
                      $scope.values--;
                      // 向上传递商品数量的变化值
                      $scope.$emit('values',$scope.values);
                  },
                 jia:function () {
                     $scope.values++;
                     $scope.$emit('values',$scope.values);
                 }
                }
            }
        }
    })
    app.config(function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('left');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
        $ionicConfigProvider.backButton.text("");
        $ionicConfigProvider.backButton.previousTitleText(false);
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home',{
                url: '/home',
                templateUrl:"template/home.html",
                controller:'homeCtrl'
            })
             .state("home.slide",{
                 url:"/slide",
                 views:{
                     'home-page':{
                         templateUrl:"template/slide-box.html",
                         controller:'homeCtrl'
                     }
                 }
             })
            .state("home.cart",{
                url:"/cart",
                views:{
                    'home-cart':{
                        templateUrl:"template/shopping_cart.html",
                        controller:'shoppingCartCtrl'
                    }
                }
            })
            .state("home.myMember",{
                url:"/myMember",
                views:{
                    'home-myMember':{
                        templateUrl:"template/myMember.html",
                        controller:'homeCtrl'
                    }
                }
            })
            .state('list',{
                cache: false,
                url:'/list',
                templateUrl:'template/List.html',
                controller:'listCtrl'
            })
            .state('list.index',{
                url:'/index',
                views:{
                    'list-goods':{
                        templateUrl:'template/goods_index.html',
                        controller:'listCtrl'
                    }
                }
            })
            .state('list.arameter',{
                url:'/arameter',
                views:{
                    'list-goods':{
                        templateUrl:'template/goods_arameter.html'
                    }
                }

            })
            .state('list.details',{
                url:'/details',
                views:{
                    'list-goods':{
                        templateUrl:'template/goods_details.html'
                    }
                }

            })
            .state('list.assess',{
                url:'/assess',
                views:{
                    'list-goods':{
                        templateUrl:'template/goods_assess.html',
                        controller:'listCtrl'
                    }
                }

            })
            .state('list.assess.all',{
                url:'/all',
                views:{
                    'evaluate-page':{
                        templateUrl:'template/evaluate.html',
                        controller:'listCtrl'
                    }
                }
            })
            .state('list.assess.A',{
                url:'/A',
                views:{
                    'evaluate-pageA':{
                        templateUrl:'template/evaluate.html',
                        controller:'listCtrl'
                    }
                }
            })
            .state('list.assess.B',{
                url:'/B',
                views:{
                    'evaluate-pageB':{
                        templateUrl:'template/evaluate.html',
                        controller:'listCtrl'
                    }
                }
            })
            .state('list.assess.C',{
                url:'/C',
                views:{
                    'evaluate-pageC':{
                        templateUrl:'template/evaluate.html',
                        controller:'listCtrl'
                    }
                }
            })
          .state('Order',{
            cache:false,
            url:'/Order?allPrice',
                templateUrl:'template/Order.html',
                controller:'orderCtrl'
          })
          .state('siteAll',{
            url:'/siteAll',
            templateUrl:'template/siteAll.html',
            controller:'orderCtrl'
          })
          .state('site',{
            url:'/site',
            templateUrl:'template/site.html',
            controller:'orderCtrl'
          })

    });
    app.run(function ($state,$rootScope,$ionicPlatform) {
        $state.go('home');
    });

