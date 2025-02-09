<template>
  <div id="container" ref="container">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
// import { ref, getCurrentInstance, onMounted, onUnmounted, nextTick } from 'vue';
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { debounce } from "../../utils/index";
export default {
  name: "Container",
  props: {
    options: Object,
  },
  setup(ctx) {
    // const refName = 'container'
    const container = ref(null);
    const width = ref(0);
    const height = ref(0);
    const originalWidth = ref(0);
    const originalHeight = ref(0);
    const ready = ref(false);
    // let context, dom, observer
    let dom, observer;

    const initSize = () => {
      return new Promise((resolve) => {
        // nextTick保证逻辑是在渲染之后执行
        nextTick(() => {
          if (container.value) {
            // console.log(context, 'context')
            // let key={ container: 'div#container.container' }
            // console.log(context.$refs, 'context.$refs')
            dom = container.value;
            // 获取大屏的真实尺寸
            if (ctx.options && ctx.options.width && ctx.options.height) {
              width.value = ctx.options.width;
              height.value = ctx.options.height;
            } else {
              width.value = dom.clientWidth;
              height.value = dom.clientHeight;
            }
            // 获取画布尺寸
            if (!originalWidth.value || !originalHeight.value) {
              originalWidth.value = window.screen.width;
              originalHeight.value = window.screen.height;
            }
            // console.log(dom)
            // console.log(width.value, height.value, originalWidth.value, originalHeight.value)
            resolve();
          }
        }).catch((e) => {
          // console.log(e, 'e')
        });
      });
    };

    const updateSize = () => {
      if (width.value && height.value) {
        dom.style.width = `${width.value}px`;
        dom.style.height = `${height.value}px`;
      } else {
        dom.style.width = `${originalWidth.value}px`;
        dom.style.height = `${originalHeight.value}px`;
      }
    };

    const updateScale = () => {
      // 获取当前真实视口尺寸
      const currentWidth = document.body.clientWidth;
      const currentHeight = document.body.clientHeight;
      // console.log(currentWidth, currentHeight)
      // 获取大屏最终的宽高
      const realWidth = width.value || originalWidth.value;
      const realHeight = height.value || originalHeight.value;
      const widthScale = currentWidth / realWidth;
      const heightScale = currentHeight / realHeight;
      dom && (dom.style.transform = `scale(${widthScale},${heightScale})`);
    };

    const onResize = async (e) => {
      // console.log(e,'onResize')
      await initSize();
      updateScale();
    };

    // 监听样式变更
    const initMutationObserver = () => {
      const MutationObserver = window.MutationObserver;
      observer = new MutationObserver(onResize);
      observer.observe(dom, {
        attributes: true,
        attributeFilter: ["style"],
        attributeOldValue: true,
      });
    };
    const removeMutationObserver = () => {
      if (observer) {
        observer.disconnect();
        observer.takeRecords();
        observer = null;
      }
    };

    onMounted(async () => {
      ready.value = false;
      // context = getCurrentInstance().ctx
      await initSize();
      updateSize();
      updateScale();
      window.addEventListener("resize", debounce(100, onResize));
      initMutationObserver();
      ready.value = true;
    });

    onUnmounted(() => {
      window.removeEventListener("resize", onResize);
      removeMutationObserver();
    });
    // return {  ready, refName }
    return { ready, container };
  },
};
</script>

<style lang="scss">
#container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
