import React, { useCallback, useContext, useEffect } from 'react'
import axios from '../axios-base'
// import * as actions from '../store/actions/index'
// import {connect} from 'react-redux'
import { UserContext } from '../UserContext';


function DepositMoneyTransactions(props) {
    
    const {fetchDeposit,transactions} = useContext(UserContext);
    
    useEffect(()=>{
        let isSubscribed = true;

        axios.get('/deposittransactions')
            .then(res => {
                fetchDeposit(res.data);
            }).catch(err => {
                console.log(err);
            });
        return () => (isSubscribed = false)
    },[])

    
        
    // useEffect(()=> {
    //     fetchDeposit(deposits);
    // },[fetchDeposit,deposits]);
    
    console.log(transactions);
    

    return (   
        <section className='transactions'>
            <h4 className='align-left'>Deposit Transactions</h4>
            <ul>
                {transactions && transactions.map((transaction,index) => (
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


// const mapStateToProps = state => {
    
//     return {
//         deposits:state.sendDeposit.transactions
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         fetchDeposit: () => dispatch(actions.fetchDeposit())
//     }
// }


// export default connect(mapStateToProps,mapDispatchToProps)(DepositMoneyTransactions)

export default DepositMoneyTransactions;

