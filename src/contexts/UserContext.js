import React, { createContext, useEffect, useState } from 'react'
import { doc, updateDoc,increment } from "firebase/firestore";
import { auth, db } from '../firebaseConfig';


export const UserContext = createContext();

export const UserProvider = ({children}) => {

    
    const [currentUser,setCurrentUser] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    },[])
    

    

    const send = async (money) => {
        const moneyRef = doc(db, "money", currentUser.uid);
        // update money collection
        await updateDoc(moneyRef, {
            totalSent: increment(money),
            netMoney:increment(-money)
        })
    }

    

    const deposit = async (money) => {
        const moneyRef = doc(db, "money", currentUser.uid);
        // update money collection
        await updateDoc(moneyRef, {
            netMoney:increment(money)
        })
    }


    const value = {
        send,
        deposit,
        currentUser
    }
    
    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    )
}

