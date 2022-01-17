import axios from '../../axios-base';

import * as actionTypes from './actionTypes';


export const addSendTransaction = (user) => {
    return {
        type:actionTypes.ADD_SEND_TRANSACTION,
        user
    }
}

export const addSendTransactionFailed = (error) => {
    return {
        type:actionTypes.ADD_SEND_TRANSACTION_FAILED,
        error
    }
}

export const fetchSendTransactions = (transactions) =>{

    return {
        type:actionTypes.FETCH_SEND_TRANSACTIONS,
        transactions
    }
}
export const fetchSendTransactionsFailed = (error) =>{
    return {
        type:actionTypes.FETCH_SEND_TRANSACTIONS_FAILED,
        error
    }
}

export const send = (userData) => {
    // console.log(userData)
    return dispatch => {
        axios.post('/sendtransactions',userData)
            .then(res => {
                // console.log(res.data);
                dispatch(addSendTransaction(res.data))
            }).catch(err => {
                dispatch(addSendTransactionFailed(err))
            });
    }
}

export const fetchSend = () => {
    return dispatch => {
        axios.get('/sendtransactions')
            .then(res => {
                const fetchedSends = res.data;
                
                console.log(fetchedSends);
                dispatch(fetchSendTransactions(fetchedSends))

            }).catch(err=> {
                dispatch(fetchSendTransactionsFailed(err))
            })
    }
}