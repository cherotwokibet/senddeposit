import {combineReducers} from 'redux';

import sendDepositReducer from './sendDeposit';
import authReducer from './auth';


const rootReducer = combineReducers ({
    sendDeposit : sendDepositReducer,
    auth : authReducer
});

export default rootReducer;

