import React, { useContext, useEffect, useState } from 'react';
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
  const [initializing, setInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  //Fetch role of the user
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
  
    db = null;
    roleRetreived(role)
  }

  //listener to user's state
  const onAuthStateChanged = async (user) => {
      setIsLoading(true);
      setUser(user);
      if(initializing) setInitializing(false);
      if(user){
        await getRole(user.uid, setRole);
      }
      setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    setIsLoading(false);
    return subscriber;                                    
  }, [user])

  if (initializing) return null;

  return (
    <NavigationContainer>

        { user ? (!isLoading  ? (role === "admin" ? <AdminStack/> : (role ? <ClientStack/> : <Loading />)) : <Loading/>) : <AuthStack/> }

    </NavigationContainer>
   
  );
}

export default Rootes