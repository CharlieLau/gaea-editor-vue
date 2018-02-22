<template>
    <div ref="gaea-preview"></div>
</template>

<script>
import * as Styled from './style';
import { mount } from '../../../service/mount';
// import { addClass } from '../../../service/dom';

Styled.injectGlob();

export default {
    props: {
        instanceKey: String
    },
    computed: {
        viewportStore () {
            return this.$store.state.viewport;
        }
    },
    data () {
        return {
            // instanceInfo: null,
            // componentClass: null
            // setting: null,
            // defaultProps: null,
            // wrappedInstance: null,
            // domInstance: null,
            // crrtInstanceKey: null
        };
    },
    methods: {
        mountRoot () {
            this.instanceInfo = this.viewportStore.instances.get(this.instanceKey);
            this.componentClass = this.$store.state.application.componentClasses.get(this.instanceInfo.gaeaKey);
            mount(this.wrappedInstance, this.componentClass, false, this.instanceKey, this.$store).then(vm => {
                // 设置当前dom
                // this.instanceInfo.vm = vm;
                // this.domInstance = vm.$el;
                // 更新属性
                this.$store.commit('viewport/setInstanceProps', {
                    vm,
                    key: 'styles',
                    value: {
                        display: 'block',
                        flexGrow: 1
                    }
                });
                // this._refresh();
            });
        }
    },
    mounted () {
        this.wrappedInstance = this.$refs['gaea-preview'];
        // 更新 当前属性信息
        // this._setCrrtInfo(this.instanceKey);
        // 挂载根
        this.mountRoot();
    }
};
</script>

<style>

</style>
