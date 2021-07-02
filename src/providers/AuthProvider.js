import React, { createContext, useState } from 'react'
import firebase from 'firebase/app'
import "firebase/auth";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    var firebaseConfig = {
        apiKey: "AIzaSyBqfcQuhkB6GwcFZB_1lt5p8tvCv4iPpEA",
        authDomain: "app-lamps.firebaseapp.com",
        projectId: "app-lamps",
        storageBucket: "app-lamps.appspot.com",
        messagingSenderId: "719763158392",
        appId: "1:719763158392:web:52b282ba6f0c3b97c8448d"
    };
    
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(null);
    const [role, setRole] = useState('none');
    if (!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }
      //---------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    return (
        <AuthContext.Provider value = {{
            user, 
            setUser,
            err,
            setErr,
            role,
            setRole,
            login: async (email, password) => {
                setUser(email)
                try{
                    await firebase.auth().signInWithEmailAndPassword(email, password);
                    setErr("");
                }catch(e){
                    console.log(e);
                    setErr(e.message);
                }
            },
            register: async (email, password) => {
                try{
                    await firebase.auth().createUserWithEmailAndPassword(email, password);
                    
                }catch(e){
                    console.log(e);
                    
                }
            },
            logOut: async () => {
                try{
                    await firebase.auth().signOut();
                    console.log("log out");
                    setErr("");
                }catch(e){
                    console.log(e);
                }
            },
            
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext