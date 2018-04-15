<template>
  <page  style="height:650px" :componentClasses="componentClasses"></page>
</template>

<script>
import Page from './page/index/index.vue';
// 加载内置插件及每个区块对应的key
import {SVC} from './service';
// 加载组件库
import defaultComponentClass from './components';

const pluginsBelongKeys = SVC.pluginsBelongKeys;
const sortedPlugins = SVC.sortedPlugins;
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
        this.$store.commit('application/loadBuiltInPlugins', {pluginsBelongKeys, sortedPlugins});
        this.componentClasses.concat(defaultComponentClass).forEach(item => {
            this.$store.commit('application/addComponentClass', item);
        });
    }
};
</script>

<style>

</style>
