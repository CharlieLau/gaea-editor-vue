<template>
     <div  id="gaea-editor-vue">
          <Container>
            <LeftContainer>
                <NavbarContainer>
                    <NavbarContainerLeft :style="{height:`${applicationState.navbarHeight}px`}">
                        <component :is="item" v-for="(item,index) in pluginsBelongKeys['navbarLeft']" :key="index"></component>
                    </NavbarContainerLeft>
                    <NavbarContainerRight>
                        <component :is="item" v-for="(item,index) in pluginsBelongKeys['navbarRight']" :key="index"></component>
                    </NavbarContainerRight>
                </NavbarContainer>
                <ViewportContainer>
                    <ViewportContainerLeft :theme="{hidden:applicationState.isPreview}">
                        <ViewportContainerLeftTop>
                            <component :is="item" v-for="(item,index) in pluginsBelongKeys['leftBarTop']" :key="index"></component>
                        </ViewportContainerLeftTop>
                        <ViewportContainerLeftBottom>
                            <component :is="item" v-for="(item,index) in pluginsBelongKeys['leftBarBottom']" :key="index"></component>                            
                        </ViewportContainerLeftBottom>
                    </ViewportContainerLeft>
                    <ViewportContainerRight :theme="{showLeft:applicationState.leftTool}" :style="{...applicationState.viewportContainerStyle}">
                        <ToolsContainer :theme="{fullScreen:applicationState.rightTool}">
                            <ToolsContainerLeft>
                                <component :is="item" v-for="(item,index) in pluginsBelongKeys[`toolContainerLeft${applicationState.leftTool}`]" :key="index"></component>
                            </ToolsContainerLeft>
                            <ToolsContainerRight :theme="{show:applicationState.rightTool}"  >
                                <component :is="item" v-for="(item,index) in pluginsBelongKeys[`toolContainerRight${applicationState.rightTool}`]" :key="index"></component>                                
                            </ToolsContainerRight>
                        </ToolsContainer>
                        <ViewportContainerBox :theme="{hidden:applicationState.rightTool}" :style="{...applicationState.viewportStyle,display:applicationState.isPreview?'none':null}">
                            <Viewport></Viewport>
                            <component :is="item" v-for="(item,index) in pluginsBelongKeys['viewport']" :key="index"></component>                              
                        </ViewportContainerBox>
                        <PreviewContainer v-if="applicationState.isPreview"  :theme="{hidden:applicationState.rightTool}" :style="{...applicationState.viewportStyle}">
                            <component :is="item" v-for="(item,index) in pluginsBelongKeys['preview']" :key="index"></component>  
                        </PreviewContainer>
                    </ViewportContainerRight>
                </ViewportContainer>
                <FooterContainer>
                    <component :is="item" v-for="(item,index) in pluginsBelongKeys['bottomBar']" :key="index"></component>
                </FooterContainer>
            </LeftContainer>
            <RightContainer :theme="{hidden:applicationState.isPreview}" >
                <component :is="item" v-for="(item,index) in pluginsBelongKeys['mainTool']" :key="index"></component>
            </RightContainer>
        </Container>
     </div>
</template>

<script>
// 加载基本布局组件
import * as components from './index.style';

// 加载内置插件及每个区块对应的key
import {SVC} from '../../service';
// 加载组件库
// 加载viewport
import Viewport from '../viewport';
export default {
    components: {
        Viewport,
        ...components
        // ...sortedPlugins
    },
    props: {
        componentClasses: {
            default () {
                return [];
            }
        }
    },
    data () {
        return {
            pluginsBelongKeys: SVC.pluginsBelongKeys
        };
    },
    computed: {
        applicationState () {
            return this.$store.state.application;
        }
    },
    created () {
        // 初始化布局组件
        this.$store.commit('viewport/initViewport');
    },
    mounted () {

    }
};
</script>

<style>

</style>
