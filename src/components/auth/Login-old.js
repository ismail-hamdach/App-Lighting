import React, {useContext, useState, useEffect} from 'react'
import {StyleSheet, TextInput, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'

import AuthContext from '../../providers/AuthProvider';

const Login = ({navigation}) => {

  const {login, err} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, [])

  const singin = (email, password) => {
   
    if(email.length >= 1 && password.length >= 1){
       login(email,password);
    }
    
  }


  
  return ( isLoading ? 
    <View 
      // style={styles.container}
      >
      <ActivityIndicator size="large" color="#140A7E" />
    </View>
    :
    <View>
      <TextInput  placeholder={'Email'}/>
    </View>
    // <View style={styles.container}>
      
    //   <Text> Adresse e-mail </Text>
    //     <TextInput
    //       placeholder={'Example@mail.example'}
          
    //       onChangeText= {(val) => setEmail(val)}
    //     />
        
    //     <Text > Mot de passe </Text>

    //     <TextInput
    //       placeholder={'Mot de passe'}
          
    //       onChangeText= {(val) => setPassword(val)}
    //       secureTextEntry={true}
    //     />

    //     <Text >{
    //       err
    //     }</Text>

    //     <TouchableOpacity 
          
    //       onPress={() => navigation.navigate("forget")}  
    //     >
    //       <Text style={{ color: "orange" }}> Mot de passe oublié ? </Text>
    //     </TouchableOpacity>

    //     <View style={styles.loginbuttom}>

    //       <TouchableOpacity style={styles.TouchableOpacity}
    //         onPress={() => { 
    //           singin(email, password); }}
    //       >
    //         <Text style={{color: 'white'}}> Connexion </Text>
    //       </TouchableOpacity>
     
    //     </View>
    // </View>
  );
}



export default Login
