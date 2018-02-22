


<template>
    <Container>
        <ColorContainer>
            <input type="color" v-model="color">
        </ColorContainer>
        <Input size="small" style="width:60px" v-model="color" type="text" ></Input>
    </Container>
</template>

<script>
import * as _ from 'lodash';
import * as components from './style';
export default {
    components: {
        ...components
    },
    props: {
        instanceInfo: Object,
        editor: Object
    },
    data () {
        return {
            color: '#ffffff',
            field: null
        };
    },
    position: 'mainToolEditorTypeColor',
    name: 'main-tool-editor-type-color',
    computed: {
        currentEditInstanceKey () {
            let currentEditInstanceKey = this.$store.state.viewport.currentEditInstanceKey;
            return currentEditInstanceKey;
        }
    },
    watch: {
        currentEditInstanceKey (n, o) {
            // init
            this.initCurrtField();
        },
        color (n, o) {
            this.$store.commit('viewport/setInstanceProps', {
                vm: this.instanceInfo.vm,
                key: this.field,
                value: n
            });
        }
    },
    mounted () {
        if (this.editor.field) {
            this.field = this.editor.field;
            this.initCurrtField();
        }
    },
    methods: {
        initCurrtField () {
            let props = this.instanceInfo.vm.$data;
            let val = _.get(props, this.field);
            if (val) {
                this.color = val;
            }
        }
    }
};
</script>

<style>

</style>
