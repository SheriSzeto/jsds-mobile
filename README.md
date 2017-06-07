## jsds-mobile 静树大师上门理疗服务手机端下单项目
  项目是采取angularjs+express+mongodb+gulp的架构开发的，对于提高搭建前端框架的水平有很大的帮助 <br/>
  项目基本目录结构如下：<br/>
  --node_modules // 打包过程中依赖的包 <br/>
  --package.json // 包含各种所需模块以及项目的配置信息 <br/>
  --gulpfile.js // 打包配置文件<br/>
  --app // 打包之后最终部署到服务器上的文件（名称自定义）<br/>
  --src  // 资源文件（名称自定义）<br/>
      --components // 自定义全局组件<br/>
      --pages // 页面路由组件<br/>
        --product<br/>
        --product.html 获取项目页面<br/>
     ├── product.js    执行获取项目方法<br/>
     └── product.less  项目样式<br/>
    ├── cart<br/>
     ···
   ├── assets // 静态资源<br/>
    ├── img // 图片资源<br/>
    ├── less // 样式表<br/>
  ├── vendors // 第三方插件库<br/>
  ├── app.router.js // 全局路由配置<br/>
  ├── app.config.js // 配置信息<br/>
  ├── app.service.js // 公共函数<br/>
  ├── index.html // 入口视图模板<br/>
  └── index.less // 入口视图样式<br/>
  ├── server  // 后端文件<br/>
   ├── models  // 创建mongoose模型<br/>
  ├── app.js  // 后端入口文件<br/>
  └── vendor.config.js // 依赖的库配置文件（自定义）<br/>                
项目功能：主要分三块，服务项目，购物车，我的订单<br/>
1.服务项目是用户可以通过后台已经配置好的项目来进行选择加入购物车<br/>
2.在购物车中可以查看自己的项目，并且填写下单信息<br/>
3.在我的订单可以登录查看自己的订单<br/>
### 项目截图：<br/>
**1**. 选取服务项目<br/>
![](pics/1.png) <br/>
**2**. 查看购物车<br/>
![](pics/2.png) <br/>
**3**. 用户登录<br/>
![](pics/3.png) <br/>
**4**. 查看订单<br/>
![](pics/4.png)
        
        
