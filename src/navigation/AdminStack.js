import React, { useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import DashBoard from "../components/admin/DashBoard"


import {AuthContext} from '../providers/AuthProvider'

const stack = createStackNavigator();

const AuthStack = () => {

  const {logOut} = useContext(AuthContext);

  return (
      
      <stack.Navigator initialRouteName="DashBoard" 
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#21C3A7' },
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}>
         <stack.Screen name="DashBoard" component={DashBoard} options={{
          headerRight: () => (
            <View style={{width: '100%', marginRight: 5 ,}}>
              <TouchableOpacity
                onPress={ () => {logOut()}}
                style= {{ borderRadius: 10, padding: 10, width: '100%',}}
              >
                <Text  
                  style= {{color: '#ffff', fontWeight: 'bold'}}
                >Se Déconnécter</Text>
              </TouchableOpacity>
            </View>
            
          ),
        }}/> 
      </stack.Navigator>
        
  );

}

export default AuthStack