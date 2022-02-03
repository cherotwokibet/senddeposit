import React from 'react'
import { Navigate } from 'react-router-dom';

import { auth} from '../firebaseConfig'
// import { UserContext } from '../contexts/UserContext'

export default function PrivateRoute({children}) {
    // console.log(auth)
    // const {currentUser} = useContext(UserContext)
    return (
        auth.currentUser ? children : <Navigate to='/login'/>
    )
}

