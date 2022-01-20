import React,{useContext, useState} from 'react'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
// import {useSelector,useDispatch} from 'react-redux';
import swal from 'sweetalert'
import { useNavigate } from "react-router-dom";
// import {connect} from 'react-redux'
import axios from '../axios-base';
import style from  './DepositMoney.module.css';
// import * as actions from '../store/actions/index';
import { UserContext } from '../UserContext';


function DepositMoney(props) {
    const user = useContext(UserContext);

    const [error,setError] = useState(false);
    const navigate = useNavigate();

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
        <section className='deposit'>
            <h2 className={style.h2}>DEPOSIT MONEY</h2>
            <Formik
                initialValues={{
                    amount:0
                }}
                validationSchema={Yup.object({
                    amount: Yup.number().min(1,<span className={style.error_message}>Min 1 digit</span>).required(<span className={style.error_message}>Required</span>)
                })}
                
                onSubmit={(values, { setSubmitting,resetForm }) => {
                    // console.log(values);
                    const amount = values.amount;

                    // console.log(amount);

                    if(amount > Number.MAX_SAFE_INTEGER) {
                        setError(true);
                        return error ? swal('The amount should be REASONABLE '):''
                    }

                    //dispatch to the store
                    user.deposit(values);
                    axios.post('/deposittransactions',values)
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
                        label= "Mpesa : "
                        name="amount"
                        type= "number"
                    />
                    <br/>

                    <button type="submit" className={style.button} >Submit</button>
                    <br/>
                </Form>
            </Formik>
            <button type='button' className={style.view} onClick={()=>navigate('/deposittrans')}>Transactions</button>
        </section>
    )
}



// const mapDispatchToProps = dispatch => {
//     return {
//         depositMpesa: (formData) => dispatch(actions.deposit(formData))
//     }
// }


// export default connect(null,mapDispatchToProps)(DepositMoney)

export default DepositMoney;