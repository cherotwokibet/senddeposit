import React from 'react'
import axios from 'axios'
import { 
    Grid, 
    Paper, 
    Avatar, 
    Typography, 
    TextField, 
    Button 
} from '@mui/material'

import { AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon} from '@mui/icons-material'
import {
    Radio, 
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    Checkbox,
    FormHelperText
} from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
  } from "../firebaseConfig";

const Signup = () => {

    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }

    
    const initialValues = {
        name: '',
        email: '',
        gender: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        termsAndConditions: false
    }
    
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        gender: Yup.string().oneOf(["male", "female"], "Required").required("Required"),
        phoneNumber: Yup.number().typeError("Enter valid Phone Number").required('Required'),
        password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
        termsAndConditions: Yup.string().oneOf(["true"], "Accept terms & conditions")
    });

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const onSubmit = async (values, props) => {

        const userData = {
            name: values.name,
            email:values.email,
            phone:values.phoneNumber,
            password:values.password
        }

        registerWithEmailAndPassword(values.name, values.email, values.password)
            .then(navigate('myaccount'));

        // if (user) navigate("/myaccount");

        console.log(userData)
        // console.log(props)
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2000)
    }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form>
                            <Grid marginTop={2} marginBottom={2}>
                                <Field as={TextField} fullWidth name="name" label='Name'
                                    placeholder="Enter your name" helperText={<ErrorMessage name="name" />} 
                                />
                            </Grid>
                            <Grid marginTop={2}>
                                <Field as={TextField} fullWidth name="email" label='Email'
                                    placeholder="Enter your email" helperText={<ErrorMessage name="email" />} 
                                />
                            </Grid>
                            
                            <FormControl component="fieldset" style={marginTop}>
                                <FormLabel component="legend">Gender</FormLabel>
                                < Field as={RadioGroup} aria-label="gender" name="gender" style={{ display: 'initial' }}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </ Field>
                            </FormControl>    
                            
                            <FormHelperText><ErrorMessage name="gender" /></FormHelperText>

                            <Grid marginTop={2}>
                                <Field as={TextField} fullWidth name="phoneNumber" label='Phone Number'
                                    placeholder="Enter your phone number" helperText={<ErrorMessage name="phoneNumber" />} 
                                />
                            </Grid>

                            <Grid marginTop={2}>
                                <Field as={TextField} fullWidth name='password' type="password"
                                    label='Password' placeholder="Enter your password"
                                    helperText={<ErrorMessage name="password" />} 
                                />
                            </Grid>
                            <Grid marginTop={2}>
                                <Field as={TextField} fullWidth name="confirmPassword" type="password"
                                    label='Confirm Password' placeholder="Confirm your password"
                                    helperText={<ErrorMessage name="confirmPassword" />} 
                                />
                            </Grid>

                            <FormControlLabel
                                control={<Field as={Checkbox} name="termsAndConditions" />}
                                label="I accept the terms and conditions."
                            />
                            <FormHelperText><ErrorMessage name="termsAndConditions" /></FormHelperText>
                            <Button type='submit' variant='contained' disabled={props.isSubmitting}
                                color='primary'>{props.isSubmitting ? "Loading" : "Sign up"}</Button>

                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default Signup;