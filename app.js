/**
 * Created by went on 2017-5-24.
 */
var express = require('express'),
    ejs = require('ejs'),
    http = require('http'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    models = require('./server/models');

//连接mongo
mongoose.connect('mongodb://localhost:27017/jsds');
mongoose.connection.on('error',function(error){
    console.log('连接数据库失败'+error);
});
mongoose.connection.on('open',function(){
    console.log('数据库连接成功！！！');
});
//获取服务项目的接口
var Product  = models.Product;
//获取保存用户信息接口
var User = models.User;
//提交订单信息接口
var Order = models.Order;

var app=express();
app.set('port',process.env.PORT||3000);
app.set('views',__dirname+'/app');
app.engine('.html',ejs.__express);
app.set('view engine','html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));

//设置所有请求允许跨域
app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    if (req.method == 'OPTIONS') {
        res.send(200); /*让options请求快速返回*/
    }
    else {
        next();
    }
});
app.get('/', function(req, res){
     res.render('index', {title:'paint title'});
});

//获取所有项目
app.get('/getProduct',function(req,res){
    Product.find(function(err,doc){
        res.json(doc);
    });
});

//保存下单用户信息
app.post('/saveUserMsg',function(req,res){
    /*User.find(function(err,result){
        result.forEach(function(user){
            user.phone == req.body.phone
        })
    })*/
    new User({
        name:req.body.name,
        gender:req.body.gender,
        phone:req.body.phone,
        address:req.body.address,
        ordertime:req.body.ordertime
    }).save(function(err,user){
        if(err){
            res.send({success:false,errormsg:'提交信息失败'});
        }else{
            res.send({success:true,errormsg:'提交信息成功',result:user});
        }
    })
});

//修改下单用户信息
app.post('/updateUserMsg',function(req,res){
    User.update({_id:req.body._id},{
        name:req.body.name,
        gender:req.body.gender,
        phone:req.body.phone,
        address:req.body.address,
        ordertime:req.body.ordertime
    },function(err,user){
        if(err){
            res.send({success:false,errormsg:'修改信息失败'})
        }else{
            res.send({success:true,errormsg:'修改信息成功',result:user})
        }
    })
});

//根据登录用户查找是否存在该用户信息
app.post('/getUserMsg',function(req,res){
    User.find(function(err,result){
        if(err){
            res.send(err);
        }else{
            var i;
            result.find(function(value,index){
                if(value.phone == req.body.phone){
                    i=index;
                }

            });
            if(i==undefined||i==null){
                res.send({});
            }else{
                res.send(result[i]);
            }

        }
    })
});

// 保存订单
app.post('/submitOrder',function(req,res){
    new Order({
        phone:req.body.phone,
        orders:JSON.stringify(req.body.orders)
    }).save(function(err,order){
        if(err){
            res.send({success:false,errormsg:'保存订单失败'})
        }else{
            res.send({success:true,errormsg:'保存订单成功',result:JSON.parse(order.orders)})
        }
    })
});
// 查询订单
app.post('/queryOrders',function(req,res){
    Order.find(function(err,orders){
        if(err){
            res.send({success:false,errormsg:'查询订单失败'})
        }else{
            var arr=[];
            for(var i=0;i<orders.length;i++){
                if(orders[i].phone==req.body.phone){
                    arr.push(JSON.parse(orders[i].orders))
                }
            }

            res.send({success:true,errormsg:'查询订单成功',result:arr})


        }
    })
});

var server = http.createServer(app).listen(app.get('port'),function(){
    console.log('Express server listening on port'+app.get('port'));
});