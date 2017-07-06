app.factory('myfactory',['$http',function ($http) {
    var factory={};
    var storage={};
    factory.num=1;
    factory.allPrice=0;
    factory.offon=true;
    factory.index=0;
    factory.sites='';
    factory.keeps=[];
    factory.cartData=[];
    factory.cartDatass=[];
    factory.getPic=function(){
       return $http.get("src.json");
    }
    factory.getData=function(){
        return $http.get("details.json")
    }
    factory.storage={
        setVal:function(name,value){
             if(name && value){
                 storage[name]=value;
             }
        },
        getVal:function(name){
            if(!storage[name] || !name){
                return
            }
            return storage[name]
        }
    }

    return factory;
}]);
app.factory('picResize',function () {
  var imglist =document.getElementsByClassName('pics');
  var _width = window.screen.width;
  var _height = window.screen.height - 20;
  var _width = document.documentElement.clientWidth;
  var _height = document.documentElement.clientHeight - 20;
  var _width, height;
  function doDraw(){
    _width = window.innerWidth;
    _height = window.innerHeight - 20;
    for( var i = 0, len = imglist.length; i < len; i++){
      DrawImage(imglist[i],_width,_height);
    }
  }
  function DrawImage(ImgD,_width,_height){
    var image=new Image();
    image.src=ImgD.src;
    image.onload = function(){
      if(image.width>30 && image.height>30){

        if(image.width/image.height>= _width/_height){
          if(image.width>_width){
            ImgD.width=_width;
            ImgD.height=(image.height*_width)/image.width;
          }else{
            ImgD.width=image.width;
            ImgD.height=image.height;
          }
        }else{
          if(image.height>_height){
            ImgD.height=_height;
            ImgD.width=(image.width*_height)/image.height;
          }else{
            ImgD.width=image.width;
            ImgD.height=image.height;
          }
        }
      }
    }

  }
  return doDraw
})
