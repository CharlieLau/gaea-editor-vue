import {addClass} from './dom';
import {mountSlot} from './mount';
import eventbus from './eventbus';
export const HelperClass = {
    data () {
        return {__setting__: null, __crrtInstanceInfo__: null};
    },
    methods: {
        handleMouseOver (event) {
            event.stopPropagation();
            this
                .$store
                .commit('viewport/setCurrentHoverInstanceKey', this.__crrtInstanceKey__);
            eventbus.$emit(this.$store.state.viewport.mouseHoveringComponent, {
                instanceKey: this.__crrtInstanceKey__,
                type: 'instance'
            });
        },
        handleClick (event) {
            event.stopPropagation();
            this
                .$store
                .commit('viewport/setCurrentEditInstanceKey', this.__crrtInstanceKey__);
        },
        registerEvent () {
            this
                .$el
                .removeEventListener('mouseover', this.handleMouseOver);
            this
                .$el
                .removeEventListener('click', this.handleClick);
            this
                .$el
                .addEventListener('mouseover', this.handleMouseOver);
            this
                .$el
                .addEventListener('click', this.handleClick);
        },
        __refresh__ (instanceKey, instanceDom, setting, instance) {
            this
                .$store
                .commit('viewport/setDomInstance', {
                    key: instanceKey,
                    instance: instanceDom
                });
            // 设置可拖拽类样式
            addClass(instanceDom, 'gaea-draggable');
            this.__setLayoutClassIfCanDragIn__(setting, instance, instanceDom);
            let slotsDom = instanceDom.querySelectorAll('.gaea-slot');

            // sortable
            if (this.__setting__.isContainer) {
                this
                    .$store
                    .commit('viewport/registerInnerDrag', {
                        parentInstanceKey: instanceKey,
                        dragParentDom: instanceDom,
                        params: {
                            draggable: '.gaea-draggable'
                        },
                        // 注册新增组件回调
                        onDragAdd: this.__handleDragAdd__,
                        onDragUpdate: this.__handleDragUpdate__,
                        onDragRemove: this.__handleDragRemove__
                    });
            } else if (slotsDom.length) {
                slotsDom.forEach(dom => {
                    this
                        .$store
                        .commit('viewport/registerInnerDrag', {
                            parentInstanceKey: instanceKey,
                            dragParentDom: dom,
                            params: {
                                draggable: '.gaea-draggable'
                            },
                            // 注册新增组件回调
                            onDragAdd: this.__handleDragAdd__,
                            onDragUpdate: this.__handleDragUpdate__,
                            onDragRemove: this.__handleDragRemove__
                        });
                });
            }
        },
        __handleDragUpdate__ (event) {},
        // 新增组件
        __handleDragAdd__ (e, parentInstanceKey, gaeaKey, instanceKey, slotName) {
            let _parentInstance = this
                .$store
                .state
                .viewport
                .instances
                .get(parentInstanceKey);
            let componentClass = this
                .$store
                .state
                .application
                .componentClasses
                .get(gaeaKey);
            let crrtInstance = this
                .$store
                .state
                .viewport
                .instances
                .get(instanceKey);
            crrtInstance.vm = this;
            mountSlot(_parentInstance.vm, componentClass, 'default', instanceKey, this.$store);
        },
        __handleDragRemove__ (event) {},
        __setLayoutClassIfCanDragIn__ (setting, instance, instanceDom) {
            if (setting.isContainer && instance.parentInstanceKey !== null) {
                addClass(instanceDom, 'gaea-container');
            }
        }
    },
    mounted () {
        if (!this.__crrtInstanceKey__) {
            return;
        }
        // 注册 当前dom 事件
        this.registerEvent();
        this.__crrtInstanceInfo__ = this
            .$store
            .state
            .viewport
            .instances
            .get(this.__crrtInstanceKey__);
        // 设置当前实例vm对象是自己
        this.__crrtInstanceInfo__.vm = this;
        // 同步instance的属性 $data
        this.__crrtInstanceInfo__.data = this.$data;
        this.__setting__ = this
            .$store
            .state
            .application
            .componentSetting
            .get(this.__crrtInstanceInfo__.gaeaKey);
        // 绑定 子可拖拽 设置 state  key-$el Map对象
        this.__refresh__(this.__crrtInstanceKey__, this.$el, this.__setting__, this.__crrtInstanceInfo__);
    }
};
