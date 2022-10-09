import styled from "styled-components";

export const BurgerContainer = styled.div`
    position: relative;
    align-items: center;
    /*display: none; TODO check which style si better */ 
    align-items: center;
    justify-content: center;
    display: block;
    /*@media(max-width: 700px){
        TODO check which style si better
        display: block;
    }*/
`;

export const OverlayContainer = styled.div`
    background-color: transparent;
    display: flex;
    flex: 1;
    height: 100vh;
    width: auto;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
`;

export const ContenContainerOverlay = styled.div`
    display: flex;
    position: absolute;
    background-color: rgba(0,0,0,0.1);
    z-index: 2;
    top: 0;
    left: 0;
    height: 100vh;
    width: 70%;

    @media(max-width: 468px){
        width: 50%;
    }
`;

export const ContenContainer = styled.div`
    display: flex;
    position: absolute;
    background-color: white;
    z-index: 2;
    top: 0;
    right: 0;
    height: 100vh;
    width: 30%;
    @media(max-width: 468px){
        width: 50%;
    }
`;

export const NavigationContainer = styled.div`
    display: flex;
    width: 90%;
    margin: 2rem auto;
    flex-direction: column;
`;

export const CloseNaivationContainer = styled.div`
    height: max-content;
    padding: 1rem;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div:hover {
        cursor: pointer;
    }

    p {
        font-family: Roboto;
        color: #742ff6;
        font-weight: bold;
        font-size: 19px;
    }
`;

export const ContainerElements = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
`;

export const NavigationLinksContainer = styled.div`
    background-color: whitesmoke;
    a { 
        text-decoration: none;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem 0.5rem;
        font-family: Roboto;
        align-items: center;
        font-weight: 500;
        color: #742ff6;
        background-color: white;
    }

    button {
        width: 100%;
        padding: 1.5rem 0.5rem;
        border: none;
        font-family: Roboto;
        font-weight: bold;
        color: #742ff6;
        background-color: white;
    }

    button:hover {
        cursor: pointer;
    }

    button p {
        font-size: 18px;
        display: flex;
        justify-content: space-between;
    }
`;
