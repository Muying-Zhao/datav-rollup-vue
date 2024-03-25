<template>
    <div class="test">
        <!-- viewBox 可以实现图标的自适应-->
        <!-- perserveAspectRatio调整viewBox宽高比不同时的位置 perserveAspectRatio="xMidYMid meet" xMinYMid或者xMaxYMid-->
        <!-- meet:保持宽高比并将viewBox缩放为适合viewport的大小 -->
        <!-- slice:保持宽高比并将所有不在viewport中的vievBox剪裁掉 -->
        <!-- none:不保存宽高比。缩放图像适合整个viewbox，可能会发生图像变形 -->
        <!-- <svg width="20px" height="20px" viewBox="0 0 100 100 " >
            <line x1="0" y1="0" x2="100" y2="100" stroke-width="8" stroke="currentColor"></line>
        </svg> -->


        <!-- 应用svg -->
        <svg width="0" height="0">
            <defs>
                <symbol id="more" viewBox="0 0 100 100">
                    <circle r="5" cx="20" cy="25" fill="currentColor"/>
                    <circle r="5" cx="20" cy="50" fill="currentColor"/>
                    <circle r="5" cx="20" cy="70" fill="currentColor"/>
                    <line x1="40" y1="25" x2="90" y2="25" stroke-width="8" stroke="currentColor" />
                    <line x1="40" y1="50" x2="90" y2="50" stroke-width="8" stroke="currentColor" />
                    <line x1="40" y1="75" x2="90" y2="75" stroke-width="8" stroke="currentColor" />
                </symbol>
            </defs>
        </svg> 
    </div>
</template>

<script>
export default {
    name: 'SvgDemo',
    setup() {
        
    }
}
</script>

<style lang="scss" scoped>
.test{
    color: blue;
}
</style>
