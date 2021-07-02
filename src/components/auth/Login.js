import React, { useEffect, useState, useContext } from 'react'
import {View, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity, Text, Image, ImageBackground } from 'react-native'
import { Value } from 'react-native-reanimated';


import AuthContext from '../../providers/AuthProvider';

const Login = ({navigation}) =>{

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

    return( isLoading ? 
        <View 
          style={styles.loading}
          >
          <ActivityIndicator size="large" color="#140A7E" />
        </View>
        :
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/background.png')} style={styles.image}>
            <View style={styles.containerHeader}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/logo.png')}
                />
            </View>
            <View 
                style={styles.containerBody}
            >
                <TextInput
                    placeholder={'Example@mail.example'}
                    value= {err?email:null}
                    style= {styles.input}
                    onChangeText= {(val) => setEmail(val)}
                />

                <TextInput
                    placeholder={'Mot de passe'}
                    style= {styles.input}
                    onChangeText= {(val) => setPassword(val)}
                    secureTextEntry={true}
                />

                <TouchableOpacity 
                    style= {styles.forgetPassword}
                    onPress={() => navigation.navigate("forget")}  
                    >
                    <Text style={{ color: "#343434", fontWeight: 'bold' }}> Mot de passe oublié ? </Text>
                </TouchableOpacity>

                <View style={styles.loginbuttom}>

                    <TouchableOpacity style={styles.TouchableOpacity}
                        onPress={() => { 
                            if(email.length >= 1 && password.length >= 1){
                                setIsLoading(true);
                                setTimeout(() => {
                                    setIsLoading(false);
                                }, 1000);
                                singin(email, password);
                            }
                        }}
                    >
                        <Text style={{color: '#ffffff', fontWeight: 'bold'}}> Connexion </Text>
                    </TouchableOpacity>
        
                </View>
                <Text style={styles.Danger}>{
                    err
                }</Text>
            </View>
            </ImageBackground>
            
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    loading:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main_container: {
      backgroundColor:"#E5E5E5",
      flex:3,
      width: '100%',
      borderColor:"black",
      alignItems: 'center',
      justifyContent: 'center'
    },
    containerHeader:{
      flex:1,
      alignItems:'flex-end',
    //   justifyContent: 'center',
    //   height: 38,
      width: '90%',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
    },
    logo:{
        marginTop: '5%',
        width: '50%',
        height: '50%',
        borderRadius: 15,
    },
    containerBody:{
      flex: 3,
      width: '80%',
      alignItems: 'center',
    },
    input:{
      borderBottomWidth:1,
      height:42,
      width:"100%",
      borderWidth: 1,
      borderRadius: 15,
      backgroundColor: "#ffff",
      borderColor: "#045C64",
      paddingLeft: 15,
      marginTop: 30,
    },
    forgetPassword:{
        marginTop: '1%',
        alignSelf: 'flex-start',
    },
    password_text:{
      marginTop: 10,
      color : "gray"
    },
    password_input:{
      borderBottomWidth:1,
      height: 42,
      width: "80%"
    },
    Danger:{
        marginTop: '2%',
      color: "red"
    },
    loginbuttom: {
      marginTop: 40,
      alignItems:'center',
      justifyContent: 'center',
      width:'50%',
      height:60,
      borderRadius: 30,
      backgroundColor:"#21C3A7",
    }
  
  })

export default Login