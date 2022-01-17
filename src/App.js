import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import SignInOutContainer from './auth';
import MyAccount from './components/MyAccount';


function App() {
    
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SignInOutContainer/>}/>
          <Route path='/myaccount' element={<MyAccount/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
