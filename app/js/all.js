/**
 * Created by went on 2017-4-27.
 */
(function(){
    'use strict';

    document.addEventListener('DOMContentLoaded',function(){
        var html=document.documentElement;
        var windowWidth=html.clientWidth;
        html.style.fontSize=(windowWidth/7.2)+'px';
        console.log(html.style.fontSize);
    },false);


})();

/**
 * Created by went on 2017-4-26.
 */

'use strict';
var app = angular.module('app',['ui.router','ngDialog']);
app.run(function($rootScope,$state,$stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/product');
    $stateProvider
        .state('/product', {
            url: "/product",
            templateUrl: "pages/product/product.html"
        })
        .state('/cart', {
            url: "/cart",
            templateUrl: "pages/cart/cart.html"
        })
        .state('/user', {
            url: "/user",
            templateUrl: "pages/user/user.html"
        })
        .state('/booking', {
            url: "/booking",
            templateUrl: "pages/booking/booking.html"
        })
        .state('/orders', {
            url: "/orders",
            templateUrl: "pages/orders/orders.html"
        });
});




/**
 * Created by went on 2017-5-7.
 */

app.factory('$common',function($q){
        var commonService = {};
        //菜单配置
        commonService.getMenu = [
            {'name':'服务项目','img':'project','path':'/product',active:true},
            {'name':'购物车','img':'cart','path':'/cart',active:false},
            {'name':'我的订单','img':'myorder','path':'/user',active:false}
        ];

        //获取当前浏览器定位的地址
        commonService.getGPSPosition = function(){
            var deferred = $q.defer();
            var geolocation = new BMap.Geolocation();
            var geoc = new BMap.Geocoder();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    geoc.getLocation(r.point, function(rs){
                        var addComp = rs.addressComponents;
                        var gpsAddr = addComp.district + addComp.street;
                        deferred.resolve(gpsAddr);

                    });
                }
                else {
                    alert('failed'+this.getStatus());
                }
            },{enableHighAccuracy: true});

            return deferred.promise;
        };

        //获取登录验证码
        var code;
        commonService.createCode = function(){
            code="";
            var codeLength=4;//验证码的长度
            var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
            for(var i=0;i<codeLength;i++){
                var charNum = Math.floor(Math.random()*52);
                code+=codeChars[charNum];
            }
            return code;

        };


        return commonService;
    });


/**
 * Created by went on 2017-5-4.
 */

app.controller('indexCtrl',function($scope,$state,$common){
    $scope.menus = $common.getMenu;
    $scope.route = function(menu){
        $scope.menus.forEach(function(menu){
            menu.active = false;
        });
        menu.active = true;
        if(menu.name == '我的订单'){
            menu.path = sessionStorage.getItem('username')?'/orders':menu.path;
        }
        $state.go(menu.path);
    };


});



/**
 * Created by went on 2017-5-11.
 */
app.controller('bookingCtrl',function($scope){
        //默认用户性别为男的选中
        $scope.gender = 0;
        $scope.hasRead = true; //默认已阅读注意条例

        //定义服务时间初始化方法
        $scope.initTime = function(){
            var dates = [];
            var getDays = function(str,day_count,format){
                if(typeof str === "number"){
                    format = day_count;
                    day_count = str;
                    str = new Date();
                }
                var date = new Date(str);
                for(var i=0;i<=day_count;i++){
                    var d = null;
                    " "
                    if(!format){
                        var fmt = format;
                        fmt = fmt.replace(/y{4}/,date.getFullYear());
                        fmt = fmt.replace(/M{2}/,date.getMonth()+1);
                        fmt = fmt.replace(/d{2}/,date.getDate());
                        d = fmt;
                    }else{
                        if(parseInt(date.getMonth()+1)<10){
                            if(date.getDate()<10){
                                d = "0"+ parseInt(date.getMonth()+1) + "月"+"0"+date.getDate()+"日";
                            }else{
                                d = "0"+ parseInt(date.getMonth()+1) + "月" +date.getDate()+"日";
                            }
                        }else{
                            if(date.getDate()<10){
                                d =  parseInt(date.getMonth()+1) + "月"+"0"+date.getDate()+"日";
                            }else{
                                d =  parseInt(date.getMonth()+1) + "月" +date.getDate()+"日";
                            }
                        }


                    }
                    dates.push(d);
                    date.setDate(date.getDate()+1);
                }
                return dates;

            };
            var hour=[];
            for(var i=0;i<24;i++){
                var c=i<10?"0"+i+":00":i+":00";
                hour.push(c);
            }

            var wheels=[
                [
                    {values:getDays(30,"yyyy年MM月dd日"),label:"服务日期"}

                ],
                [
                    {values:hour,label:"服务时间"}
                ]
            ];

            var j=wheels[0][0].values[1];
            var k=wheels[1][0].values[1];
            console.log(j+","+k);


            $('#orderTime').mobiscroll().scroller({
                theme:'mobiscroll',
                display:'inline',
                lang:'zh',
                showLabel:true,
                rows:1,
                wheels:wheels,
                defaultValue:[j,k]

            });
        };

        //用户性别选择
        $scope.getSex = function(val){
            $scope.gender = val;
        };

        $scope.test = function(){
            if($scope.hasRead){
                $scope.hasRead = false;
            }else{
                $scope.hasRead = true;
            }
        }



        $scope.initTime();
    });



/**
 * Created by went on 2017-5-10.
 */

app.controller('cartCtrl',function($scope,$state){
    $scope.isExistServeMsg = false;

    //设置下单用户信息
    $scope.setMsg = function(){
        $state.go('/booking');
    };
});



/**
 * Created by went on 2017-5-15.
 */
app.controller('orderCtrl',function($scope,ngDialog){

    //获取用户订单
    $scope.orderList = [
        {
            name:'李师傅',
            orderdate:'2015-06-27',
            period:'10:00-11:00',
            totalprice:'66',
            orderstate:0
        },
        {
            name:'李师傅',
            orderdate:'2015-04-23',
            period:'10:00-11:00',
            totalprice:'66',
            orderstate:1
        }
    ];

    //联系客服
    $scope.contact = function(){
        ngDialog.open({
            template:'contact.html',
            className:'ngdialog-theme-default ngdialog-theme-dadao',
        })
    };
});
/**
 * Created by went on 2017-5-2.
 */
app.controller('productCtrl',function($scope,$common){
        //项目
        $scope.products = [
            {img:'img/p1.png',name:'健康沐足',part:'颈部-肩部-腿部',account:1668,originprice:88,newprice:66,period:60},
            {img:'img/p2.png',name:'91至尊沐足',part:'颈部-肩部-腿部',account:3204,originprice:128,newprice:108,period:60},
            {img:'img/p3.png',name:'办公室肩颈',part:'颈部-肩部-腿部',account:2103,originprice:128,newprice:108,period:60},
            {img:'img/p4.png',name:'亚健康推拿',part:'颈部-肩部-腿部',account:1345,originprice:88,newprice:66,period:60},
            {img:'img/p5.png',name:'91全身推拿',part:'颈部-肩部-腿部',account:1783,originprice:168,newprice:128,period:60},
            {img:'img/p6.png',name:'全身经络排毒',part:'颈部-肩部-腿部',account:1523,originprice:228,newprice:198,period:120},
            {img:'img/p7.png',name:'美颜排毒理疗',part:'颈部-肩部-腿部',account:1442,originprice:188,newprice:148,period:90}
        ];
        //获取当前浏览器的位置
        $scope.currentPosition = '正在定位...';
        $common.getGPSPosition().then(function(data){
            $scope.currentPosition = data;
        });

        //加入购物车
        $scope.addCart = function($event,product){
            if(product.disabled && product.disabled==true){
                return;
            }else{
                var ele = $event.target;
                var offset=$(".cart").offset();
                var addcar=$(ele);
                var img=addcar.parentsUntil("#main",".projectDetail").find(".pImg").attr("src");
                var flyer=$('<img class="u-flyer" src="'+img+'">');
                flyer.fly({
                    start: {
                        left: event.pageX, //开始位置（必填）#fly元素会被设置成position: fixed
                        top: event.pageY //开始位置（必填）
                    },
                    end: {
                        left: offset.left+10, //结束位置（必填）
                        top: offset.top+10, //结束位置（必填）
                        width: 0, //结束时宽度
                        height: 0 //结束时高度
                    },
                    onEnd: function(){ //结束回调
                        product.disabled = true;
                        addcar.css("cursor","not-allowed").addClass("haveAdd").html("已添加");
                        this.destory(); //移除dom
                    }
                });
            }

        };
});




/**
 * Created by went on 2017-5-11.
 */

app.controller('userCtrl',function($scope,$common,ngDialog,$state){

        $scope.form = {}; //保存表单提交的数据

        //切换验证码
        $scope.changeCode = function(){
            $scope.code = $common.createCode();
        };

        //登录
        $scope.login = function(valid){
            if(valid){
                $scope.form.smscode.toLowerCase() == $scope.code.toLowerCase()?$state.go('/orders'):
                    ngDialog.open({
                        template:'<p>验证码输入错误!</p>',
                        plain:true
                    });
            }
        };


        //获取验证码
        $scope.changeCode();
    });

