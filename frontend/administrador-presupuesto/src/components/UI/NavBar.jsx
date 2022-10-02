import React from 'react';

const NavBar = (props) => {

    return(
        <>
            <div>Nav Bar para todas las paginas protegidas</div>

            <button onClick={props.onlogoutTest} >Log out</button>
        </>
    )
}

export default NavBar;