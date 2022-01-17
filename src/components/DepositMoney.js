import React,{useState} from 'react'
// import PropTypes from 'prop-types'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
// import {useSelector,useDispatch} from 'react-redux';
import swal from 'sweetalert'
import {connect} from 'react-redux'
import './comp.css'

import * as actions from '../store/actions/index';


function DepositMoney(props) {

    const [error,setError] = useState(false);

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
            <h2>Deposit Money </h2>
            <Formik
                initialValues={{
                    amount:0
                }}
                validationSchema={Yup.object({
                    amount: Yup.number().min(1,'Min 1 digit').required('Required')
                })}
                
                onSubmit={(values, { setSubmitting,resetForm }) => {
                    // console.log(values);
                    const amount = values.amount;

                    console.log(amount);

                    if(amount > Number.MAX_SAFE_INTEGER) {
                        setError(true);
                        return error ? swal('The amount should be REASONABLE '):''
                    }

                    //dispatch to the store
                    props.depositMpesa(values);

                    setTimeout(() => {
                        // console.log(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        resetForm({});
                    }, 400);
                }}
            >
                <Form>

                    <MyTextInput
                        label="MPESA"
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
        depositMpesa: (formData) => dispatch(actions.deposit(formData))
    }
}


export default connect(null,mapDispatchToProps)(DepositMoney)
