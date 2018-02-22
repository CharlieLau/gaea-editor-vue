<template>
    <Container>
        <TreeContainer>
            <Tree :data="componentTree" :render="renderContent" ></Tree>
       </TreeContainer>
       <AbsoluteContainer>
           组件个数:{{instances.size}}   &nbsp;
       </AbsoluteContainer>
    </Container>
</template>

<script>
import * as components from './style';
import eventbus from '../../service/eventbus';
export default {
    components: {
        ...components
    },
    position: 'mainToolTree',
    name: 'main-tool-tree',
    computed: {
        applicationState () {
            return this.$store.state.application;
        },
        viewportState () {
            return this.$store.state.viewport;
        },
        componentTree () {
            let _root = this.digui(this.viewportState.rootInstanceKey);
            return [_root];
        },
        instances () {
            return this.$store.state.viewport.instances;
        }
    },
    methods: {
        digui (instanceKey) {
            /**
             * {
             * title:"",
             * children:[],
             * expand:true
             * }
             */
            let instanceInfo = this.instances.get(instanceKey);
            let crrtComponent = this.applicationState.componentClasses.get(instanceInfo.gaeaKey);
            let childs = Object.keys(instanceInfo.slots).reduce((prev, nxt) => {
                return prev.concat(instanceInfo.slots[nxt]);
            }, []);
            let result = {
                title: crrtComponent.editSetting.name,
                type: instanceInfo.gaeaKey,
                id: instanceKey
            };
            if (childs.length) {
                result.expand = true;
                result.children = childs.map(item => {
                    return this.digui(item);
                });
            }
            return result;
        },
        renderContent (h, { root, node, data }) {
            let _Icon = h('Icon', {
                props: {
                    type: 'ios-paper-outline'
                },
                style: {
                    marginRight: '8px'
                }
            });
            return (
                <span style={{ display: 'inline-block', width: '100%', cursor: 'pointer' }}
                    data-instance-Key={data.id}
                    class="main-tool-tree-node"
                    onMouseover={this.handlerMouseOver}
                    onMouseleave={this.handlerMouseLeave}
                    onClick={this.handlerNodeClick.bind(this, data.id)}>
                    {_Icon}
                    <span>{data.title}<b>{data.id}</b></span>
                </span>
            );
        },
        handlerMouseOver (event) {
            event.stopPropagation();
            let instanceKey = event.target.dataset['instanceKey'];
            if (instanceKey) {
                this.$store.commit('viewport/setCurrentHoverInstanceKey', instanceKey);
                eventbus.$emit(this.$store.state.viewport.mouseHoveringCrumbItem);
            }
        },
        handlerMouseLeave (event) {
            event.stopPropagation();
            this.$store.commit('viewport/setCurrentHoverInstanceKey', null);
            eventbus.$emit(this.$store.state.viewport.mouseLeaveCrumbItem);
        },
        handlerNodeClick (instanceKey) {
            this.$store.commit('viewport/setCurrentEditInstanceKey', instanceKey);
        }
    },
    mounted () {
    }
};
</script>

<style lang="less">
#gaea-editor-vue .ivu-tabs {
  width: 100%;
}
#gaea-editor-vue .ivu-tabs-nav .ivu-tabs-tab {
  padding: 10px 16px;
}
#gaea-editor-vue .ivu-tabs-bar{
    margin-bottom: 0;
}
#gaea-editor-vue .main-tool-tree-node{
    span{
        b{
             margin-left: 10px;
             color: #ccc;
        }
        & :hover{
            color:#d5e8fc
        }
    }
}

</style>
