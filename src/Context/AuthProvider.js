import React, { createContext, useEffect, useState } from 'react';
import {getAuth,onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,signOut} from 'firebase/auth'
import app from '../firebase/firebase.config';
const auth = getAuth(app);

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user,setUser] = useState({});

    const [loading,setLoading] = useState(true);

    //register with email and password

    const registerWithEmailPassword = (email,password)=>{
             setLoading(true);
            return createUserWithEmailAndPassword(auth,email,password);
    }

    //login user with email and password

    const loginUserWithEmailPassword = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    //logout user

    const logOutUser = ()=>{
        return signOut(auth);
    }


    // user login,logout observer

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        });

        return ()=>{
            return unsubscribe();
        }
    },[]);

    const authInfo = {user,registerWithEmailPassword,logOutUser,loginUserWithEmailPassword}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;