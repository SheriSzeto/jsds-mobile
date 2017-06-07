/**
 * Created by went on 2017-5-25.
 */
var mongoose=require('mongoose');
var Schema = mongoose.Schema;
//查询项目信息
var _Product = new Schema({
    img:String,
    name:String,
    part:String,
    account:Number,
    originprice:Number,
    newprice:Number,
    period:Number
});
//保存下单用户信息
var userSchema = new Schema({
    name:String,
    gender:Number,  //0 男 1 女
    phone:Number,
    address:String,
    ordertime:Number
});
//保存订单信息
var orderSchema = new Schema({
    phone:Number,
    orders:String
});

exports.Product= mongoose.model('Product',_Product);
exports.User = mongoose.model('User',userSchema);
exports.Order = mongoose.model('Order',orderSchema);