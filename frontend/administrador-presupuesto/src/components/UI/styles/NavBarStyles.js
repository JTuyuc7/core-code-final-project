import styled from "styled-components";

export const NavBarContainer = styled.header`
    height: 10%;
    flex-direction: column;
    display: flex;
    justify-content: center;
    box-shadow: 0px 0px 3px 3px rgba(116,47,246,0.2);
    border: 0.5px solid #742ff6;
`;

export const NavBarSubContainer = styled.nav`
    justify-content: space-between;
    flex-direction: row;
    display: flex;
    padding: 1rem 5rem;

    @media(max-width: 992px){
        padding: 1rem 3rem;
    }

    @media(max-width: 768px){
        padding: 1rem 3rem;
    }

    @media(max-width: 468px){
        padding: 1rem 3rem;
    }
`;


export const NavigationContainer = styled.div`
    width: 150px;
    position: relative;
    div {
        background-color: #f2f3f5;
        display: none;
        position: absolute;
        z-index: 1;
        width: 100%;
        border-radius: 8px;
        padding: 0.3rem 0;
        box-shadow: 1px 1px 2px 2px rgba(116,47,246,0.2);
        border: 0.5px solid #742ff6;
    }

    div li {
        display: block;
        padding: 0.3rem 0;
        &:hover{
            cursor: pointer;
            background-color: rgba(116,47,246,0.4);
            color: #f2f3f5;
        }
    }

    div li a {
        display: flex;
        padding: 0.3rem 0.5rem;
        text-decoration:none;
        font-family: Roboto;
        justify-content: space-between;
        align-items: center;
        color: #742ff6;
    }

    div li a:active{
        color: oldlace;
    }

    &:hover div{
        display: block;
    }

    &:last-of-type{
        margin-right: 0;
    }
`;

export const NavigationTitle = styled.button`
    color: rgba(116,47,246,1);
    background-color: #fff;
    width: 100%;
    flex: 1;
    display: flex;
    padding: 1rem 3.5rem;
    height: auto;
    box-shadow: 0px 0px 3px 3px rgba(116,47,246,0.2);
    border: 0.5px solid #742ff6;
    border-radius: 8px;
    font-weight: bold;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    p {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0;
    }

    &:hover{ 
        cursor: pointer;
    }
`;

export const SubNavigation =  styled.div`
    display: none;
    flex-direction: row;
    justify-content: space-between;
    /*@media(min-width: 700px){
        TODO check which style si better
        display: flex;
    }*/
`;

export const UserContainerContent = styled.div`
    margin: 0 1rem;
    position: relative;
    padding: 0;

    div {
        background-color: #f2f2f2;
        display: none;
        position: absolute;
        z-index: 1;
        width: 100%;
        border-radius: 8px;
        padding: 0.3rem 0;
        box-shadow: 1px 1px 2px 2px rgba(116,47,246,0.2);
        border: 0.5px solid #742ff6;
    }

    div li {
        display: block;
        padding: 0.3rem 0;
        &:hover{
            cursor: pointer;
            background-color: rgba(116,47,246,0.4);
            color: #f2f3f5;
        }
    }

    div li a {
        display: flex;
        padding: 0.3rem 0.5rem;
        text-decoration:none;
        font-family: Roboto;
        justify-content: space-between;
        align-items: center;
        color: #742ff6;
    }
    div li button {
        background-color: transparent;
        border: none;
        width: 90%;
        margin: 0 0.5rem;
        &:hover{
            cursor: pointer;
        }
    }

    div li button p {
        display: flex;
        font-family: Roboto;
        font-size: 16px;
        color: #742ff6;
        flex-direction: row;
        justify-content: space-between;
        padding: 0.3rem 0;
    }

    div li a:active{
        color: oldlace;
    }

    &:hover div{
        display: block;
    }

    &:last-of-type{
        margin-right: 0;
    }
`;

export const NavigationUserIcon = styled.button`
    background-color: #fff;
    color: rgba(116,47,246,1);
    flex: 1;
    display: flex;
    font-weight: bold;
    padding: 0.75rem 3.5rem;
    height: auto;
    box-shadow: 0px 0px 3px 3px rgba(116,47,246,0.2);
    border: 0.5px solid #742ff6;
    border-radius: 8px;
    &:hover{ 
        cursor: pointer;
    }
`;