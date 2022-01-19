import axios from '../../axios-base';

import * as actionTypes from './actionTypes';

export const addDepositTransaction = (mpesa) => {
    console.log(mpesa)
    return {
        type:actionTypes.ADD_DEPOSIT_TRANSACTION,
        mpesa
    }
}
export const addDepositTransactionFailed = (error) => {
    return {
        type:actionTypes.ADD_DEPOSIT_TRANSACTION_FAILED,
        error
    }
}

export const fetchDepositTransactions = (transactions) =>{
    return {
        type:actionTypes.FETCH_DEPOSIT_TRANSACTIONS,
        transactions
    }
}

export const fetchDepositTransactionsFailed = (error) =>{
    return {
        type:actionTypes.FETCH_DEPOSIT_TRANSACTIONS_FAILED,
        error
    }
}


export const deposit = (userData) => {
    // console.log(userData)
        axios.post('/deposittransactions',userData)
            .then(res => {
                console.log(res.data);
                addDepositTransaction(res.data)
            }).catch(err => {
                addDepositTransactionFailed(err)
            });
        
    
}

export const fetchDeposit = () => {
    return dispatch => {
        axios.get('/deposittransactions')
            .then(res => {
                console.log(res.data);
                dispatch(fetchDepositTransactions(res.data))
            }).catch(err => {
                dispatch(fetchDepositTransactionsFailed(err))
            });
    }
}

