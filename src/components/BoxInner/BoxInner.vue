<template>
    <div class="box" :style="{ ...boxstyle }">
        <div class="box-inner" :style="{ ...innerstyle }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BoxInner',
    props: {
        boxstyle: Object,
        innerstyle: Object
    }
}
</script>

<style lang="scss" scoped>
/* width height border border-radius*/
.box {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: '4px solid #0174f5';
    border-radius: 20px;

    /* width height border border-radius top left background-color*/
    .box-inner {
        position: absolute;
        /* top: 4px; */
        /* 与外层边框宽度相同 */
        /* left: 4px; */
        /* width: calc(100% - 8px); */
        /* 减去外层边框的总宽度 */
        /* height: calc(100% - 8px); */
        /* padding: 0; */
        /* 内层内边距 */
        /* background-color: #062a72; */
        /* 内层背景色 */
        /* border: 4px solid #016ae0; */
        /* border-radius: 4%; */
        /* 内层圆角，小于外层圆角以创建留白效果 */
        box-sizing: border-box;
        /* 确保内边距包含在宽度和高度内 */
    }
}
</style>
