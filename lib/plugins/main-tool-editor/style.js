import styled from 'vue-styled-components';

export const EmptyContainer = styled.div`
  flex-grow: 1;
`;

export const EmptyTitle = styled.div`
  display: flex;
  justify-content: center;
  color: #666;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  font-size: 14px;
`;

export const EmptyDescription = styled.div`
  margin: 15px 10px 0 10px;
  padding: 20px;
  color: #999;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 13px;
`;

export const Container = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export const TabTitle = styled.div`
  padding: 5px 10px;
  font-size: 13px;
  color: #666;
  background-color: #eee;
`;
