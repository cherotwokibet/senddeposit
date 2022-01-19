import React from 'react';
import MyAccount from './MyAccount';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to='/myaccount' activeStyle>
                        Account
                    </NavLink>
                    <NavLink to='/deposit' activeStyle>
                        Deposit
                    </NavLink>
                    <NavLink to='/send' activeStyle>
                        Send Money
                    </NavLink>
                    
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/'>Sign Out</NavBtnLink>
                </NavBtn>
            </Nav> 
            
            <MyAccount/>
        </>
    );
};

export default Navbar;
