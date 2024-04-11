<template>
    <div class="echarts">{{mumu}}</div>
</template>

<script>
import { watch,onMounted } from 'vue'
import Echarts from 'echarts'
export default {
    name: 'VueEcharts',
    props:{
        options:Object,
        mumu:String
    },
    setup(props) {
        let dom
        let chart
        const initChart=()=>{
            if(!chart){
                dom = document.getElementsByClassName('echarts')[0]
                // console.log(dom,'dom')
                chart = Echarts.init(dom)
            }
            chart && chart.setOption(props.options)
        }
        onMounted(()=>{
            initChart()
        })
        watch(()=>props.options,()=>{
            initChart()
        })
    }
}
</script>

<style lang="scss" scoped>
.echarts{
    width: 100%;
    height: 100%;
}
</style>
