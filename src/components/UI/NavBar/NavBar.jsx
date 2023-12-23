import React from 'react';
import './navBar.scss';
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <div className='nav-bar'>
            <div className="nav-bar__wrapper">
                <ul>
                    <li><Link to='/'>О нас</Link></li>
                    <li><Link to='/Posts'>Посты</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;