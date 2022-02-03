import React, { useState ,useEffect, useRef,useContext } from 'react'
import { Chart } from "react-google-charts";

import {
    Avatar,
    Card,
    Chip,
    Container,
    Rating,
    createTheme,
    Grid,
    Typography,
    CssBaseline,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Paper
} from '@mui/material'

import { 
    AccountBalanceWallet,
    AccountCircle,
    Email,
    Female,
    Male,
    PhoneAndroid,

} from '@mui/icons-material'

import { collection, getDocs,doc,onSnapshot } from "firebase/firestore"; 
import {db, auth} from '../firebaseConfig'
import { UserContext } from '../contexts/UserContext'

import driver from '../images/driver.png'


const theme = createTheme()


export default function MyAccount() {

    const isMounted = useRef(false);
    const isMounted2 = useRef(false);
    const [user,setUser] = useState();
    const {currentUser} = useContext(UserContext)
    const[netMoney,setNetMoney] = useState(0)
    const[totalSent,setTotalSent] = useState(0)
    
    const chartData = [
        ["Money", "Spending"],
        ["Total Sent", totalSent],
        ["Net Money", netMoney],
    ];

    const getMoney = () => {
        if(isMounted2.current){
            onSnapshot(doc(db, "money", currentUser.uid),(docs) => {
                const moneydata = docs.data()
                // console.log(moneydata.totalSent)
                // console.log(moneydata.netMoney)
                if(isMounted2.current){

                    setTotalSent(moneydata.totalSent)
                    setNetMoney(moneydata.netMoney)
                }
            })
        }
        
    }


    const fetchUser = () => {
        getDocs(collection(db,'users'))
            .then((querySnapshot) => {
                let user_fire = {}
                querySnapshot.forEach((doc)=>{
                    let data = doc.data()
                    if(data.email === auth.currentUser.email) {
                        user_fire = {...data}
                    }
                    // console.log(data)
                })
                if(isMounted.current) {
                    setUser(user_fire)

                }
                console.log(user_fire)
            })
            .catch((e) => {
                isMounted.current && console.error(e)
            })

    }

    useEffect (()=>{
        isMounted.current = true
        fetchUser()
        return () => (isMounted.current = false)
    },[])

    useEffect(()=> {
        isMounted2.current = true
        getMoney()
        return () => (isMounted2.current = false)        
    },[])


    return (

        <div style={{display:'flex'}}>
            <Container >
                <CssBaseline/>
                <Grid container flex={1}>
                    <Grid item xs={12}>
                        <Card sx={{
                            width:'100%',
                            marginTop:'20px',
                            height: "200px",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            filter: "contrast(75%)",
                            backgroundImage:"url(/wallpaper.jpeg)"
                        }} 
                        />
                    </Grid>

                </Grid>

                {/*header*/}

                <Grid container sx={{
                    position: "relative",
                    width: "calc(100%)",
                    top: "-60px",
                    alignItems: "flex-end",
                    "& .MuiGrid-item": {
                        margin: theme.spacing(1),
                    },
                }} flex={1} >
                    
                    <Grid item xs={6} md={3} >
                        <Avatar
                            alt='prof_pic'
                            src={driver}
                            sx={{
                                border: `3px solid white`,
                                width: theme.spacing(13),
                                height: theme.spacing(13),
                                boxShadow: theme.shadows[3],
                            }}
                        />
                    </Grid>
                    
                    <Grid item xs={12} md={3} >
                        <Typography noWrap sx={{flexGrow:1 }} variant='h5'> {user && user.name} </Typography>
                    </Grid>

                    <Grid item >
                        <Chip variant='outlined' icon={<AccountBalanceWallet/>} label='Account'/>

                    </Grid>

                    <Grid item>
                        <Rating name='read-only' value={4.3} readOnly/>

                    </Grid>

                </Grid>

                <Grid container alignItems='center' justifyContent='center'>
                    <Grid item >
                        <Typography>Account Details</Typography>
                    </Grid>
                </Grid>

                <Divider/>

                {/*user details*/}
                
                <Grid container flex={1}>
                    <Grid item xs={12} sx={{backgroundColor:'#f9f9f9'}}>
                            
                        <List>
                            <ListItem>
                                <ListItemIcon>{<AccountCircle/>}</ListItemIcon>
                                <ListItemText>{user && user.name}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon> { user && user.gender === 'male' ? <Male/> : <Female/>} </ListItemIcon>
                                <ListItemText>{user && user.gender}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>{<Email/>}</ListItemIcon>
                                <ListItemText>{user && user.email}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>{<PhoneAndroid/>}</ListItemIcon>
                                <ListItemText>{user && user.phone}</ListItemText>
                            </ListItem>
                        </List>
                        

                    </Grid>
                </Grid>


                <Divider/>

                {/*Chart*/}

                <Grid container flex={1}>
                    <Grid item xs={12}>
                        
                        <Paper >

                            <Chart
                                chartType="PieChart"
                                data={chartData}
                                options={{
                                    backgroundColor:'#f9f9f9',
                                    pieHole: 0.4,
                                    is3D: false,
                                }}
                            />
                        </Paper>

                        
                    </Grid>

                </Grid>

                
            </Container>
        </div>
    )
}

