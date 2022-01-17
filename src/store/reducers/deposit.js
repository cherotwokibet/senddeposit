import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    transactions:[]
}

const addDepositTransaction = (state,action) => {

    const newSendTrans = action.user; 

    return updateObject(state,{
        transactions:state.transactions.concat(newSendTrans)
    })
}

const addDepositTransactionFailed = (state,action) => {
    return updateObject(state)
}

const fetchDepositTransactions = (state,action) => {
    return updateObject (state,{
        transactions:action.transactions
    })
}

const fetchDepositTransactionsFailed = (state,action) => {
    return updateObject(state)
}

const reducer = (state=initialState,action) => {
    switch (action.type) {
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
