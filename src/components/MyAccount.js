import React, { useContext } from 'react'
// import {connect} from 'react-redux'
import style from './MyAccount.module.css';




import DonutChart from './DonutChart'
import { UserContext } from '../UserContext'

function MyAccount(props) {

    const value = useContext(UserContext);

    return (
        <section>
            <h2 className={style.h2}>MY ACCOUNT</h2>
            <div className={style.information}>
                <span className={style.txt}>
                    Ksh: {value.totalSent} 
                        <br/>
                    Total Sent
                </span>
                <span>
                    <DonutChart percentage={Math.floor(value.netMoney/value.grossMoney)*100}/>
                </span>
                <span className={style.txt}>
                    Ksh: {value.netMoney} 
                        <br/>
                    Net Money
                </span>
            </div>
            
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

