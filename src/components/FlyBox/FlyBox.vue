<template>
    <div class="wrapper" ref="wrapper">
        <svg :width="width" :height="height">
            <defs>
                <path :id="pathId" :d="path" fill="none"></path>
                <!-- fx="100%"决定光源的起始位置 -->
                <radialGradient :id="radialGradientId" r="50%" cx="50%" cy="50%" fx="100%" fy="50%">
                    <stop offset="0%" stop-color="#fff" stop-opacoty="1"></stop>
                    <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
                </radialGradient>
                <!-- 蒙版 -->
                <mask :id="maskId">
                    <circle :r="starLength" cx="0" cy="0" :fill="` url(#${ radialGradientId })`">
                        <animateMotion :dur="`${duration}s`" :path="path" rotate="auto" repeatCount="indefinite"></animateMotion>
                    </circle>
                </mask>
            </defs>
            <use :href="`#${pathId}`" stroke-width="1" :stroke="lineColor"></use>
            <use :href="`#${pathId}`" stroke-width="3" :stroke="starColor" :mask="`url(#${maskId})`"></use>
        </svg>
        <div class="fly-box-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
// import { v4 as uuidv4 } from 'uuid';
export default {
    name: 'FlyBox',
    props: {
        lineColor:{
            type:String,
            default:'#235fa7'
        },
        starColor:{
            type:String,
            default:'#4fd2dd'
        },
        starLength:{
            type:[String,Number],
            default:50
        },
        duration:{
            type: [String, Number],
            default: 3
        }
    },
    setup() {
        // uuidv4();
        const width = ref(0)
        const height = ref(0)
        // const refName = 'wrapper'
        const wrapper = ref(null)
        const pathId=`wrapper-path-id`
        const radialGradientId= `wrapper-gradient-id`
        const maskId= `wrapper-mask-id`
        const path = computed(() =>
            `M 5 5 L ${width.value - 15} 5 L ${width.value - 15} ${height.value - 5} L 5 ${height.value - 5} Z`
        )

        const init = () => {
            if(wrapper.value){
                // const instance = getCurrentInstance()
                // const dom = instance.ctx.$refs[refName]
                const dom = wrapper.value
                // console.log(dom,'dom')
                width.value = dom.clientWidth
                height.value = dom.clientHeight
            }
        }

        onMounted(() => {
            init()
        })

        // console.log(path, 'path')
        return {
            width, height, path, pathId, radialGradientId, maskId, wrapper
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .fly-box-content {
        width: 100%;
        height: 100%;
        padding: 2px;
        box-sizing: border-box;
    }
}
</style>
