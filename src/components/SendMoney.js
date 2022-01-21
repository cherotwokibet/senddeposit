import React, { useContext, useState } from 'react'
// import PropTypes from 'prop-types'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import axios from '../axios-base';
import style from './SendMoney.module.css'
// import {connect} from 'react-redux'

// import * as actions from '../store/actions/index';

import { UserContext } from '../UserContext';

function SendMoney(props) {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    const [error,setError] = useState(false);

    // const sendDeposit = useSelector(state => state.sendDeposit);
    // const dispatch = useDispatch();


    const MyTextInput = ({ label, ...props }) => {
        //We can use field meta to show an error message if 
        // the field is invalid and it has been touched/visited

        const [field, meta] = useField(props);
        return (
            <>
                <label htmlFor={props.id || props.name}>{label}</label>
                <input className="text-input" {...field} {...props} />
                {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
                ) : null}
            </>
        );
    };


    return (
        <section>
            <h2 className={style.h2} >SEND MONEY </h2>
            <Formik
                initialValues={{
                    fullName: '',
                    email: '',
                    amount:0
                }}
                validationSchema={Yup.object({
                    fullName: Yup.string().required(<span className={style.error_message}>Required</span>),
                    email: Yup.string().email(<span className={style.error_message}>Invalid email address</span> ).required(<span className={style.error_message}>Required</span>),
                    amount: Yup.number().min(1,<span className={style.error_message}>Min 1 digit</span> ).required(<span>Required</span>)
                })}
                
                onSubmit={(values, { setSubmitting,resetForm }) => {
                    // console.log(values);
                    
                    const amountNumber = values.amount;
                    
                    if(amountNumber > user.netMoney) {
                        setError(true);
                        return error ? swal('The amount should be less than your TOTAL BALANCE: '+user.netMoney):''
                    }

                    //dispatch to the store
                    // props.addSendTrans(formDataObject);
                    user.send(values);
                    axios.post('/sendtransactions',values)
                        .then(res => {
                            console.log(res.data);
                        }).catch(err => {
                            console.log(err)
                        });
                    // user.deposit(values);


                    setTimeout(() => {
                        // console.log(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        resetForm({});
                    }, 400);
                }}
            >
                <Form className={style.form}>
                    
                    <MyTextInput
                        label="Full Name : "
                        name="fullName"
                        type="text"
                        placeholder="Jane Doe"
                    />
                    <br/>

                    <MyTextInput
                        label="Email Address : "
                        name="email"
                        type="email"
                        placeholder="jane@sd.com"
                    />
                    <br/>

                    <MyTextInput
                        label="Amount : "
                        name="amount"
                        type= "number"
                    />
                    <br/>

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <button type='button' onClick={()=>navigate('/sendtrans')} className={style.view}> Transactions </button>
        </section>
    )
}




// const mapDispatchToProps = dispatch => {
//     return {
//         addSendTrans: (formData) => dispatch(actions.send(formData))
//     }
// }

// export default connect(null,mapDispatchToProps)(SendMoney)

export default SendMoney;