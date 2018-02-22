<template>
   <div class="container" :style="{...dymStyle}" v-show="isShow" ></div>
</template>

<script>
import eventbus from '../../service/eventbus';
export default {
    position: 'viewport',
    name: 'viewport-guideline',

    methods: {
        // updateTimeout () {
        //     if (this.timeOut) {
        //         clearTimeout(this.timeOut);
        //     }
        //     this.timeOut = setInterval(() => {
        //         if (this.$store.state.viewport.currentDragInfo !== null) {
        //             this.isShow = false;
        //         } else {
        //             this.isShow = true;
        //         }

        //         // 没有 hover 元素不显示
        //         if (this.$store.state.viewport.currentHoverInstanceKey === null) {
        //             this.isShow = false;
        //         } else {
        //             this.isShow = true;
        //         }
        //     }, 200);
        // },
        calc () {
            // 正在拖拽中不显示
            if (this.$store.state.viewport.currentDragInfo !== null) {
                this.isShow = false;
            } else {
                this.isShow = true;
            }
            // 没有 hover 元素不显示
            if (this.$store.state.viewport.currentHoverInstanceKey === null) {
                this.isShow = false;
                return;
            }
            // 设置  style
            const targetBoundingClientRect = this.$store.state.viewport.instanceDoms.get(this.$store.state.viewport.currentHoverInstanceKey).getBoundingClientRect();
            const viewportBoundingClientRect = this.$store.state.viewport.viewportDOM.getBoundingClientRect();
            this.dymStyle = {
                width: `${targetBoundingClientRect.width - 1}px`,
                height: `${targetBoundingClientRect.height - 1}px`,
                top: `${targetBoundingClientRect.top - viewportBoundingClientRect.top}px`,
                left: `${targetBoundingClientRect.left - viewportBoundingClientRect.left}px`
            };
        }
    },
    data () {
        return {
            timeOut: null,
            dymStyle: null,
            isShow: false
        };
    },
    mounted () {
        // this.calc();
        eventbus.$on(this.$store.state.viewport.mouseHoveringComponent, () => {
            this.calc();
        });
        eventbus.$on(this.$store.state.viewport.mouseHoveringCrumbItem, () => {
            this.calc();
        });
        eventbus.$on(this.$store.state.viewport.mouseLeaveViewport, () => {
            this.isShow = false;
        });
        eventbus.$on(this.$store.state.viewport.mouseLeaveCrumbItem, () => {
            this.isShow = false;
        });
    },
    destroyed () {
        clearTimeout(this.timeOut);
    }
};
</script>

<style lang="less" scoped>
 .container{
    position: absolute;
    z-index: 10;
    border: 1px solid #23b7e5;
    transition: all .07s;
    pointer-events: none;
 }
</style>
