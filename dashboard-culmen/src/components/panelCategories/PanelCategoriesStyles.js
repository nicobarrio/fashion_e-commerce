import { styled } from "styled-components";

export const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PanelTitle = styled.h2`
color: #2d3436;;
font-size: 2.5rem;
margin-bottom: 2rem;
@media(max-width:425px){
  font-size: 1.5rem;
}
`;

export const PanelWrapper = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 2rem;
`;

export const Panel = styled.div`
background-color: #2d3436;
padding: 2rem;
border-radius: 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
@media(max-width:425px){
  padding: 1rem;
}
`;

export const PanelCategory = styled.h3`
color: #fff;
font-size: 1.8rem;
margin-bottom: 1rem;
@media(max-width:425px){
  font-size: 1rem;
}
`;

export const PanelCount = styled.p`
color: #fff;
font-size: 1.5rem;
@media(max-width:425px){
  font-size: 1rem;
}
`;