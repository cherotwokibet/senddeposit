import React, { useState,useEffect,useRef,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {v4 as uuidv4} from 'uuid'

import {
    Typography,
    Autocomplete,
    Avatar,
    CssBaseline,
    Button,
    Grid,
    Radio,
    Container,
    TextField,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    FormControl,
    Alert,
} from '@mui/material';

import {
    KeyboardArrowRight,
    MonetizationOnOutlined
} from '@mui/icons-material';

import { collection, addDoc, getDocs } from "firebase/firestore"; 
import {auth, db} from '../firebaseConfig';
import { UserContext } from '../contexts/UserContext'


export default function SendMoney() {
    
    const navigate = useNavigate()
    const [error,setError] = useState()
    const [loading,setLoading] = useState(false)
    const [ep,setEp] = useState('email')
    const [choosen,setChoosen] = useState()
    const isMounted = useRef(false);
    const [users,setUsers] = useState([])
    const {send} = useContext(UserContext)

    const fetchUsers = () => {
        getDocs(collection(db,'users'))
            .then((querySnapshot) => {
                let users_fire = []
                querySnapshot.forEach((doc)=>{
                    let data = doc.data()
                    if(data.email !== auth.currentUser.email) {
                        users_fire.push(data)
                    }
                    // console.log(data)
                })
                if(isMounted.current) {
                    setUsers(users_fire)
                }
                console.log(users_fire)
            })
            .catch((e) => {
                isMounted.current && console.error(e)
            })

    }

    useEffect (()=>{
        isMounted.current = true
        fetchUsers()
        return () => (isMounted.current = false)
    },[])
 
    const formik = useFormik({
        initialValues : { 
            amount:5
        },
        validationSchema : Yup.object({
            amount: Yup.number().positive().nullable(false).min(5,'Minimum amount you can send is 5').required('Required'),
        }),
        onSubmit : (values, { resetForm,setSubmitting }) => {
            
            setError('')
            setLoading(true)

            const toUpdate = {...choosen,...values}

            addDoc(collection(db,"transactions"),{
                ...toUpdate,
                actorId: auth.currentUser.uid,
                id: uuidv4(),
                type:'send'
                
            }).then(()=>{ 
                console.log("Doc written ") 
                send(values.amount)
            })
            .catch((e)=>{
                setError('Failed To Send')
                console.error("Error adding doc",e)
            })
            .finally(()=>{
                setTimeout(()=>{
                    setLoading(false)
                    setSubmitting(false)
                    resetForm()
                    navigate('/transactions')
                },2000)
            })

        }
    })


    return (
        
        <Container component='main' >
            <CssBaseline />

            {/* Header*/}

            <Grid container flex={1} flexDirection='column'  alignItems='center' >
                <Grid item>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <MonetizationOnOutlined />
                    </Avatar>

                </Grid>

                <Grid item>
                    <Typography 
                        component="h1" 
                        variant="h5"
                        color='textSecondary'
                        gutterBottom
                        sx={{
                            marginBottom:'20px',
                        }}
                    >
                            Send Money
                    </Typography>
                    { error && <Alert severity='error' sx={{color:'red',background:'inherit'}}>{error}</Alert>}
                    
                </Grid>

                
            </Grid>

            {/*form*/}

            <Grid container flex={1} flexDirection='column' alignItems='center'>
                <Grid item>
                    <form onSubmit={formik.handleSubmit} >
                        
                        <FormControl sx={{
                                marginTop:'20px',
                                marginBottom:'5px',
                                display:'block'
                            }}
                        >
                            
                            <FormLabel sx={{
                                '&.Mui-focused':{color:'#666666'},
                                }} 
                            > 
                                Email / Phone 
                            </FormLabel>

                            <RadioGroup 
                                value={ep} 
                                onChange={(e)=> setEp(e.target.value)}
                            >
                                <FormControlLabel value='email' control={<Radio color='secondary' />} label='Email' />
                                <FormControlLabel value='phone' control={<Radio color='secondary'/>} label='Phone' />
                                
                            </RadioGroup>
                        </FormControl>

                        {/* Autocomplete*/}

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={users}
                            getOptionLabel={(option) => ( 
                                ep === 'email' ? option.email : option.phone 
                            )}
                            sx={{ width: 300 }}
                            onChange={(e,v)=>{
                                setChoosen(v)
                            }}
                            disableClearable
                            renderInput={(params) => (
                                <TextField 
                                    {...params} 
                                    label={ep} 
                                />
                            )}
                        />

                        {/*Amount*/}

                        <TextField
                            // onChange={(e)=>setAmount(e.target.value)}
                            label='amount'
                            id='amount'
                            name='amount'
                            type='number'
                            variant= 'outlined'
                            color='secondary'
                            fullWidth
                            required
                            sx={{
                                marginTop:'20px',
                                marginBottom:'20px',
                                display:'block'
                            }}
                            {...formik.getFieldProps('amount')}
                        />
                        {formik.touched.amount && formik.errors.amount ? (
                            <Alert severity='error' sx={{color:'red',background:'inherit'}}>{formik.errors.amount}</Alert>
                        ) : null}

                        <br/>
                        {/**/}

                        <Button
                            type="submit"
                            disabled={loading}
                            color='secondary'
                            variant="contained"
                            endIcon={<KeyboardArrowRight/>}
                        >
                            SEND
                        </Button>
                        
                    </form>
                </Grid>

            </Grid>
            
        </Container>

    )
}

