import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from "../components/home/Home"


const stack = createStackNavigator();

const AuthStack = () => {

  return (

      <stack.Navigator initialRouteName="login" headerMode="none">
         <stack.Screen name="login" component={Login}/> 
         <stack.Screen name="forget" component={Login}/> 
         <stack.Screen name="forgetPassSucc" component={Login}/> 
      </stack.Navigator>
        
  );

}

export default AuthStack