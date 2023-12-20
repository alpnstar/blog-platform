import React from 'react';
import './navBar.scss';

const NavBar = () => {
    return (
        <div className='nav-bar'>
            <div className="nav-bar__wrapper">
                <ul>
                    <li>POSTS</li>
                    <li>ABOUT</li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;