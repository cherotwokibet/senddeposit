import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    grossMoney:50000,
    netMoney:0,
    totalSent:0,
    transactions:[]
}

const addSendTransaction = (state,action) => {

    const sentAmount = action.user.amount;
    console.log(sentAmount); 
    

    return updateObject(state,{
        transactions:action.user,
        netMoney:state.grossMoney - action.user.amount,
        totalSent:state.totalSent + action.user.amount
    })
}

const addSendTransactionFailed = (state,action) => {
    return updateObject(state)
}

const fetchSendTransactions = (state,action) => {

    return updateObject (state,{
        transactions:action.transactions
    })
}

const fetchSendTransactionsFailed = (state,action) => {
    return updateObject(state)
}

//Deposit//

const addDepositTransaction = (state,action) => {

    const amount = action.mpesa.amount;
    console.log(amount); 

    return updateObject(state,{
        transactions: action.mpesa,
        netMoney: state.netMoney + action.mpesa.amount
    })
}

const addDepositTransactionFailed = (state,action) => {
    return updateObject(state)
}

const fetchDepositTransactions = (state,action) => {
    console.log(action.transactions)

    return updateObject (state,{
        transactions:action.transactions
    })
}

const fetchDepositTransactionsFailed = (state,action) => {
    return updateObject(state)
}

//-------------------------------//

const reducer = (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.ADD_SEND_TRANSACTION : 
            return  addSendTransaction(state,action);
        case actionTypes.ADD_SEND_TRANSACTION_FAILED :
            return addSendTransactionFailed(state,action);
        case actionTypes.FETCH_SEND_TRANSACTIONS :
            return fetchSendTransactions(state,action);
        case actionTypes.FETCH_SEND_TRANSACTIONS_FAILED :
            return fetchSendTransactionsFailed(state,action); 
    //--------------------------------------------------------//
        //Deposit Reducer
    //--------------------------------------------------------//
        case actionTypes.ADD_DEPOSIT_TRANSACTION : 
            return addDepositTransaction(state,action);
        case actionTypes.ADD_DEPOSIT_TRANSACTION_FAILED :
            return addDepositTransactionFailed(state,action);
        case actionTypes.FETCH_DEPOSIT_TRANSACTIONS:
            return fetchDepositTransactions(state,action);
        case actionTypes.FETCH_DEPOSIT_TRANSACTIONS_FAILED :
            return fetchDepositTransactionsFailed(state,action); 

        default :
            return state;
    }
}

export default reducer;