import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function App({navigation}) {
  return (
    <View style={styles.main_container}>

      
        <Text style={styles.textetape}> Etape 2 </Text>
        <Text style={styles.text}>S'il vous plaît vérifiez votre boîte email </Text>
        <Text style={styles.text}>nous vous avons envoyé un lien</Text>
        <Text style={styles.text}>pour réinitialiser votre mot de passe</Text>

        

        <TouchableOpacity style={styles.loginbuttom}
          onPress={() => {navigation.navigate('login')}} >
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Aller vers connexion</Text>
        </TouchableOpacity>
     
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
  image: {
    flex: 6,
    width: 250,
    height: 200,
  },
  container_body: {    
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '80%'
  },
  verificetion: {
    color: '#FFf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#343434',
    fontWeight: 'bold',
    bottom:40,

  },
  textetape: {
    color: '#FF7368',
    fontWeight: 'bold',
    bottom:40,

  },
  title:{
    top:2.5,
    fontWeight: 'bold',
    borderBottomWidth:3,
    borderColor:"#140A7E",
    borderRadius:3,   
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
