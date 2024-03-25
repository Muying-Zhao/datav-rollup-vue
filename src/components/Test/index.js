// 打印为undefined
// import { random,a,b } from './plugin'

// console.log(a,b,random,'ye')
// export default random

// 为用export const a=1这种写法时显示的方法
// import * as data from './plugin'

// console.log(data.default.random, 'ye')
// export default data.default.random

//最终使用tree。shaking打包效果
// import {random} from './plugin'

// console.log(random(), 'ye')
// export default random

// import {random} from 'sam-test-data'

// console.log(random(60), 'ye')
// export default random
// import pkg from '../package.json';
// console.log(pkg,'pkg')
// const c=()=>{
//     return 3
// }
// export default c

import Test from './Test.vue'

export default function (Vue) {
    Vue.component(Test.name, Test)
}
