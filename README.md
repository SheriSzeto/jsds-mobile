# jsds-mobile
创建项目基本目录结构如下：
├── node_modules // 打包过程中依赖的包
├── package.json // 包含各种所需模块以及项目的配置信息
├── gulpfile.js // 打包配置文件
├── app // 打包之后最终部署到服务器上的文件（名称自定义）
├── src  // 资源文件（名称自定义）
    ├── components // 自定义全局组件
        ├── pageloading （如：页面切换loading）
        ...
    ├── pages // 页面路由组件
        ├── index
            ├── index.jade 默认路由视图
            ├── product.js 默认路由控制器
            └── index.config.js 默认视图路由配置
        ├── blog
        ···
    ├── assets // 静态资源
        ├── images // 图片资源
    ├── app.router.js // 全局模块
    ├── index.jade // 入口视图模板
    └── index.less // 入口视图样式
└── vendor.config.js // 依赖的库配置文件（自定义）
