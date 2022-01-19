import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import SignInOutContainer from './auth';
import DepositMoney from './components/DepositMoney';
import DepositMoneyTransactions from './components/DepositMoneyTransactions';
import SendMoney from './components/SendMoney';
import SendMoneyTransactions from './components/SendMoneyTransactions';
import MyAccount from './components/MyAccount';

import { UserProvider } from './UserContext';


function App() {
    
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<SignInOutContainer/>}/>
            <Route path='/myaccount' element={<MyAccount/>}/>
            <Route path='/sendtrans' element={<SendMoneyTransactions/>}/>
            <Route path='/send' element={<SendMoney/>}/>
            <Route path='/deposit' element={<DepositMoney/>}/>
            <Route path='/depotrans' element={<DepositMoneyTransactions/>}/>
            
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
