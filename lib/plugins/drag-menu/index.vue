<template>
   <Container>
    <Title>
        <div>组件库</div>
        <CloseContainer @click.native="handleCloseLeftBar">
            <Icon type="close-circled"></Icon>
        </CloseContainer>
    </Title>
    <SearchInput placeholder="Search.." ></SearchInput>
    <ListContainer ref="listContainer">
        <GaeaComponent v-for="(item,index) in  componentClasses" :key="`standard${index}`" :data-gaea-Key="item[1].editSetting.key" >{{item[1].editSetting.name}}</GaeaComponent>
    </ListContainer>
   </Container>
</template>

<script>
import * as components from './style';
export default {
    components,
    position: 'toolContainerLeftDragMenu',
    name: 'drage-menu',
    computed: {
        componentClasses () {
            // map 转 Array
            return Array.from(this.$store.state.application.componentClasses);
        }
    },
    methods: {
        handleCloseLeftBar () {
            this.$store.commit('application/setLeftTool', null);
            this.$store.commit('application/setRightTool', null);
        }
    },
    mounted () {
        this.$store.commit('viewport/registerOuterDrag', this.$refs.listContainer.$el);
    }
};
</script>

<style>

</style>
