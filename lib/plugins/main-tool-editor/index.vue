


<template>
    <div >
        <EmptyContainer v-if="!currentEditInstanceKey">
            <EmptyTitle>
                无编辑信息
            </EmptyTitle>
            <EmptyDescription>
                该组件还未添加编辑信息。
            </EmptyDescription>
        </EmptyContainer>
        <Container v-else >
            <component :is="item" v-for="(item,index) in pluginsBelongKeys['mainToolEditorManager']" :key="index"></component>
            <component :is="item" v-for="(item,index) in pluginsBelongKeys['mainToolEditorEvent']" :key="index"></component>
            <component :is="item" v-for="(item,index) in pluginsBelongKeys['mainToolEditorAddon']" :key="index"></component>
        </Container>
    </div>
</template>

<script>
import * as components from './style';
import {SVC} from '../../service';
export default {
    components: {
        ...components
    },
    position: 'mainToolEditor',
    name: 'main-tool-editor',
    data () {
        return {
            pluginsBelongKeys: SVC.pluginsBelongKeys
        };
    },
    computed: {
        // applicationState () {
        //     return this.$store.state.application;
        // },
        // viewportState () {
        //     return this.$store.state.viewport;
        // }
        currentEditInstanceKey () {
            return this.$store.state.viewport.currentEditInstanceKey;
        }
    }
};
</script>

<style>
#gaea-editor-vue .ivu-tabs {
  width: 100%;
}
#gaea-editor-vue .ivu-tabs-nav .ivu-tabs-tab {
  padding: 10px 16px;
}
</style>
