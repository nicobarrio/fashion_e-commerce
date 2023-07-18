import styled, { keyframes } from "styled-components";



// Define la paleta de colores
const colors = {
  primaryGreen: "#85CF7E",
  secondaryLightBlue: "#1E96FC",
  grayLight: "#F8F8F8",
  grayDark: "#616163",
  lavender: "#CDB4DB",
};

export const Font1 = styled.span`
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    color: ${colors.secondaryLightBlue};
    display:block;
`;

export const Font2 = styled.span`
    font-family: 'Lato', sans-serif;
    font-weight: bold;
    color: ${colors.grayDark};
    display:block;
`;

export const Font3 = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  color: black;

`

// Define la animación de la imagen del producto
const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Estilos del componente LastProductWrapper
export const LastProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px auto;
  padding: 20px;
  background-color: ${colors.grayLight};
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: ${colors.primaryGreen};
    text-align: center;
  }

  div {
    margin-bottom: 20px;
  }

  h3 {
    font-size: 20px;
  }


  img {
    width: 100%;
    height: auto;
    margin-top: 20px;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    animation: ${floatAnimation} 3s ease-in-out infinite;
  }


  @media screen and (min-width: 1024px) {
    width: 50%;
    flex-direction: row-reverse;
  }
`;

export const ContainerImg = styled.div`
  display: flex; 
  flex-direction: column; 
  justify-content: center; 

  a{
    text-decoration:none;
    font-family: 'Lato', sans-serif;  
    color: ${colors.secondaryLightBlue};
    margin-top: 10px;
    font-weight: bold;
  }


` 