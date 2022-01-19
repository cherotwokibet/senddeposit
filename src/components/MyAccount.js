import React, { useContext } from 'react'
// import propTypes from 'prop-types'
// import {connect} from 'react-redux'



import DonutChart from './DonutChart'
import DepositMoney from './DepositMoney'
import DepositMoneyTransactions from './DepositMoneyTransactions'
import SendMoney from './SendMoney'
import SendMoneyTransactions from './SendMoneyTransactions'
import { UserContext } from '../UserContext'
// import './comp.css'

function MyAccount(props) {
    const value = useContext(UserContext);

    return (
        <section>
            <h2>My Account</h2>
            <div className='information'>
                <span>
                    Ksh {value.totalSent} 
                        <br/>
                    Total Sent
                </span>
                <span>
                    <DonutChart percentage={Math.floor(value.netMoney/value.grossMoney)*100}/>
                </span>
                <span>
                    Ksh {value.netMoney} 
                        <br/>
                    Net Money
                </span>
            </div>
            {/* <section>
                <DepositMoney/>
            </section> */}
            <section>
                <SendMoney/>
            </section>
        </section>    
    )
}

// const mapStateToProps = state => {
    
//     return {
//         totalSent:state.sendDeposit.totalSent,
//         netMoney:state.sendDeposit.netMoney,
//         grossMoney:state.sendDeposit.grossMoney
//     }
// }

// export default connect(mapStateToProps)(MyAccount)

export default MyAccount;

// MyAccount.propTypes = {
//     grossMoney: propTypes.number.isRequired,
//     netMoney: propTypes.number.isRequired,
//     totalSent: propTypes.number.isRequired   
// }