
export const editSetting = {
    key: 'gaea-card',
    name: 'Card',
    // isContainer: true,
    slot: {
        default: []
    },
    editors: [
        'Layout',
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
        },
        'aa',
        {
            field: 'title',
            text: 'Title',
            type: 'string'
        }

    ]
};
