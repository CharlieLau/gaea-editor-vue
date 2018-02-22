import * as Sortable from 'sortablejs';
import * as _ from 'lodash';
// import eventbus from '../../../views/editor/service/eventbus';

let common = {
    createNewInstanceKey () {
        return _.uniqueId('gaea_instance_');
    }
};

const viewport = {
    namespaced: true,
    state: {
        viewportDOM: null,
        rootInstanceKey: null,
        instances: new Map(),
        instanceDoms: new Map(),
        currentDragInfo: null,
        currentHoverInstanceKey: null,
        currentEditInstanceKey: null,
        dragStartDataReady: false,
        /**
         * 鼠标离开视图区域
         */
        mouseLeaveViewport: 'mouseLeaveViewport',
        /**
         * 鼠标移动到某个组件上
         */
        mouseHoveringComponent: 'mouseHoveringComponent',
        /**
         * 鼠标移动到面包屑
         */
        mouseHoveringCrumbItem: 'mouseHoveringCrumbItem',
        /**
         * 鼠标移动到面包屑
         */
        mouseLeaveCrumbItem: 'mouseLeaveCrumbItem',
        /**
         * 视图区域发生更新
         */
        viewportUpdated: 'viewportUpdated',
        /**
         * 刷新某个实例
         */
        instanceUpdate: 'instanceUpdate',
        /**
         * 页面冲渲染
         */
        refreshPage: 'refreshPage',
        /**
         * 触发编辑器回调
         */
        emitEditorCallback: 'emitEditorCallback',
        /**
         * 当前点击选组件改变
         */
        currentEditInstanceChange: 'currentEditInstanceChange'
    },
    mutations: {
        startDrag (state, dragInfo) {
            state.currentDragInfo = dragInfo;
        },
        endDrag (state) {
            state.currentDragInfo = null;
        },
        setViewportDOM (state, viewportDOM) {
            state.viewportDOM = viewportDOM;
        },
        initViewport (state) {
            this.commit('viewport/addInstance', {
                gaeaKey: 'gaea-container',
                parentInstanceKey: null,
                indexPosition: null
            });
            let rootInstance = Array.from(state.instances);
            const rootInstanceKey = rootInstance[0][0];
            this.commit('viewport/setRootInstanceKey', rootInstanceKey);
        },
        addInstance (state, params) {
            const newInstanceKey = common.createNewInstanceKey();
            state
                .instances
                .set(newInstanceKey, {
                    gaeaKey: params.gaeaKey,
                    data: {
                        props: null
                    },
                    slots: {},
                    parentInstanceKey: params.parentInstanceKey,
                    preGaeaKey: params.preGaeaKey,
                    vm: null
                });
            // 先执行 callback  挂载 vm 再执行 修改属性样式
            state.instances = new Map(state.instances);
            if (params.cb) {
                params
                    .cb
                    .call(null, newInstanceKey);
            }
            // 然后再执行修改样式
            if (params.parentInstanceKey !== null) {
                const parentInstance = state
                    .instances
                    .get(params.parentInstanceKey);
                if (!parentInstance.slots[params.slotName]) {
                    parentInstance.slots[params.slotName] = [];
                }
                parentInstance
                    .slots[params.slotName]
                    .splice(params.indexPosition, 0, newInstanceKey);
                // 如果父级和自身都是 gaea-container，且父级是 display:flex，那么子元素默认 flexDirection 与父级元素相反
                if (parentInstance.gaeaKey === 'gaea-container' && params.gaeaKey === 'gaea-container') {
                //     let crrtInstance = state
                //         .instances
                //         .get(newInstanceKey);
                //     if (parentInstance.vm.$el.style.display === 'flex' && crrtInstance.vm.$el.style.display === 'flex') {
                //         switch (parentInstance.vm.$el.style.flexDirection) {
                //             case 'column':
                //                 this.commit('viewport/setInstanceProps', {
                //                     vm: crrtInstance.vm,
                //                     key: 'styles',
                //                     value: {
                //                         flexDirection: 'row'
                //                     }
                //                 });
                //                 break;
                //             case 'row':
                //             default:
                //                 this.commit('viewport/setInstanceProps', {
                //                     vm: crrtInstance.vm,
                //                     key: 'styles',
                //                     value: {
                //                         flexDirection: 'column'
                //                     }
                //                 });
                //                 break;
                //         }
                //     }
                }
            }
        },
        setInstanceProps (state, {vm, key, value}) {
            if (Object.prototype.toString.call(value) === '[object Object]') {
                let obj = _.get(vm.$data, key);
                _.set(vm.$data, key, {
                    ...obj,
                    ...value
                });
            } else {
                _.set(vm.$data, key, value);
            }
            vm.$forceUpdate();
        },
        setRootInstanceKey (state, key) {
            state.rootInstanceKey = key;
        },
        setDomInstance (state, {key, instance}) {
            state
                .instanceDoms
                .set(key, instance);
        },
        setCurrentHoverInstanceKey (state, instanceKey) {
            state.currentHoverInstanceKey = instanceKey;
        },
        moveInstance (state, {sourceTargetKey, targetParentKey, targetIndex, fromSlotName, toSlotName}) {
            const sourceTargetInstance = state
                .instances
                .get(sourceTargetKey);
            const sourceParentInstance = state
                .instances
                .get(sourceTargetInstance.parentInstanceKey);
            const targetParentInstance = state
                .instances
                .get(targetParentKey);

            if (sourceTargetInstance.parentInstanceKey !== targetParentKey) { // 跨越层级
                // 修改拖拽元素的 parentMapUniqueKey
                sourceTargetInstance.parentInstanceKey = targetParentKey;

                // 拖拽目标添加 instance
                if (!targetParentInstance
                    .slots[toSlotName]) {
                    targetParentInstance
                        .slots[toSlotName] = [];
                }
                targetParentInstance
                    .slots[toSlotName]
                    .splice(targetIndex, 0, sourceTargetKey);

                // 拖拽源删除 instance
                sourceParentInstance.slots[fromSlotName] = sourceParentInstance
                    .slots[fromSlotName]
                    .filter(childKey => childKey !== sourceTargetKey);
            } else { // 同层级
                this.commit('viewport/horizontalMoveInstance', {
                    parentKey: targetParentKey,
                    beforeIndex: sourceParentInstance
                        .slots[fromSlotName]
                        .findIndex(childKey => childKey === sourceTargetKey),
                    afterIndex: targetIndex
                });
            }
            // 触发 VueX 对map的检查
            state.instances = new Map(state.instances);
        },
        /**
         * 同层级拖拽，不需要主动调用，直接调用 moveInstance 即可
         */
        horizontalMoveInstance (state, {parentKey, beforeIndex, afterIndex, slotName}) {
            const parentInstance = state
                .instances
                .get(parentKey);
            if (beforeIndex < afterIndex) {
                // 从左到右
                for (let index = beforeIndex; index < afterIndex; index++) {
                    const beforeUniqueKey = parentInstance.slots[slotName][index];
                    const afterUniqueKey = parentInstance.slots[slotName][index + 1];
                    parentInstance.slots[slotName][index] = afterUniqueKey;
                    parentInstance.slots[slotName][index + 1] = beforeUniqueKey;
                }
            } else {
                // 从右到左
                for (let index = beforeIndex; index > afterIndex; index--) {
                    const beforeUniqueKey = parentInstance.slots[slotName][index];
                    const afterUniqueKey = parentInstance.slots[slotName][index - 1];
                    parentInstance.slots[slotName][index] = afterUniqueKey;
                    parentInstance.slots[slotName][index - 1] = beforeUniqueKey;
                }
            }
            // 触发 VueX 对map的检查
            state.instances = new Map(state.instances);
        },
        setDragInfo (state, {mapUniqueKey, index}) {
            const newInfo = state.currentDragInfo.info;
            newInfo.targetInstanceKey = mapUniqueKey;
            newInfo.targetIndex = index;
        },
        registerOuterDrag (state, dragParentDom) {
            // 上次拖拽的位置
            let lastDragStartIndex = -1;
            Sortable.create(dragParentDom, {
                animation: 50,
                // 放在一个组里,可以跨组拖拽
                group: {
                    name: 'gaea-container',
                    pull: 'clone',
                    put: false
                },
                sort: false,
                delay: 0,
                onStart: (event) => {
                    lastDragStartIndex = event.oldIndex;
                    if (event.item.dataset.source) {
                        // this.startDrag({     type: 'combo',     dragStartParentElement:
                        // dragParentDom,     dragStartIndex: event.oldIndex ,     comboInfo: { source:
                        // event.item.dataset.source     } })
                    } else if (event.item.dataset.gaeaKey) {
                        state.dragStartDataReady = false;
                        this.commit('viewport/startDrag', {
                            type: 'new',
                            dragStartParentDom: dragParentDom,
                            dragStartIndex: event.oldIndex,
                            info: {
                                gaeaKey: event.item.dataset.gaeaKey,
                                props: event.item.dataset.props,
                                preGaeaKey: event.item.dataset.preGaeaKey
                            }
                        });

                        // 开始拖拽完毕
                        state.dragStartDataReady = true;
                    }
                },
                onEnd: (event) => {
                    this.commit('viewport/endDrag');
                    // 因为是 clone 方式, 拖拽成功的话元素会重复, 没成功拖拽会被添加到末尾 所以先移除 clone 的元素（吐槽下, 拖走的才是真的, 留下的才是
                    // clone 的） 有 parentNode, 说明拖拽完毕还是没有被清除, 说明被拖走了, 因为如果没真正拖动成功, clone 元素会被删除
                    if (event.clone.parentNode) {
                        // 有 clone, 说明已经真正拖走了
                        dragParentDom.removeChild(event.clone);
                        // 再把真正移过去的弄回来
                        if (lastDragStartIndex === dragParentDom.childNodes.length) {
                            // 如果拖拽的是最后一个
                            dragParentDom.appendChild(event.item);
                        } else {
                            // 拖拽的不是最后一个
                            dragParentDom.insertBefore(event.item, dragParentDom.childNodes[lastDragStartIndex]);
                        }
                    } else {
                        // 没拖走, 只是晃了一下, 不用管了
                    }
                }
            });
        },
        registerInnerDrag (state, {
            parentInstanceKey,
            dragParentDom,
            params,
            groupName = 'gaea-container',
            onDragAdd
        }) {
            const instance = state
                .instances
                .get(parentInstanceKey);
            Sortable.create(dragParentDom, {
                ...params,
                animation: 50,
                // 放在一个组里,可以跨组拖拽
                group: {
                    name: groupName,
                    pull: true,
                    put: true
                },
                onStart: (event) => {
                    let slotName = event.from.dataset.slotName;
                    this.commit('viewport/startDrag', {
                        type: 'viewport',
                        dragStartParentDom: dragParentDom,
                        dragStartIndex: event.oldIndex,
                        info: {
                            instanceKey: instance.slots[slotName][event.oldIndex]
                        }
                    });
                },
                onEnd: (event) => {
                    this.commit('viewport/endDrag');

                    // 在 viewport 中元素拖拽完毕后, 为了防止 outer-move-box 在原来位置留下残影, 先隐藏掉
                    this.commit('viewport/setCurrentHoverInstanceKey', null);
                },
                onAdd: (event) => {
                    // 如果数据还没有 ready，很尴尬，什么都没有发生 此时一定是 new，不用担心 dom 节点脏掉
                    if (!state.dragStartDataReady) {
                        return;
                    }
                    switch (state.currentDragInfo.type) {
                        case 'new':
                            // 是新拖进来的, 不用管, 因为工具栏会把它收回去 为什么不删掉? 因为这个元素不论是不是 clone, 都被移过来了, 不还回去 react 在更新
                            // dom 时会无法找到
                            const newInfo = state.currentDragInfo.info;
                            const slotName = event.to.dataset.slotName;
                            this.commit('viewport/addInstance', {
                                gaeaKey: newInfo.gaeaKey,
                                parentInstanceKey,
                                indexPosition: event.newIndex,
                                preGaeaKey: newInfo.preGaeaKey,
                                slotName,
                                cb: newInstanceKey => {
                                    if (onDragAdd) {
                                        // e --event parentInstanceKey  --父instanceKey gaeaKey  -->component type
                                        // newInstanceKey  -> new instace Key
                                        onDragAdd.call(this, event, parentInstanceKey, newInfo.gaeaKey, newInstanceKey, slotName);
                                    }
                                }
                            });
                            break;
                        case 'viewport':
                            // 设置新增时拖拽源信息
                            this.commit('viewport/setDragInfo', {
                                mapUniqueKey: parentInstanceKey,
                                index: event.newIndex
                            });
                            break;

                        case 'combo':
                            // this.addComboComponentBySource(mapUniqueKey,
                            // this.viewport.currentDragComponentInfo.comboInfo.source, event.newIndex )
                            // TODO 发布新增组合事件 this.props.viewport.saveOperate({     type: 'addCombo',
                            // mapUniqueKey,     addCombo: {         parentMapUniqueKey:
                            // this.props.mapUniqueKey,         index: event.newIndex , componentInfo:
                            // component     } })
                            break;
                    }
                },
                onUpdate: (event) => {
                    let slotName = event.from.dataset.slotName;
                    //  同一个父级下子元素交换父级 // 取消 srotable 对 dom 的修改, 让元素回到最初的位置即可复原
                    this.commit('viewport/horizontalMoveInstance', {
                        parentKey: parentInstanceKey,
                        beforeIndex: event.oldIndex,
                        afterIndex: event.newIndex,
                        slotName
                    });
                },
                onRemove: (event) => {
                    // onEnd 在其之后执行，会清除拖拽目标的信息 减少了一个子元素，一定是发生在 viewport 区域元素发生跨父级拖拽时
                    let toSlotName = event.to.dataset.slotName;
                    let fromSlotName = event.from.dataset.slotName;
                    const dragTargetKey = state
                        .instances
                        .get(parentInstanceKey)
                        .slots[toSlotName][state.currentDragInfo.dragStartIndex];
                    const dragViewportInfo = state.currentDragInfo.info;
                    this.commit('viewport/moveInstance', {
                        sourceTargetKey: dragTargetKey,
                        targetParentKey: dragViewportInfo.targetInstanceKey,
                        targetIndex: dragViewportInfo.targetIndex,
                        fromSlotName,
                        toSlotName
                    });
                }
            });
        },
        getInstancePath (state, {instanceKey, cb}) {
            const finderPath = [state.currentEditInstanceKey];
            if (state.currentEditInstanceKey === null) {
                if (cb) {
                    let result = [];
                    cb(result);
                }
                return;
            }
            let instance = state
                .instances
                .get(state.currentEditInstanceKey);
            // 如果已经是根元素, 直接返回空数组
            if (instance.parentInstanceKey === null) {
                if (cb) {
                    let result = [state.rootInstanceKey];
                    cb(result);
                }
                return;
            }

            // 直到父级是根元素为止
            while (state.instances.get(instance.parentInstanceKey).parentInstanceKey !== null) {
                finderPath.unshift(instance.parentInstanceKey);
                instance = state
                    .instances
                    .get(instance.parentInstanceKey);
            }
            finderPath.unshift(state.rootInstanceKey);
            if (cb) {
                cb(finderPath);
            }
        },
        setCurrentEditInstanceKey (state, instanceKey) {
            // 如果和当前正在编辑元素相同，不做操作
            if (state.currentEditInstanceKey === instanceKey) {
                return;
            }
            // 修改 mapUniqueKey
            state.currentEditInstanceKey = instanceKey;
        }
    },
    actions: {}
};

export default viewport;
