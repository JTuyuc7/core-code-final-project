import styled from "styled-components";

export const MainContainer = styled.div`
    flex: 1;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

export const MainContentContainer = styled.main`
    display: flex;
    flex: 1;
    height: 100vh;
    flex-direction: column;
`;

export const OutletContainer = styled.div`
    height: max-content;
    flex: 1;
    padding: 3rem 0;
    justify-content: center;
    flex-direction: row;
    display: flex;
`;

export const PageContent = styled.div`
    background-color: pink;
    width: 70%;
`;