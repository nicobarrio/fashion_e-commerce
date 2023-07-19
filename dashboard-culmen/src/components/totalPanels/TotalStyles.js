import styled from 'styled-components'; 

export const TotalCard = styled.div`
    background-color: #f4f4f4;
    padding: 10px;
    text-align: center;
    border-radius: 40px;
    margin: 10%;

    p {
        font-size: 16px;
        margin-bottom: 10px;
        color: #333;
        font-family: 'Arial', sans-serif;
      }
    
      span {
        font-size: 20px;
        font-weight: bold;
        color: #000000;
        font-family: 'Helvetica', sans-serif;
      }
`;

export const TotalWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;


export const TotalContainer = styled.div`

    min-height: 60vh;
    display: flex;
    flex-direction: column;


`;
