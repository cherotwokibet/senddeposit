import React, { useContext, useEffect,useState } from 'react'
// import * as actions from '../store/actions/index'
// import {connect} from 'react-redux'
import { UserContext } from '../UserContext';
import axios from '../axios-base';
import './SendMoneyTransactions.css'

function SendMoneyTransactions(props) {

    const {fetchSend,transactions} = useContext(UserContext);
    const [trans,setTrans] = useState()

    useEffect(()=>{
        let isSubscribed = true;
        axios.get('/sendtransactions')
            .then((res)=>{
                fetchSend(res.data)
                setTrans(res.data)
                // console.log(res.data)
            }).catch((err)=> {
                console.log(err)
            });
        return () => (isSubscribed = false)

    },[])
    
    // console.log(transactions)

    return (
        
        <section className='transactions'>
            <h4 className='h4'>Send Transactions</h4>
                <ul className='border'>
                    {trans && trans.map((transaction,index) => (
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

// const mapStateToProps = state => {
    
//     return {
//         trans:state.sendDeposit.transactions
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         fetchSend: () => dispatch(actions.fetchSend())
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(SendMoneyTransactions)

export default SendMoneyTransactions;
