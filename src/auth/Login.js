import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import { LockOutlined as LockOutlinedIcon} from '@mui/icons-material';
import {FormControlLabel} from '@mui/material';
import {Checkbox} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { auth, logInWithEmailAndPassword } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

function Login ({ handleChange }) {

    const paperStyle = { padding: 20, height: '73vh', width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const initialValues = {
        username: '',
        password: '',
        remember: false
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().email('please enter valid email').required("Required"),
        password: Yup.string().required("Required")
    });

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const onSubmit = (values, props) => {


        logInWithEmailAndPassword(values.username,values.password);
        
        if(user) {
            navigate('/nav')
        } else {
            swal('Incorrect password/email')
        } 

        // console.log(values.password)
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2000)

    }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Grid marginBottom={2}>

                                <Field as={TextField} label='Email' name="username"
                                    placeholder='Enter email' fullWidth required
                                    helperText={<ErrorMessage  name="username" />}
                                />
                            </Grid>
                            <Grid marginTop={2}>

                                <Field as={TextField} label='Password' name="password"
                                    placeholder='Enter password' type='password' fullWidth required
                                    helperText={<ErrorMessage name="password" />} 
                                />
                            </Grid>
                            <Field as={FormControlLabel}
                                name='remember'
                                control={
                                    <Checkbox
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Sign in"}</Button>

                        </Form>
                    )}
                </Formik>
                
                <Typography > Do you have an account ?
                     <Link href="#" onClick={() => handleChange("event", 1)} >
                        Sign Up
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login;