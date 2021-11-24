<!--
 * @version: v1.2.0
 * @Author: 范庆龙
 * @Date: 2021-08-18 13:03:19
 * @LastEditors: 范庆龙
 * @LastEditTime: 2021-08-20 23:17:56
--> 

##  一、 clone the project
http://git.kinfe.net/el-web-project/项目名
##  二、 使用 npm

#### install dependency

```
npm install
```
####  Compiles and hot-reloads for development
```
npm run serve
```
####  Compiles and minifies for production
```
npm run build
```

## 三、 使用 yarn
#### install dependency
```
yarn install
```

#### Compiles and hot-reloads for development
```
yarn run serve
```

#### Compiles and minifies for production
```
yarn run build
```
#### 四、项目结构
|-- public

|   |---------------- favicon.ico                  //网站图标

|   |---------------- index.html                   //入口页面

|--src

|   |---------------- api                          // 及所有调用接口的管理。
                                                     
                1、针对性创建文件。对应路由组件所需的接口。
                                                 
|   |---------------- assets                       // 静态文件，比如一些图片等。
               
               1、每个路由模块对应的静态资源。
                2、iconFont
               |  ||---------------- styles                       // 对应组件的css样式. 
                              
                              1、base样式。 
                              2、常用的公共样式函数。
               
               |   ||---------------- themes                       // 主题风格.
                             
                              1、风格切换。
                              2、全局引入。
                              3、主题类型设置。
               

|   |---------------- components                   // vue公共组件。
                
                1、如echarts图、
                2、自定义组件
                                                     

|   |---------------- directives                   // 自定义指令.
                         
                          1、 拖拽 
                          2、输入校验                            

|   |---------------- layouts                      // 整体布局组件
                                                        
               1、左侧和头部菜单
               2、tags标签页
               3、头部设置 (logo、拨打电话、搜索、消息提醒、个人设置、主题风格)
               4、内容区域
               5、团队模块                                         

|   |---------------- mock                         // 虚拟数据. 
                                                    

|   |---------------- mixins                       // vue的混入器 共享方法和数据状态.

|   |---------------- router                       // vue的路由管理 

|   |---------------- serve                        // axios二次封装主要针对公共参数、请求方式、请求格式的封装
                                                       
               1、上下文
               2、baseUrl
               3、是否全局引入

|   |---------------- store                        // vuex等公共数据管理  
               
               1、模块化管理
               2、针对性持久化。如sessionStorage、localStorage。。。
                                                      
|   |---------------- utils                        // 项目工具文件，如：格式化日期、xlsx、手机号、密码校验等.

|   |---------------- views                        // 以页面为单位的vue文件、html文件等
                
               1、所有路由组件。

|   |---------------- App.vue                      // 页面入口文件

|   |---------------- main.js                      // 程序入口文件，加载各种公共组件

|-- .babelrc                                       // babel  语法转化形式 ES6转ES5  组件按需加载

|--.eslintignore                                   // 隔离不监测语法错误的插件
              
              1、如遇到打包时插件语法报错可以直接忽略掉

|--.env.develop                                    // 开发环境

|--.env.test                                       // 测试环境

|--.env.production                                 // 生产环境

|-- babel.config.js                                // babel  语法转化形式 

|-- package.json                                   // 项目基本信息,包依赖信息等

|-- README.md                                      // 项目说明

|-- vue.config.js                                  //  服务配置、打包配置等


   
    注意：每个模块的入口文件最好以index开头。如：
    
        |----------------XXX                                     // 目录
                         index.(js|vue)                           入口文件
                         src                                      所有组件或插件
            
## 五、组件命名规范
  一、 单文件组件文件的大小写

     单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。
 #####反例
     components/
          |- mycomponent.vue
        
     components/
          |- myComponent.vue

 #####好例子
     components/
          |- MyComponent.vue
        
     components/
          |- my-component.vue

二、基础组件

    应用特定样式和约定的基础组件
 #####反例  
     components/
          |- MyButton.vue
          |- VueTable.vue
          |- Icon.vue 
 #####好例子
     components/
         |- BaseButton.vue
         |- BaseTable.vue
         |- BaseIcon.vue
      
二、单例组件
    
    拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性。
 #####反例     
     components/
        |- Heading.vue
        |- MySidebar.vue
 #####好例子
     components/
        |- TheHeading.vue
        |- TheSidebar.vue
三、耦合组件
  #####反例  
     components/
        |- TodoList.vue
        |- TodoItem.vue
        |- TodoButton.vue       
  #####好例子      
     components/
        |- TodoList.vue
        |- TodoListItem.vue
        |- TodoListItemButton.vue
        
四、自闭合组件
   
    在单文件组件、字符串模板和 JSX 中没有内容的组件应该是自闭合的——但在 DOM 模板里永远不要这样做。
  #####反例 
      <!-- 在单文件组件、字符串模板和 JSX 中 -->
      <MyComponent></MyComponent>
      
      <!-- 在 DOM 模板中 -->
      <my-component/>
  #####好例子      
      <!-- 在单文件组件、字符串模板和 JSX 中 -->
      <MyComponent/>
      
      <!-- 在 DOM 模板中 -->
      <my-component></my-component>

这样做的几个好处：

1、当你在编辑器中以字母顺序排序时，你应用的基础组件会全部列在一起，这样更容易识别。

2、因为组件名应该始终是多个单词，所以这样做可以避免你在包裹简单组件时随意选择前缀 (比如 MyButton、VueButton)。

3、因为这些组件会被频繁使用，所以你可能想把它们放到全局而不是在各处分别导入它们。使用相同的前缀可以让 webpack 这样工作：

    var requireComponent = require.context("./src", true, /Base[A-Z]\w+\.(vue|js)$/)
    requireComponent.keys().forEach(function (fileName) {
      var baseComponentConfig = requireComponent(fileName)
      baseComponentConfig = baseComponentConfig.default || baseComponentConfig
      var baseComponentName = baseComponentConfig.name || (
        fileName
          .replace(/^.+\//, '')
          .replace(/\.\w+$/, '')
      )
      Vue.component(baseComponentName, baseComponentConfig)
    })
