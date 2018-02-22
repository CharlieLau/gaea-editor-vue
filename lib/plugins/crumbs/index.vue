<template>
   <Container>
       <AutoWidthContainer>
           <FooterItem v-for="(item,index) in finderPath" :key="index"  @mouseover.native="handlerHover(item)" @mouseleave.native="handlerMouseLeave">
            {{item}}
            <rightIconContainer>
              <rightIcon />
            </rightIconContainer>
           </FooterItem>
       </AutoWidthContainer>
   </Container>
</template>

<script>
import * as components from './style';
import eventbus from '../../service/eventbus';
export default {
    components,
    position: 'bottomBar',
    name: 'crumbs',
    computed: {
        finderPath () {
            const finderPath = [this.$store.state.viewport.currentEditInstanceKey];
            if (this.$store.state.viewport.currentEditInstanceKey === null) {
                return [];
            }
            let instance = this.$store.state.viewport.instances.get(this.$store.state.viewport.currentEditInstanceKey);
            // 如果已经是根元素, 直接返回空数组
            if (instance.parentInstanceKey === null) {
                return [this.$store.state.viewport.rootInstanceKey];
            }

            // 直到父级是根元素为止
            while (this.$store.state.viewport.instances.get(instance.parentInstanceKey).parentInstanceKey !== null) {
                finderPath.unshift(instance.parentInstanceKey);
                instance = this.$store.state.viewport.instances.get(instance.parentInstanceKey);
            }
            finderPath.unshift(this.$store.state.viewport.rootInstanceKey);

            return finderPath;
        }
    },
    data () {
        return {
            keys: null
        };
    },
    methods: {
        handlerHover (instanceKey) {
            this.$store.commit('viewport/setCurrentHoverInstanceKey', instanceKey);
            eventbus.$emit(this.$store.state.viewport.mouseHoveringCrumbItem);
        },
        handlerMouseLeave (e) {
            this.$store.commit('viewport/setCurrentHoverInstanceKey', null);
            eventbus.$emit(this.$store.state.viewport.mouseLeaveCrumbItem);
        }
    },
    mounted () {
    }
};
</script>

<style>

</style>
