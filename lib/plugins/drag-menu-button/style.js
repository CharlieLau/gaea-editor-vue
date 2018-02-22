import styled from 'vue-styled-components';

export const Container = styled('div', {
    theme: Object
})`
  ${(props) => props.theme.active && `
    background-color: white;
    box-shadow: inset 0 0 10px #cacaca;
    &:hover {
      background-color: white;
    }
  `}
`;

export const IconContainer = styled('div')`
    display:flex;
    height:40px;
    width:40px;
    align-items:center;
    justify-content:center;
`;
