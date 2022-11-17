import styled from "styled-components";

export const MainOverlarContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    h3 {
        color: rgba(116,47,246,0.8);
        font-family: Roboto;
    }
`;

export const OveralyContainer = styled.div`
    background-color: yellow;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.3);
`;

export const ContentContainer = styled.div`
    position: absolute;
    background-color: #f2f3f5;
    width: 35%;
    height: 70%;
    padding: 1rem;
    border-radius: 10px;
    z-index: 2;
    animation: modalFade 1s forwards;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 0.8px solid rgba(116,47,246,0.8);

    @media( max-width: 1000px) {
        width: 60%;
    }

    @media( max-width: 700px) {
        width: 70%;
    }

    @media( max-width: 500px) {
        width: 90%;
    }

    @keyframes modalFade {
        0% { opacity: 0; };
        100% { opacity: 1;};
    }
`;
