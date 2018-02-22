
export const editSetting = {
    key: 'gaea-container',
    name: 'Container',
    isContainer: true,
    slots: {
        default: []
    },
    editors: [
        'Layout',
        {
            type: 'display'
        },
        {
            type: 'box-editor'
        },
        'Style',
        {
            field: 'styles.backgroundColor',
            text: 'BackgroundColor',
            type: 'color'
        },
        {
            field: 'styles.opacity',
            text: 'Opacity',
            type: 'number',
            data: {
                useSlider: true,
                step: 1,
                inputRange: [0, 100],
                outputRange: [0, 1]
            }
        }
    ]
};
