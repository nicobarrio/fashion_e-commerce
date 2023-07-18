import { styled } from "styled-components";


export const TableContainer = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  margin-top: 20px;
  @media(min-width: 1024px){
    width: 85%;
    margin: 0 auto;
  }
`;

export const Table = styled.table`
 
  border-collapse: collapse;
  @media(min-width: 1024px){
    width: 85%;
    margin: 0 auto;
  }
`;

export const Th = styled.th`
  background-color: #222;
  color: white;
  text-align: left;
  padding: 12px;
  font-size: 12px;
  @media(min-width:1024px){
    font-size: 19px;
  }
`;

export const Td = styled.td`
  border: 1px solid #ddd;
  text-align: left;
  padding: 12px;
  max-width: 100px; /* Ajusta el valor según el ancho máximo deseado */
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  font-size: 11px;
  @media(min-width:1024px){
    font-size: 17px;
  }
 

`;

export const Tr = styled.tr`
  background-color: ${({ index }) => (index % 2 === 0 ? "#ffffff" : "rgba(242, 242, 242, 0.8)")};
  
  &:hover {
    background-color: ${({ index }) => (index % 2 === 0 ? "#ebebeb" : "rgba(217, 217, 217, 0.8)")};
  }
`;


export const DetailLink = styled.a`
  color: #007bff;
  text-decoration: none;
  text-align: center;
`;