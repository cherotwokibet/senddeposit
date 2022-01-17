import React, { useEffect } from 'react'
import * as actions from '../store/actions/index'
import {connect} from 'react-redux'

import './comp.css';

function SendMoneyTransactions(props) {
    
    useEffect(()=> {
        props.fetchSend();
    },[]);
    
    // console.log(props.trans)

    return (
        <section className='transactions'>
            <h4 className='align-left'>Send Transactions</h4>
            <ul>
                {props.trans.map((transaction,index) => (
                    <li key={index}>
                        <span className='align-left'>
                            <span>{transaction.fullName}</span> <br/>
                            <span className='email'>{transaction.email}</span>
                        </span>
                        <span>Ksh: {transaction.amount}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

const mapStateToProps = state => {
    
    return {
        trans:state.sendDeposit.transactions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSend: () => dispatch(actions.fetchSend())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SendMoneyTransactions)

