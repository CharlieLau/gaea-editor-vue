<template>
  <page  style="height:650px" :componentClasses="componentClasses"></page>
</template>

<script>
import Page from './page/index/index.vue';
// 加载内置插件及每个区块对应的key
import {sortedPlugins, pluginsBelongKeys} from './service';
// 加载组件库
import defaultComponentClass from './components';
export default {
    components: {
        Page
    },
    props: {
        componentClasses: {
            default () {
                return [];
            }
        }
    },
    created () {
        this.$store.commit('application/loadBuiltInPlugins', pluginsBelongKeys, sortedPlugins);
        this.componentClasses.concat(defaultComponentClass).forEach(item => {
            this.$store.commit('application/addComponentClass', item);
        });
    }
};
</script>

<style>

</style>
