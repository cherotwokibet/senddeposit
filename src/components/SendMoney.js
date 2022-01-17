import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
// import {useSelector,useDispatch} from 'react-redux';
import swal from 'sweetalert'
import {connect} from 'react-redux'
import './comp.css'

import * as actions from '../store/actions/index';

function SendMoney(props) {

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
            <h2>Send Money </h2>
            <Formik
                initialValues={{
                    fullName: '',
                    email: '',
                    amount:0
                }}
                validationSchema={Yup.object({
                    fullName: Yup.string().required('Required'),
                    email: Yup.string().email('Invalid email address').required('Required'),
                    amount: Yup.number().min(1,'Min 1 digit').required('Required')
                })}
                
                onSubmit={(values, { setSubmitting,resetForm }) => {
                    // console.log(values);
                    const formData = JSON.stringify(values, null, 2);
                    const formDataObject = JSON.parse(formData);
                    const amountNumber = formDataObject.amount;
                    // console.log(amountNumber);

                    // console.log(amountNumber);

                    if(amountNumber > props.netMoney) {
                        setError(true);
                        return error ? swal('The amount should be less than your TOTAL BALANCE: '+props.netMoney):''
                    }

                    //dispatch to the store
                    props.addSendTrans(formDataObject);
                    


                    setTimeout(() => {
                        // console.log(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        resetForm({});
                    }, 400);
                }}
            >
                <Form>
                    
                    <MyTextInput
                        label="Full Name"
                        name="fullName"
                        type="text"
                        placeholder="Jane Doe"
                    />

                    <MyTextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="jane@sd.com"
                    />

                    <MyTextInput
                        label="Amount"
                        name="amount"
                        type= "number"
                    />


                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </section>
    )
}




const mapDispatchToProps = dispatch => {
    return {
        addSendTrans: (formData) => dispatch(actions.send(formData))
    }
}

export default connect(null,mapDispatchToProps)(SendMoney)

