import React, { useEffect } from 'react'
import * as actions from '../store/actions/index'
import {connect} from 'react-redux'

import './comp.css';


function DepositMoneyTransactions(props) {
    
    useEffect(()=> {
        props.fetchDeposit();
    },[]);
    

    return (
        <section className='transactions'>
            <h4 className='align-left'>Deposit Transactions</h4>
            <ul>
                {props.deposits && props.deposits.map((transaction,index) => (
                    <li key={index}>
                        <span className='align-left'>
                            <span>MPESA </span> <br/>
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
        deposits:state.sendDeposit.transactions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDeposit: () => dispatch(actions.fetchDeposit())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(DepositMoneyTransactions)


