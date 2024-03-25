<template>
    <div class="test">
        <div>message:{{ message }}</div>
    </div>
</template>

<script>
export default {
    name: 'TestComponent2',
    setup() {
        const message = 'hello world !!!'
        return {
            message,
        }
    }
}
</script>

<style lang="scss" scoped>
.test {
    color: blue;
}
</style>
