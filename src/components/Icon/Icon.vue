<template>
    <div class="icon-wrapper" :style="{ ...style }">
        <svg class="icon" >
            <use :href="iconName"></use>
        </svg>
    </div>
</template>

<script>
export default {
    name: 'Icon',
    props: {
        name: String,
        prefix: {
            type: String,
            default: 'icon-'
        },
        style: Object
    },
    setup(ctx) {
        const iconName = `#${ctx.prefix}${ctx.name}`
        return { iconName }
    }
}
</script>

<style lang="scss" scoped>
.icon {
    width: 100%;
    height: 100%;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
.icon-wrapper{
    display: inline-block;
}
</style>


<!-- 在大屏项目中引用svg组件时 -->
  <!-- 两种修改icon样式方式 -->
  <!--class="set"或者 :style="{width:50+'px',height:50+'px',color:'pink'}" -->
<!-- <svg-demo></svg-demo>
<Icon prefix="icon-" class="set" name="shezhi1" ></Icon> -->

<!-- .set{
  color: orange;
  width: 50px;
  height: 50px;
} -->