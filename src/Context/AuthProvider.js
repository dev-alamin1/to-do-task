import React, { createContext, useEffect, useState } from 'react';
import {getAuth,onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,signOut,GoogleAuthProvider , signInWithPopup} from 'firebase/auth'
import app from '../firebase/firebase.config';
const auth = getAuth(app);

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user,setUser] = useState({});

    const [loading,setLoading] = useState(true);

    const googleProdiver = new GoogleAuthProvider;

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

    // login with google 

    const loginWithGoogle = ()=>{
        return signInWithPopup(auth,googleProdiver);
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

    const authInfo = {user,registerWithEmailPassword,
        logOutUser,loginUserWithEmailPassword,loginWithGoogle}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;