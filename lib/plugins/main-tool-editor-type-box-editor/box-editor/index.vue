<script>
import {
    Container,
    Left,
    Right,
    Top,
    Bottom,
    NumberBox,
    ButtonContainer,
    ButtonTriangle,
    Input
} from './style';
export default {
    props: {
        paddingLeft: Number,
        paddingTop: Number,
        paddingRight: Number,
        paddingBottom: Number,
        marginLeft: Number,
        marginTop: Number,
        marginRight: Number,
        marginBottom: Number
    },
    mounted () {
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    },
    destroyed () {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    },
    data () {
        return {
            size: 200,
            // 上一次鼠标 x, y 位置
            lastX: null,
            lastY: null,
            // 当前按住的类型
            currentHolding: '',
            // 记录鼠标是否按下了
            hasMouseDown: false,

            paddingLeft_: this.paddingLeft,
            paddingTop_: this.paddingTop,
            paddingRight_: this.paddingRight,
            paddingBottom_: this.paddingBottom,
            marginLeft_: this.marginLeft,
            marginTop_: this.marginTop,
            marginRight_: this.marginRight,
            marginBottom_: this.marginBottom
        };
    },
    render () {
        const normalBorderWidth = this.size / 4;
        const specialBorderWidth = this.size / 7;

        const containerStyle = {
            width: this.size + 'px',
            height: this.size - this.size / 5 + 'px'
        };

        const leftStyle = {
            left: specialBorderWidth + 'px',
            top: this.size / 2 - normalBorderWidth - this.size / 10 + 'px'
        };

        const topStyle = {
            top: specialBorderWidth + 'px',
            left: this.size / 2 - normalBorderWidth + 'px'
        };

        const rightStyle = {
            right: specialBorderWidth + 'px',
            top: this.size / 2 - normalBorderWidth - this.size / 10 + 'px'
        };

        const bottomStyle = {
            bottom: specialBorderWidth + 'px',
            left: this.size / 2 - normalBorderWidth + 'px'
        };

        const numberOuterLeftStyle = {
            width: specialBorderWidth + 'px',
            height: specialBorderWidth + 'px',
            left: 0,
            top: this.size / 2 - specialBorderWidth / 2 - this.size / 10 + 'px'
        };

        const numberOuterTopStyle = {
            width: specialBorderWidth + 'px',
            height: specialBorderWidth + 'px',
            top: 0,
            left: this.size / 2 - specialBorderWidth / 2 + 'px'
        };

        const numberOuterRightStyle = {
            width: specialBorderWidth + 'px',
            height: specialBorderWidth + 'px',
            right: 0,
            top: this.size / 2 - specialBorderWidth / 2 - this.size / 10 + 'px'
        };

        const numberOuterBottomStyle = {
            width: specialBorderWidth + 'px',
            height: specialBorderWidth + 'px',
            bottom: 0,
            left: this.size / 2 - specialBorderWidth / 2 + 'px'
        };

        const numberInnerLeftStyle = {
            width: specialBorderWidth + 'px',
            height: specialBorderWidth + 'px',
            left: this.size / 3 - specialBorderWidth / 2 + 'px',
            top: this.size / 2 - specialBorderWidth / 2 - this.size / 10 + 'px'
        };

        const numberInnerTopStyle = {
            width: specialBorderWidth + 'px',
            height: specialBorderWidth + 'px',
            top: this.size / 3 - specialBorderWidth / 2 + 'px',
            left: this.size / 2 - specialBorderWidth / 2 + 'px'
        };

        const numberInnerRightStyle = {
            width: specialBorderWidth + 'px',
            height: specialBorderWidth + 'px',
            right: this.size / 3 - specialBorderWidth / 2 + 'px',
            top: this.size / 2 - specialBorderWidth / 2 - this.size / 10 + 'px'
        };

        const numberInnerBottomStyle = {
            width: specialBorderWidth + 'px',
            height: specialBorderWidth + 'px',
            bottom: this.size / 3 - specialBorderWidth / 2 + 'px',
            left: this.size / 2 - specialBorderWidth / 2 + 'px'
        };
        return (
            <Container style={containerStyle}>
                <Left
                    style={leftStyle}>
                    {this.renderTriangle('right', 'marginLeft')}
                    {this.renderTriangle('right', 'paddingLeft', { marginLeft: 5 + 'px' })}
                </Left>
                <Right
                    style={rightStyle}>
                    {this.renderTriangle('left', 'paddingRight')}
                    {this.renderTriangle('left', 'marginRight', { marginLeft: 5 + 'px' })}
                </Right>
                <Top
                    style={topStyle}>
                    {this.renderTriangle('bottom', 'marginTop')}
                    {this.renderTriangle('bottom', 'paddingTop', { marginTop: 5 + 'px' })}
                </Top>
                <Bottom
                    style={bottomStyle}>
                    {this.renderTriangle('top', 'paddingBottom')}
                    {this.renderTriangle('top', 'marginBottom', { marginTop: 5 + 'px' })}
                </Bottom>

                <NumberBox
                    style={numberOuterLeftStyle}>
                    <Input
                        ref="marginLeftInput"
                        nativeOnMouseenter={this.handleInputEnter.bind(this, 'marginLeft')}
                        nativeOnMouseleave={this.handleInputLeave.bind(this, 'marginLeft')}
                        nativeOnChange={this.handleChange.bind(this, 'marginLeft')}
                        value={this.marginLeft_.toString()} />
                </NumberBox>
                <NumberBox
                    style={numberOuterTopStyle}>
                    <Input
                        ref="marginTopInput"
                        nativeOnMouseenter={this.handleInputEnter.bind(this, 'marginTop')}
                        nativeOnMouseleave={this.handleInputLeave.bind(this, 'marginTop')}
                        nativeOnChange={this.handleChange.bind(this, 'marginTop')}
                        value={this.marginTop_.toString()} />
                </NumberBox>
                <NumberBox
                    style={numberOuterRightStyle}>
                    <Input
                        ref="marginRightInput"
                        nativeOnMouseenter={this.handleInputEnter.bind(this, 'marginRight')}
                        nativeOnMouseleave={this.handleInputLeave.bind(this, 'marginRight')}
                        nativeOnChange={this.handleChange.bind(this, 'marginRight')}
                        value={this.marginRight_.toString()} />
                </NumberBox>
                <NumberBox
                    style={numberOuterBottomStyle}>
                    <Input
                        ref="marginBottomInput"
                        nativeOnMouseenter={this.handleInputEnter.bind(this, 'marginBottom')}
                        nativeOnMouseleave={this.handleInputLeave.bind(this, 'marginBottom')}
                        nativeOnChange={this.handleChange.bind(this, 'marginBottom')}
                        value={this.marginBottom_.toString()} />
                </NumberBox>

                <NumberBox
                    style={numberInnerLeftStyle}>
                    <Input
                        ref="paddingLeftInput"
                        nativeOnMouseenter={this.handleInputEnter.bind(this, 'paddingLeft')}
                        nativeOnMouseleave={this.handleInputLeave.bind(this, 'paddingLeft')}
                        nativeOnChange={this.handleChange.bind(this, 'paddingLeft')}
                        value={this.paddingLeft_.toString()} />
                </NumberBox>
                <NumberBox
                    style={numberInnerTopStyle}>
                    <Input
                        ref="paddingTopInput"
                        nativeOnMouseenter={this.handleInputEnter.bind(this, 'paddingTop')}
                        nativeOnMouseleave={this.handleInputLeave.bind(this, 'paddingTop')}
                        nativeOnChange={this.handleChange.bind(this, 'paddingTop')}
                        value={this.paddingTop_.toString()} />
                </NumberBox>
                <NumberBox
                    style={numberInnerRightStyle}>
                    <Input
                        ref="paddingRightInput"
                        nativeOnMouseenter={this.handleInputEnter.bind(this, 'paddingRight')}
                        nativeOnMouseleave={this.handleInputLeave.bind(this, 'paddingRight')}
                        nativeOnChange={this.handleChange.bind(this, 'paddingRight')}
                        value={this.paddingRight_.toString()} />
                </NumberBox>
                <NumberBox
                    style={numberInnerBottomStyle}>
                    <Input
                        ref="paddingBottomInput"
                        nativeOnMouseenter={this.handleInputEnter.bind(this, 'paddingBottom')}
                        nativeOnMouseleave={this.handleInputLeave.bind(this, 'paddingBottom')}
                        nativeOnChange={this.handleChange.bind(this, 'paddingBottom')}
                        value={this.paddingBottom_.toString()} />
                </NumberBox>
            </Container>
        );
    },
    methods: {
        handleInputEnter (name, event) {
            if (this.currentHolding !== '') {
                return;
            }
            const inputElement = event.target;
            inputElement.focus();
            inputElement.select();
        },
        handleInputLeave (name, event) {
            if (this.currentHolding !== '') {
                return;
            }
            const inputElement = event.target;
            inputElement.blur();
        },
        /**
         * 输入框调用的修改
         */
        handleChange (name, event) {
            this[`${name}_`] = parseInt(event.target.value) || 0;
            this.$emit('change', name, this[`${name}_`]);
            this.$emit('finalChange', name, this[`${name}_`]);
        },
        /**
         * 鼠标按下
         */
        handleMouseDown (name, event) {
            this.lastX = event.clientX;
            this.lastY = event.clientY;
            this.currentHolding = name;
            this.hasMouseDown = true;
            this.$emit('start');
        },
        /**
         * 鼠标移动监听处理
         */
        handleMouseMove (event) {
            const diffX = event.clientX - this.lastX;
            const diffY = event.clientY - this.lastY;
            switch (this.currentHolding) {
                case 'marginLeft':

                    this.marginLeft_ = this.marginLeft_ -= diffX;

                    this.$emit('change', this.currentHolding, this.marginLeft_);
                    break;
                case 'paddingLeft':

                    this.paddingLeft_ = this.paddingLeft_ -= diffX;

                    this.$emit('change', this.currentHolding, this.paddingLeft_);
                    break;
                case 'marginRight':

                    this.marginRight_ = this.marginRight_ += diffX;

                    this.$emit('change', this.currentHolding, this.marginRight_);
                    break;
                case 'paddingRight':

                    this.paddingRight_ = this.paddingRight_ += diffX;

                    this.$emit('change', this.currentHolding, this.paddingRight_);
                    break;
                case 'marginTop':

                    this.marginTop_ = this.marginTop_ -= diffY;

                    this.$emit('change', this.currentHolding, this.marginTop_);
                    break;
                case 'paddingTop':

                    this.paddingTop_ = this.paddingTop_ -= diffY;

                    this.$emit('change', this.currentHolding, this.paddingTop_);
                    break;
                case 'marginBottom':

                    this.marginBottom_ = this.marginBottom_ += diffY;

                    this.$emit('change', this.currentHolding, this.marginBottom_);
                    break;
                case 'paddingBottom':

                    this.paddingBottom_ = this.paddingBottom_ += diffY;

                    this.$emit('change', this.currentHolding, this.paddingBottom_);
                    break;
            }
            this.lastX = event.clientX;
            this.lastY = event.clientY;
        },
        handleMouseUp () {
            if (!this.hasMouseDown) {
                return;
            }
            this.hasMouseDown = false;
            // 清空前，调用低频修改
            this.$emit('finalChange', this.currentHolding, this[`${this.currentHolding}_`]);
            this.currentHolding = '';
        },
        renderTriangle  (position, name, extendStyle) {
            const style = {
                ...extendStyle,
                width: 0,
                height: 0
            };
            const outerStyle = {};

            const normalBorderWidth = this.size / 4;
            const specialBorderWidth = this.size / 5;
            const outerWidth = this.size / 20;
            const outerSpace = this.size / 40;

            switch (position) {
                case 'left':
                    style.borderTop = `${normalBorderWidth}px solid transparent`;
                    style.borderBottom = `${normalBorderWidth}px solid transparent`;
                    style.borderRightStyle = 'solid';
                    style.borderRightWidth = specialBorderWidth + 'px';
                    outerStyle.width = outerWidth + 'px';
                    break;
                case 'top':
                    style.borderLeft = `${normalBorderWidth}px solid transparent`;
                    style.borderRight = `${normalBorderWidth}px solid transparent`;
                    style.borderBottomStyle = 'solid';
                    style.borderBottomWidth = specialBorderWidth + 'px';
                    outerStyle.height = outerWidth + 'px';
                    break;
                case 'right':
                    style.borderTop = `${normalBorderWidth}px solid transparent`;
                    style.borderBottom = `${normalBorderWidth}px solid transparent`;
                    style.borderLeftStyle = 'solid';
                    style.borderLeftWidth = specialBorderWidth + 'px';
                    outerStyle.width = outerWidth + 'px';
                    break;
                case 'bottom':
                    style.borderLeft = `${normalBorderWidth}px solid transparent`;
                    style.borderRight = `${normalBorderWidth}px solid transparent`;
                    style.borderTopStyle = 'solid';
                    style.borderTopWidth = specialBorderWidth + 'px';
                    outerStyle.height = outerWidth + 'px';
                    break;
            }

            switch (name) {
                case 'marginLeft':
                    style.marginLeft = 0;
                    break;
                case 'paddingLeft':
                    style.marginLeft = -outerWidth + 'px';
                    outerStyle.marginLeft = outerSpace + 'px';
                    break;
                case 'marginTop':
                    style.marginTop = 0;
                    break;
                case 'paddingTop':
                    style.marginTop = -outerWidth + 'px';
                    outerStyle.marginTop = outerSpace + 'px';
                    break;
                case 'marginRight':
                    style.marginLeft = -outerWidth * 3 + 'px';
                    outerStyle.marginLeft = outerSpace + 'px';
                    break;
                case 'paddingRight':
                    style.marginLeft = -specialBorderWidth / 2 + 'px';
                    break;
                case 'marginBottom':
                    style.marginTop = -outerWidth * 3 + 'px';
                    outerStyle.marginTop = outerSpace + 'px';
                    break;
                case 'paddingBottom':
                    style.marginTop = -specialBorderWidth / 2 + 'px';
                    break;
            }
            return (
                <ButtonContainer
                    style={outerStyle}>
                    <ButtonTriangle
                        draggable={false}
                        nativeOnMousedown={this.handleMouseDown.bind(this, name)}
                        style={style}
                        themes={{ position }}
                    />
                </ButtonContainer>
            );
        }
    }
};
</script>

<style>

</style>
