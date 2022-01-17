import axios from '../../axios-base';

import * as actionTypes from './actionTypes';

export const addDepositTransaction = (mpesa) => {
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
    return dispatch => {
        axios.post('/deposittransactions',userData)
            .then(res => {
                dispatch(addDepositTransaction(res.data))
            }).catch(err => {
                dispatch(addDepositTransactionFailed(err))
            });
    }
}

export const fetchDeposit = () => {
    return dispatch => {
        axios.get('/deposittransactions')
            .then(res => {
                dispatch(fetchDepositTransactions(res.data))
            }).catch(err => {
                dispatch(fetchDepositTransactionsFailed(err))
            });
    }
}

