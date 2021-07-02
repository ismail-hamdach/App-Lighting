import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from "../components/auth/Login"
import ForgetPass from "../components/auth/MailVerification"
import ForgetPassSucc from "../components/auth/MailVerificationMessage"

const stack = createStackNavigator();

const AuthStack = () => {

  return (

      <stack.Navigator initialRouteName="login" headerMode="screen" screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#3d3d3d' },
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}>
         <stack.Screen name="login" component={Login} options={{
           headerShown: false,
         }}/> 
         <stack.Screen name="forget" options={{ title: 'Réinitialisation' }} component={ForgetPass}/> 
         <stack.Screen name="forgetPassSucc" options={{ title: 'Réinitialisation' }} component={ForgetPassSucc}/> 
      </stack.Navigator>
        
  );

}

export default AuthStack