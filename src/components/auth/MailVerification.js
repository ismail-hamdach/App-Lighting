import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase/app'
import "firebase/auth";

const ForgetPass = ({navigation}) => {

  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  return (
    <View style={styles.main_container}>
        <Text style={styles.textetape}> Etape 1 </Text>
        <Text style={styles.text}> Veuillez saisir votre adresse e-mail</Text>
        <TextInput
          placeholder={'Example@mail.example'}
          style={styles.email_input}
          onChangeText= {(val) => setEmail(val)}
        />
        
        <TouchableOpacity style={styles.loginbuttom} 
          onPress={ async () => {
            try{
                await firebase.auth().sendPasswordResetEmail(email);
                navigation.navigate("forgetPassSucc")
            }catch(e){
                setErr(e.message);
            }}}
        >
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}> Vérifiez  </Text>
        </TouchableOpacity>
        <Text style={{color: 'red', marginTop: '10%'}}>{err}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  container_body: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '100%'
  },
  verificetion: {
    color: '#FFf',
    justifyContent: 'center',
    alignItems: 'center',
    top:15,
  },
  text: {
    color: '#333',
    fontWeight: 'bold',
    bottom:30,
    alignItems: 'flex-start',
    width: '80%'
  },
  textetape: {
    color: '#FF7368',
    fontWeight: 'bold',
    bottom:40,
    alignItems: 'flex-start',
    width: '80%'

  },
  title:{
    top:2.5,
    fontWeight: 'bold',
    borderBottomWidth:3,
    borderColor:"#140A7E",
    borderRadius:3,   
    },
  email_input: {
    borderBottomWidth:1,
    height:42,
    width:"80%",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#ffff",
    borderColor: "#045C64",
    paddingLeft: 15,
    marginTop: 30,
  
  },

  loginbuttom: {
    marginTop: 40,
    alignItems:'center',
    justifyContent: 'center',
    width:'50%',
    height:60,
    borderRadius: 30,
    backgroundColor:"#21C3A7",
  },
  
});

export default ForgetPass