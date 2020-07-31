import styled from '@emotion/styled';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  thead,
  tbody {
    width: 100%;
  }

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
`;

export default Table;
