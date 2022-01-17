import React from 'react'
import propTypes from 'prop-types'
import {connect} from 'react-redux'



import DonutChart from './DonutChart'
import DepositMoney from './DepositMoney'
import DepositMoneyTransactions from './DepositMoneyTransactions'
import SendMoney from './SendMoney'
import SendMoneyTransactions from './SendMoneyTransactions'
// import './comp.css'

function MyAccount(props) {
    
    return (
        <section>
            <h2>My Account</h2>
            <div className='information'>
                <span>
                    Ksh {props.totalSent} 
                        <br/>
                    Total Sent
                </span>
                <span>
                    <DonutChart percentage={Math.floor(props.netMoney/props.grossMoney)*100}/>
                </span>
                <span>
                    Ksh {props.netMoney} 
                        <br/>
                    Net Money
                </span>
            </div>
            <section>
                <DepositMoney/>
            </section>
            <section>
                <DepositMoneyTransactions/>
            </section>

            <section>
                <SendMoney/>
            </section>

            <section className='transactions'>
                <SendMoneyTransactions/>
            </section>
            
        </section>    
    )
}

const mapStateToProps = state => {
    
    return {
        totalSent:state.sendDeposit.totalSent,
        netMoney:state.sendDeposit.netMoney,
        grossMoney:state.sendDeposit.grossMoney
    }
}

export default connect(mapStateToProps)(MyAccount)


MyAccount.propTypes = {
    grossMoney: propTypes.number.isRequired,
    netMoney: propTypes.number.isRequired,
    totalSent: propTypes.number.isRequired   
}