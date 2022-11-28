import React, { createContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import { app } from '../../firebase.config';
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accountType, setAccountType] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const thirdPartyLogin = (provider) => signInWithPopup(auth, provider);

    const emailRegistration = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);
    const emailLogin = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);
    const updateUser = (displayName, photoURL) =>
        updateProfile(auth.currentUser, { displayName, photoURL });

    const logout = () => signOut(auth);


    useEffect(() => {
        if (user && localStorage.getItem('token')) {
            const { accountType } = jwt_decode(localStorage.getItem('token'));
            setAccountType(accountType);
        } else {
            setAccountType('');
        }
    }, [user]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (localStorage.getItem('token')) {
                const { accountType } = jwt_decode(localStorage.getItem('token'));
                setAccountType(accountType);
                setUser(currentUser);
            }
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const authInfo = {
        user,
        thirdPartyLogin,
        emailRegistration,
        emailLogin,
        updateUser,
        setUser,
        logout,
        isLoading,
        setIsLoading,
        accountType,
        setAccountType
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;