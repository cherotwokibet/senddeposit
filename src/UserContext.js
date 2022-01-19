import React, { createContext, useEffect, useReducer, useState} from 'react'
import reducer from './store/reducers/sendDeposit';
// import * as actions from './store/actions/index';


export const UserContext = createContext();

export const UserProvider = (props) => {

    const initialState = {
        grossMoney:50000,
        netMoney:50000,
        totalSent:0,
        transactions:[]
    }
    const [state,dispatch] = useReducer(reducer,initialState);

    const actions = { 
        ADD_DEPOSIT_TRANSACTION : 'ADD_DEPOSIT_TRANSACTION',
        FETCH_DEPOSIT_TRANSACTIONS : 'FETCH_DEPOSIT_TRANSACTIONS',
        ADD_SEND_TRANSACTION : 'ADD_SEND_TRANSACTION',
        FETCH_SEND_TRANSACTIONS : 'FETCH_SEND_TRANSACTIONS'
    }



    const value = {
        grossMoney:state.grossMoney,
        netMoney:state.netMoney,
        totalSent:state.totalSent,
        transactions:state.transactions,
        send:(user)=>{
            console.log(user)
            dispatch({
                type:actions.ADD_SEND_TRANSACTION,
                user
            });
        },
        deposit:(amount) => {
            console.log(amount)
            
            dispatch({
                type:actions.ADD_DEPOSIT_TRANSACTION,
                amount
            });
            // dispatch(depo);
        },
        fetchSend: (transactions) => {
            dispatch({
                type:actions.FETCH_SEND_TRANSACTIONS,
                transactions
            })
        },
        fetchDeposit:(transactions) => {
            dispatch({
                type:actions.FETCH_DEPOSIT_TRANSACTIONS,
                transactions
            })
        }

    }
    
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

