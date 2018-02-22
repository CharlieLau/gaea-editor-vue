import styled from 'vue-styled-components';
export const Container = styled.div`
  padding: 5px 0 5px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  margin-right: 10px;
`
;
export const ColorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 23px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  margin-right:15px;
  &:hover {
    border-color: #ccc;
  }
`
;
