import Vue from "vue";

const requireComponents = require.context('./', false, /\.vue/);
/*requireComponents:
webpackContext(req) {
    var id = webpackContextResolve(req);
    return __webpack_require__(id);
}
*/
// 遍历出每个组件的路径
requireComponents.keys().forEach(fileName => {
    // 组件实例
    const reqCom = requireComponents(fileName)
    // 截取路径作为组件名
    const reqComName = fileName.split('/')[1]
    console.log(reqComName)
    // 组件挂载
    Vue.component(reqComName.split(".")[0], reqCom.default || reqCom)
})