<template>
    <div class="wrapper">
        <svg :width="width" :height="height" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
            <!-- dasharry计算 2πr/4 -->
            <!-- stroke-linecap="round"使线边缘角位置为圆 -->
            <circle
             cx="25"
             cy="25"
             r="22"
             fill="none"
             stroke-width="3"
             :stroke="outSideColor"
             stroke-dasharray="34"
             stroke-linecap="round"
            >
            <!-- from="0 25 25"当为三个参数时， （25,25）为中心点 -->
            <!-- from和to可以合并写成values="360 25 25;0 25 25" -->
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                :dur="`${duration}s`"
                repeatCount="indefinite"
              />
              <!-- values="#3be6cb;#02bcfe;#3be6cb" -->
              <animate
               attributeName="stroke"
               :values="outSideColorAnimation"
               :dur="`${+duration*2}s`"
               repeatCount="indefinite"
              ></animate>
            </circle>
            <circle
             cx="25"
             cy="25"
             r="12"
             fill="none"
             stroke-width="3"
             :stroke="inSideColor"
             stroke-linecap="round"
             stroke-dasharray="19"
            >
              <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="360 25 25"
                    to="0 25 25"
                    :dur="`${duration}s`"
                    repeatCount="indefinite"
                  />
                <animate
                   attributeName="stroke"
                   :values="inSideColorAnimation"
                   :dur="`${+duration * 2}s`"
                   repeatCount="indefinite"
                  ></animate>
            </circle>
        </svg>
        <div class="loading-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
export default {
    name: 'Loading',
    props: {
        width:{
            type:[Number,String],
            default: 50
        },
        height: {
            type: [Number, String],
            default: 50
        },
        outSideColor:{
            type:String,
            default:'#3be6cb'
        },
        inSideColor: {
            type: String,
            default: '#02bcfe'
        },
        duration:{
            type:Number,
            default:2
        }
    },
    setup(ctx) {
        const outSideColorAnimation= computed(()=>
            `${ctx.outSideColor};${ctx.inSideColor};${ctx.outSideColor}`
        )
        const inSideColorAnimation = computed(() =>
            `${ctx.inSideColor};${ctx.outSideColor};${ctx.inSideColor}`
        )
        return {
            outSideColorAnimation, inSideColorAnimation
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>
