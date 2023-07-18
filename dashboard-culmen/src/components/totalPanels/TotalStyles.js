import styled from 'styled-components'; 

export const TotalCard = styled.div`
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    text-align: center;
    p {
        font-size: 1.2rem;
        margin-bottom: 10px;
        color: #333;
        font-family: 'Arial', sans-serif;
      }
    
      span {
        font-size: 2.5rem;
        font-weight: bold;
        color: #009688;
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
