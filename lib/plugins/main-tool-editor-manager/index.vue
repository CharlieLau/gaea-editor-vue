<template>
    <div>
        <EditorContainer :theme="{}"  v-if="typeof editors === 'string'">
            <component :is="item" v-for="(item,index) in pluginsBelongKeys[`mainToolEditorType${editors}`]" :key="index"></component>
        </EditorContainer> 
        <div v-else >   
            <template v-for="(editor,index) in editors" >
                <TabTitle v-if="typeof editor ==='string'" :key="index">{{editor}}</TabTitle>
                <EditorContainer v-else :key="index" :theme="{isObjectType:editor.type==='array'||editor.type==='object'}">
                    <Label v-if="editor.text"  :theme="{isObjectType:editor.type==='array'||editor.type==='object'}" >
                        <span>{{editor.text}}</span>
                    </Label>
                    <EditorBoxContainer>       
                        <component :instanceInfo="instanceInfo" :editor="editor"  :is="innerItem" v-for="(innerItem,innerIndex) in pluginsBelongKeys[`mainToolEditorType${upperFirst(camelCase(editor.type))}`]" :key="innerIndex"></component>
                    </EditorBoxContainer>
                </EditorContainer>
            </template>
        </div>
    </div>
</template>

<script>
import * as components from './style';
import { SVC } from '../../service';
import * as _ from 'lodash';

export default {
    components: {
        ...components
    },
    position: 'mainToolEditorManager',
    name: 'main-tool-editor-manager',
    computed: {
        applicationState () {
            return this.$store.state.application;
        },
        viewportState () {
            return this.$store.state.viewport;
        },
        currentEditInstanceKey () {
            return this.$store.state.viewport.currentEditInstanceKey;
        },
        editors () {
            const instanceKey = this.currentEditInstanceKey;
            if (!this.viewportState.instances.has(instanceKey)) {
                return null;
            }
            this.instanceInfo = this.viewportState.instances.get(instanceKey);
            return this.applicationState.componentSetting.get(
                this.instanceInfo.gaeaKey
            ).editors;
        }
    },
    data () {
        return {
            instanceInfo: null,
            pluginsBelongKeys: SVC.pluginsBelongKeys
        };
    },
    methods: {
        upperFirst: _.upperFirst,
        camelCase: _.camelCase
    }
};
</script>

<style>

</style>
