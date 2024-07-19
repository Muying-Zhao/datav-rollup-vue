// 组件库按需加载
import Test from './components/Test/index'
import Test2 from './components/Test2/index'
import SvgDemo from './components/SvgDemo/index' //svg画图
import Icon from './components/Icon/index' //自定义svg组件
import SvgAnimation from './components/SvgAnimation/index' //自定义svg组件
import Loading from './components/Loading/index'
import FlyBox from './components/FlyBox/index'
import Container from './components/Container/index'
import ThreeDimensions from './components/ThreeDimensions/index'
import Logo from './components/Logo/index'
import CountTo from './components/CountTo/index'
import BaseScrollList from './components/BaseScrollList/index'
import BoxInner from './components/BoxInner/index'
// import VueEcharts from './components/VueEcharts/index'
export default function (Vue) {
    Vue.use(Test)
    Vue.use(Test2)
    Vue.use(SvgDemo)
    Vue.use(Icon)
    Vue.use(SvgAnimation)
    Vue.use(Loading)
    Vue.use(FlyBox)
    Vue.use(Container)
    Vue.use(ThreeDimensions)
    Vue.use(Logo)
    Vue.use(CountTo)
    Vue.use(BaseScrollList)
    Vue.use(BoxInner)
    // Vue.use(VueEcharts)
}
