import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firebase from "firebase/app"
import 'firebase/app'
import "firebase/firestore";

import { AuthContext } from '../providers/AuthProvider'
import AuthStack from '../navigation/AuthStack'
import AdminStack from '../navigation/AdminStack'
import ClientStack from '../navigation/ClientStack'
import Loading from '../components/effects/Loading';




const Rootes = () => {
  
  const {user, setUser, role, setRole} = useContext(AuthContext);
  
  const getRole = async (uid, roleRetreived) => {

    var role = [];
    var db = firebase.firestore();
    await db.collection("users")
        .where('uid', '==', uid)
        .get()
        .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            role = doc.data().role;
        });
    });
    console.log('hello im  here im rendring ' + role)
    db = null;
    roleRetreived(role)
}

  const onAuthStateChanged = async (user) => {
      setUser(user)
      setTimeout(() => {
        if(user) 
        getRole(user.uid, setRole)
      }, 20)

  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;                                    
  }, [user])

  return (
    <NavigationContainer>
    
        { user ? (role !== 'none' ? (role === "admin" ? <AdminStack/> : <ClientStack/>) : <Loading/>) : <AuthStack/> }

    </NavigationContainer>
   
  );
}

export default Rootes