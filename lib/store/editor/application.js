const application = {
    namespaced: true,
    state: {
        navbarHeight: 40,
        isPreview: false,
        viewportContainerStyle: {},
        viewportStyle: {},
        plugins: [],
        componentClasses: new Map(),
        componentSetting: new Map(),
        componentDefaultProps: new Map(),
        defaultValue: null,
        rootComponentName: '',
        leftTool: null,
        rightTool: null,
        isShowModal: false,
        modalTitle: '',
        modalContentRender: null,
        pages: new Map(),
        currentCreatedPageKey: null,
        currentEditPageKey: null,
        currentViewportPageKey: null,
        preComponents: new Map(),
        pluginsBelongKeys: {},
        sortedPlugins: {},
        onComponentDragStart: () => {}
    },
    mutations: {
        // loadPluginByPosition (state, position) {
        //     state.belongPlugins[position] = state.plugins.filter(plugin => plugin.position === position);
        // },
        addPlugin (state, plugin) {
            state.plugins.push(plugin);
        },
        setLeftTool (state, position) {
            state.leftTool = position;
        },
        setRightTool (state, position) {
            state.rightTool = position;
        },
        loadBuiltInPlugins (state, {pluginsBelongKeys, sortedPlugins}) {
            state.pluginsBelongKeys = pluginsBelongKeys;
            state.sortedPlugins = sortedPlugins;
        },
        addComponentClass (state, component) {
            state.componentClasses.set(component.name, component);
            state.componentSetting.set(component.name, component.editSetting);
        },
        setOnComponentDragStart (state, fn) {
            state.onComponentDragStart = fn;
        }
    }
};

export default application;
