import React, { createContext, useEffect, useState } from 'react';
import {getAuth,onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,signOut} from 'firebase/auth'
import app from '../firebase/firebase.config';
const auth = getAuth(app);

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user,setUser] = useState({});
    //register with email and password

    const registerWithEmailPassword = (email,password)=>{
            return createUserWithEmailAndPassword(auth,email,password);
    }

    //logout user

    const logOutUser = ()=>{
        return signOut(auth);
    }


    // user login,logout observer

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
        });

        return ()=>{
            return unsubscribe();
        }
    },[]);

    const authInfo = {user,registerWithEmailPassword,logOutUser}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;