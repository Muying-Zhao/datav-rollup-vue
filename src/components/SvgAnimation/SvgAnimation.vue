<template>
    <div class="wrapper">
        <div class="container">
            <!-- transform="translate(10,0)向右偏移 rotate(30)旋转30度 skewX(30)倾斜斜切30 skewY(30) scale(.5)缩小.5倍 "-->
            <!-- <svg width="500" height="200" viewBox="0 0 500 200">
                <rect x="0" y="0" width="100" height="50" fill="red" transform="translate(10,50)  skewX(30)" ></rect>
            </svg> -->


            <!-- matrix -->
            <!-- 
                将原坐标点代入
                [2, -1, 50] ==> 2*_x+(-1)*_y+50=x 算出新x
                [1, 2, 0] ==> 1*_x+2*_y+0=y 算出新y
             -->
            <!-- <svg width="500" height="200" viewBox="0 0 500 200">
                    <rect x="0" y="0" 
                    width="100" height="50" fill="red" 
                    transform="matrix(2 1 -1 2 50 0)" ></rect>
                </svg> -->


            <!-- svg 动画 -->
            <!-- fill="transparent" -->
            <!-- <svg width="440" height="440" viewBox="0 0 440 440">
                
                <circle cx="220" cy="220" r="200" stroke-width="20" stroke="#d1d3d7" fill="none"></circle>
                <circle class="circle" cx="220" cy="220" r="200" stroke-width="20" stroke="#00a5e0" fill="none"
                transform="matrix(0 -1 1 0 0 440)"></circle>
            </svg> -->

            <!-- svg logo描边动画 -->
            <!-- 通过logo.getTotalLength()能算出长度 -->
            <!-- <svg viewBox="0 0 1024 1024" version="1.1" width="200" height="200">
                <path class="logo" d="M766.492701 468.808534c-44.584739 68.326113-124.725808 106.780451-218.35376 119.598563 4.458474 25.636225 0 63.979101 22.292369 102.433439 44.584739 81.144226 80.252531 170.871013 93.516491 234.961576 75.794057 29.871775 231.729183-42.689888 276.20246-136.652226 49.043213-102.5449 0-205.089801-80.141069-213.560902s-124.725808 34.107326-115.80886 81.144226 53.390225 46.925438 102.433438 17.053663 93.516491 34.218787 40.126266 59.855012-133.754218 46.925438-178.338958-4.347012c-49.043213-51.27245-44.584739-234.850114 151.476652-217.796451S1047.042174 780.232938 984.735 861.711549C922.316365 955.673887 846.63377 1024 624.490307 1024H267.812392c-89.169479 0-26.750844-179.342114 53.390226-328.812452 22.29237-42.80135 17.833896-76.908675 22.292369-102.544901-97.974965-13.041036-178.338957-51.27245-218.465222-119.598563H67.181065a27.419615 27.419615 0 0 1-22.292369-25.636225 20.620442 20.620442 0 0 1 22.292369-21.400675h35.667792a121.270491 121.270491 0 0 1-8.916948-42.689888H22.596326a21.400675 21.400675 0 1 1 0-42.689888h66.877109a224.372701 224.372701 0 0 1 44.584739-140.999238V28.868619c0-21.400675 17.833896-34.218787 40.126266-25.636225L374.481381 89.169479A427.902035 427.902035 0 0 1 446.15135 84.376619 354.894525 354.894525 0 0 1 513.028458 89.169479L713.659785 3.789703c22.29237-8.582562 40.126265 0 40.126266 25.636225v170.202242a243.989986 243.989986 0 0 1 44.584739 140.999238h66.877109c17.833896 0 26.750844 8.582562 26.750844 21.400675a20.620442 20.620442 0 0 1-22.29237 21.289213h-71.335583c-4.458474 17.165125-4.458474 29.871775-8.916948 42.689888H825.121634a21.400675 21.400675 0 1 1 0 42.80135z" fill="#658FFF" p-id="902"></path>
            </svg> -->

            <!-- SMl动画 -->
            <!-- demo1  set标签 -->
            <!-- <svg width="200" height="200">
                <rect x="0" y="0" fill="red" width="100" height="50">
                    <set attributeName="x" attributeType="XML" to="10" begin="1s"></set>
                    <set attributeName="fill" attributeType="XML" to="blue" begin="3s"></set>
                </rect>
            </svg> -->

            <!-- demo2 animate标签-->
            <!-- freeze表示动画结束后在最终形态 ，remove回归原位 repeatCount="indefinite"重复次数-->
            <!-- <svg width="200" height="200">
                    <circle cx="0" cy="0" r="30" fill="blue" stroke="black" stroke-width="1">
                        <animate 
                        attributeName="cx" attributeType="XML" 
                        from="0" to="100" 
                        dur="5s" repeatCount="indefinite" 
                        fill="freeze"></animate>
                    </circle>
            </svg> -->

            <!-- demo3 形状补间动画-->
            <!-- <svg width="400" height="400">
                <polygon points="30 30 70 30 90 70 10 70" fill="#fcc" stroke="black">
                    <animate attributeName="points" attributeType="XML" to="50 30 70 50 50 90 30 50" dur="5s" fill="freeze"
                        repeatCount="1" />
                </polygon>
            </svg> -->

             <!-- demo4 animateTransform标签-->
                <!-- <svg width="200" height="200">
                    <circle cx="0" cy="0" r="30" fill="blue" stroke="black" stroke-width="1">
                        <animateTransform
                        attributeName="transform" attributeType="XML" 
                        type="scale"
                        begin="0"
                        from="1" to="2" 
                        dur="3s" repeatCount="2" 
                        fill="freeze"></animateTransform>
                    </circle>
                </svg> -->


            <!-- 轨迹动画 -->
            <svg width="200" height="200">
                <rect x="0" y="0" fill="red" width="10" height="10">
                    <!-- M起点（10 10）L是描点后连线，Z是可以回到起点位置，无Z表示运动到最后一点的位置 -->
                    <animateMotion 
                     id="forward-rect"
                      path="M10 10 L110 10 L110 110 L10 110"
                      dur="3s"
                      rotate="0"
                      fill="freeze"
                       begin="0;backward-rect.end+0.5s"
                    ></animateMotion>
                    <animateMotion 
                         id="backward-rect"
                          path="M10 110 L110 110 L110 10 L10 10 "
                          dur="3s"
                          rotate="0"
                          fill="freeze"
                          begin="forward-rect.end+0.5s"
                        ></animateMotion>
                            <animate
                                 id="red-to-blue"
                                 attributeName="fill" 
                                 attributeType="XML"
                                 form="red"
                                  to="blue"
                                  dur="3s"
                                  fill="freeze"
                                  begin="0;blue-to-red.end+0.5s"
                             ></animate>
                            <animate
                                 id="blue-to-red"
                                 attributeName="fill" 
                                 attributeType="XML"
                                 form="blue"
                                  to="red"
                                  dur="3s"
                                  fill="freeze"
                                  begin="red-to-blue.end+0.5s"
                                ></animate>
                </rect>
                 <!-- M起点（10 10）L是描点后连线，Z是可以连接起始位置，无Z表示无法与起始点相尾连接 -->
                <path d="M10 10 L110 10 L110 110 L10 110" fill="none" stroke="green"></path>
            </svg>

            <!-- flyBox蒙版 -->
            <!-- 蒙版 -->
            <!-- orange与blue颜色相融合 -->
            <!-- <svg width="400" height="400">
                <defs>
                    <mask id="test-mask">
                        <rect x="5" y="5" width="390" height="100" fill="orange"></rect>
                    </mask>
                </defs>
                <rect x="5" y="5" width="390" height="390" fill="red"></rect>
                <rect x="5" y="5" width="390" height="390" fill="blue"
                  mask="url(#test-mask)"></rect>
            </svg> -->

            <!-- flybox渐变色 -->
            <!-- <svg width="400" height="400">
                <defs>
                    <mask id="test-mask">
                        <rect x="5" y="5" width="390" height="390" fill="red"></rect>
                    </mask>
                    <linearGradient id="test-linear-gradient">
                        <stop offset="0%" stop-color="red"></stop>
                        <stop offset="50%" stop-color="green"></stop>
                        <stop offset="100%" stop-color="blue" stop-opacity=".5"></stop>
                    </linearGradient>
                    <radialGradient 
                    id="test-radial-gradient" 
                    r="50%"
                    cx="50%"
                    cy="50%"
                    fx="25%"
                    fy="75%"
                    >
                        <stop offset="0%" stop-color="red"></stop>
                        <stop offset="50%" stop-color="green"></stop>
                        <stop offset="100%" stop-color="blue" stop-opacity=".5"></stop>
                    </radialGradient>
                </defs>
                <circle cx="200" cy="200" r="200" fill="url(#test-radial-gradient)"></circle>
                <rect x="5" y="5" width="390" height="390" fill="url(#test-radial-gradient)"></rect>
            </svg> -->
        </div>
    </div>
</template>

<script>
// import { onMounted } from 'vue';
export default {
    name: 'SvgAnimation',
    setup() {
        // onMounted(()=>{
        //     // console.log('1')
        //     const logo =document.getElementsByClassName('logo')[0]
        //     console.log(logo.getTotalLength(),'22')
        // })
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    align-content: center;
    justify-content: center;
}

.container {
    border: 1px solid #000;
}

@keyframes cir {

    // 圆1257周长
    from {
        stroke-dasharray: 0 1257;
    }

    to {
        stroke-dasharray: 1257 0;
    }
}

.circle {
    animation: cir 5s linear infinite;
}

.logo {
    fill: none;
    stroke-width: 5;
    animation: logo 6s linear forwards;
}

@keyframes logo {

    //forwards使动画停留最后状态
    0% {
        fill: white;
        stroke: #000;
        stroke-dasharray: 6289;
        stroke-dashoffset: 6289;
    }

    50% {
        fill: #f5f5f5;
        stroke: #000;
        stroke-dasharray: 6289;
        stroke-dashoffset: 0;
    }

    70% {
        fill: green;
        stroke: #ffffff;
        stroke-dasharray: 6289;
        stroke-dashoffset: 0;
    }

    100% {
        fill: aqua;
        stroke: #ffffff;
        stroke-dasharray: 6289;
        stroke-dashoffset: 0;
    }
}</style>
