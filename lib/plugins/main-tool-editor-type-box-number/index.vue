


<template>
   <Container>
       <SliderContainer>
           <Slider v-model="val" :max="max" :min="min"></Slider>
       </SliderContainer>
       <InputNumber
          size="small"
          v-model ="val"
          style="width:60px"
        />
   </Container>
</template>

<script>

import * as components from './style';
import * as _ from 'lodash';
import {SVC} from '../../service';
import {getStyle} from '../../service/dom';
export default {
    components: {
        ...components
    },
    position: 'mainToolEditorTypeNumber',
    name: 'main-tool-editor-type-number',
    data () {
        return {
            val: 0,
            field: null,
            max: 100,
            min: 0
        };
    },
    props: {
        instanceInfo: Object,
        editor: Object
    },
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
        val (n, o) {
            if (n === o) {
                return;
            }
            let _val = this.convert(n, this.editor.data.inputRange, this.editor.data.outputRange);
            this.$store.commit('viewport/setInstanceProps', {
                vm: this.instanceInfo.vm,
                key: this.field,
                value: _val
            });
        }
    },
    methods: {
        initCurrtField () {
            let props = this.instanceInfo.vm.$data;
            let val = _.get(props, this.field);
            if (val) {
                let _val = this.convert(val, this.editor.data.outputRange, this.editor.data.inputRange);
                this.val = _val;
            } else {
                if (this.field.indexOf('styles.') >= 0) {
                    let field = this.field.replace('styles.', '');
                    val = getStyle(this.instanceInfo.vm.$el, _.kebabCase(field));
                    this.val = this.convert(val, this.editor.data.outputRange, this.editor.data.inputRange);
                }
            }
        },
        convert (val, inputRange, outputRange) {
            let _val = -1;
            let _setting = this.editor.data;
            if (_setting && _setting.outputRange) {
                _val = SVC.parseInputToOutRange(val || 0, inputRange, outputRange);
            }
            return _val;
        }
    },
    mounted () {
        if (this.editor.field) {
            this.field = this.editor.field;
            if (this.editor.data && this.editor.data.inputRange) {
                this.max = this.editor.data.inputRange[1];
                this.min = this.editor.data.inputRange[0];
            }
            this.initCurrtField();
        }
    },
    created () {
    }
};
</script>

<style>

</style>
