import React from 'react';

import DepositMoney from './DepositMoney';
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
                    <NavLink to='/myaccount' >
                        Account
                    </NavLink>
                    <NavLink to='/deposit' >
                        Deposit
                    </NavLink>
                    <NavLink to='/send' >
                        Send Money
                    </NavLink>
                    
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/'>Sign Out</NavBtnLink>
                </NavBtn>
            </Nav> 
            <MyAccount/>
            <DepositMoney/>
            
        </>
    );
};

export default Navbar;
