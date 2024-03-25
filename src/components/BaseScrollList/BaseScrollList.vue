<template>
    <div class="base-scroll-list" :id="id">
        <div class="base-scroll-list-header" :style="{
            backgroundColor: actualConfig.headerBg,
            height: `${actualConfig.headerHeight}px`,
            fontSize: `${actualConfig.headerFontSize}px`,
            color: actualConfig.headerColor
        }">
            <div class="header-item base-scroll-list-text" v-for="(headerItem, i) in headerData" :key="headerItem + i"
                :style="{
                    width: `${columnWidths[i]}px`,
                    ...headerStyle[i],
                }" v-html="headerItem" :align="aligns[i]"></div>
        </div>
        <div class="base-scroll-list-rows-wrapper"
         :style="{height:`${height-actualConfig.headerHeight}px`}"
        >
            <div class="base-scroll-list-rows" 
              v-for="(rowData, index) in currentRowData" :key="rowData.rowIndex" :style="{
                height: `${rowHeights[index]}px`,
                lineHeight: `${rowHeights[index]}px`,
                backgroundColor: rowData.rowIndex % 2 === 0 ? rowBg[1] : rowBg[0],
                fontSize: `${actualConfig.rowFontSize}px`,
                color: actualConfig.rowColor
            }">
                <div class="base-scroll-list-columns base-scroll-list-text" 
                   v-for="(colData, colIndex) in rowData.data" :key="colData + colIndex"
                    :style="{
                        width: `${columnWidths[colIndex]}px`,
                        ...rowStyle[colIndex]
                    }" v-html="colData" :align="aligns[colIndex]"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {watch, onMounted, ref } from 'vue'
import useScreen from '../../hooks/useScreen'
import cloneDeep from 'lodash/cloneDeep'
import assign from 'lodash/assign'

const defaultConfig = {
    // 标题数据，格式：['a','b','c']
    headerData: [],
    // 标题样式，格式：[{},{},{}]
    headerStyle: [],
    // 行样式
    rowStyle: [],
    // 行背景色
    rowBg: [],
    // 标题背景色
    headerBg: '#595959',
    // 标题的高度
    headerHeight: 35,
    //  标题是否展示序号
    headerIndex: false,
    // 序号列标题内容
    headerIndexContent: '#',
    // 序号列标题的样式
    headerIndexStyle: {
        width: '50px'
    },
    // 序号列的数据内容
    headerIndexData:[],
    // 序号列内容的样式
    rowIndexStyle: {
        width: '50px'
    },
    // 数据项，二维数组
    data: [],
    // 每页显示数据量
    rowNum: 0,
    // 句子方式
    aligns: [],
    headerFontSize: 28,
    rowFontSize: 28,
    headerColor: '#fff',
    rowColor: '#000',
    // 移动的位置
    moveNum: 1,
    duration: 5000//动画间隔时间
}

export default {
    name: 'BaseScrollList',
    props: {
        config: {
            type: Object,
            default: () => ({})
        },
    },
    setup(props) {
        // const id=`base-scroll-list-${uuidv4()}`
        const id = `base-scroll-list-top`
        const { width, height } = useScreen(id)
        const actualConfig = ref([])
        const headerData = ref([])
        const headerStyle = ref([])
        const rowStyle = ref([])
        const columnWidths = ref([])
        const rowHeights = ref([])
        const rowsData = ref([])
        const currentRowData = ref([])
        const currentIndex = ref(0)
        const rowBg = ref([])
        const rowNum = ref(defaultConfig.rowNum)
        const aligns = ref([])
        const isAnimationStart=ref(true)

        let avgHeight //行高

        const handleHeader = (config) => {
            // console.log(props.config)
            // 外部组件引用深拷贝
            const _headerData = cloneDeep(config.headerData)
            const _headerStyle = cloneDeep(config.headerStyle)
            const _rowStyle = cloneDeep(config.rowStyle)
            const _rowsData = cloneDeep(config.data)
            const _aligns = cloneDeep(config.aligns)
            // console.log(headerData, headerData===props.header,'headerData')
            if (_headerData.length === 0) {
                return
            }
            if (config.headerIndex) {
                _headerData.unshift(config.headerIndexContent)
                _headerStyle.unshift(config.headerIndexStyle)
                _rowStyle.unshift(config.rowIndexStyle)
                _rowsData.forEach((rows, index) => {
                    // 处理序号列的数据
                    if(config.headerIndexData && config.headerIndexData.length>0 &&config.headerIndexData[index]){
                        rows.unshift(config.headerIndexData[index])
                    }else{
                        rows.unshift(index + 1)
                    }
                });
                _aligns.unshift('center')
            }

            // 动态计算header中每一列的宽度
            let usedWidth = 0
            let usedColumnNum = 0
            // 判断是否自定义width
            _headerStyle.forEach(style => {
                // 如果是自定义width，则按照自定义width进行判断进行渲染
                if (style.width) {
                    // console.log(+style.width.replace('px', ''))
                    usedWidth += +style.width.replace('px', '')
                    usedColumnNum++
                }
            })
            // 动态计算列宽度,使用剩余的宽度除以剩余的列数
            const avgWidth = (width.value - usedWidth) / (_headerData.length - usedColumnNum)
            const _columnWidth = new Array(_headerData.length).fill(avgWidth)

            // 判断是否自定义width
            _headerStyle.forEach((style, index) => {
                // 如果是自定义width，则按照自定义width进行判断进行渲染
                if (style.width) {
                    // console.log(+style.width.replace('px', ''))
                    const headerWidth = +style.width.replace('px', '')
                    _columnWidth[index] = headerWidth
                }
            })

            columnWidths.value = _columnWidth
            // console.log(columnWidths, 'columnWidths')
            headerData.value = _headerData
            headerStyle.value = _headerStyle
            rowStyle.value = _rowStyle

            const {rowNum}=config
            if(_rowsData.length>=rowNum && _rowsData.length<rowNum*2){
                const newRowData=[..._rowsData,..._rowsData]
                rowsData.value = newRowData.map((item, index) => ({
                    data: item,
                    rowIndex: index
                }))
            }else{
                 rowsData.value = _rowsData.map((item, index) => ({
                    data: item,
                    rowIndex: index
                }))
            }
           
            aligns.value = _aligns
        }

        const handleRows = (config) => {
            // console.log(config)
            // 动态计算每行数据的高度
            const { headerHeight } = config
            rowNum.value = config.rowNum
            const unusedHeight = height.value - headerHeight
            // console.log(unusedHeight,'unusedHeight')
            // 如果rowNum大于实际数据长度，则以实际长度数据为准
            if (rowNum.value > rowsData.value.length) {
                rowNum.value = rowsData.value.length
            }
            avgHeight = unusedHeight / rowNum.value
            // console.log(avgHeight,'avgHeight')
            rowHeights.value = new Array(rowNum.value).fill(avgHeight)
            // 获取行背景色
            if (config.rowBg) {
                rowBg.value = config.rowBg
            }
        }

        const startAnimation = async () => {
            if(!isAnimationStart)return
            const config = actualConfig.value
            const { rowNum, moveNum, duration } = config
            const totalLength = rowsData.value.length
            if (totalLength < rowNum) return
            const index = currentIndex.value
            const _rowsData = cloneDeep(rowsData.value)
            // 将数据重新头尾连接
            // [a,b,c]=>[b,c,a]
            const rows = _rowsData.slice(index)
            rows.push(..._rowsData.slice(0, index))
            currentRowData.value = rows
            // 先将所有行高度还原
            rowHeights.value=new Array(totalLength).fill(avgHeight)
            const waitTime=2000
            await new Promise(resolve=>setTimeout(resolve, waitTime))
            // 将moveNum的行高度设置为0
            rowHeights.value.splice(0,moveNum,...new Array(moveNum).fill(0))


            currentIndex.value += moveNum
            // 是否到达最后一组数据
            const isLast=currentIndex.value-totalLength
            if(isLast>=0){
                currentIndex.value=isLast
            }
            if (!isAnimationStart) return
            await new Promise(resolve => setTimeout(resolve, duration- waitTime))
            await startAnimation()
        }

        const stopAnimation=()=>{
            isAnimationStart.value=false
        }

        const update=()=>{
            stopAnimation()
            // assign方法将两个对象进行合并props.config后一个覆盖前一个的值
            const _actualConfig = assign(defaultConfig, props.config)
            // console.log(_actualConfig, '_actualConfig')
            rowsData.value = _actualConfig.data || []
            handleHeader(_actualConfig)
            handleRows(_actualConfig)
            actualConfig.value = _actualConfig
            isAnimationStart.value=true
            startAnimation()
        }

        watch(() => props.config,()=>{
            update()
        })
        return {
            id, headerData, rowStyle, rowBg, headerStyle, columnWidths, rowsData, rowHeights
            , aligns, actualConfig, currentRowData,height
        }
    }
}
</script>

<style lang="scss" scoped>
.base-scroll-list {
    width: 100%;
    height: 100%;

    .base-scroll-list-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
    }

    .base-scroll-list-header {
        display: flex;
        font-size: 15px;
        align-items: center;
    }

    .base-scroll-list-rows-wrapper {
        overflow: hidden;
        .base-scroll-list-rows {
            display: flex;
            align-items: center;
            transition: all 0.3s linear;
            .base-scroll-list-columns{
                height: 100%;
            }
        }
    }
}
</style>
