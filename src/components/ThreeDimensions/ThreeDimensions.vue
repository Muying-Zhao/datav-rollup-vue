<template>
    <div class="container">
        <div class="inner">
            <span class="item">小炑呀</span>
        </div>
        <div class="inner">
            <span>小炑呀</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ThreeDimensions'
}
</script>

<style lang="scss" scoped>
.container{
    display: flex;
    .inner{
        width: 400px;
        height: 200px;
        line-height: 200px;
        font-size: 4em;
        font-family: sans-serif;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        .item{
            letter-spacing: 10px;
        }
    }
    .inner:first-child{
        background-color: rgb(92,141,205);
        color: rgb(0,25,139);
        transform-origin: right;
        transform: perspective(100px) rotateY(-15deg);
    }
    .inner:last-child{
        background-color: rgb(121,170,235);
        color: rgb(255,255,255);
        transform-origin: left;
        transform: perspective(100px) rotateY(15deg);
    }
}
</style>
