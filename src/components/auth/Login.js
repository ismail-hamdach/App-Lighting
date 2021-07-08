import React, { useEffect, useState, useContext } from 'react'
import {View, SafeAreaView, ScrollView ,TextInput, StyleSheet, ActivityIndicator, TouchableOpacity, Text, Image, ImageBackground, useWindowDimensions } from 'react-native'
import Loading  from '../effects/Loading';


import AuthContext from '../../providers/AuthProvider';

const Login = ({navigation}) =>{

    const {login, err, user} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() =>{
    //     setTimeout(() => {
    //     setIsLoading(false);
    //     }, 1000)
    // }, [])

    const singin = (email, password) => {
   
        if(email.length >= 1 && password.length >= 1){
           login(email,password);
        }
        
    }

    const window = useWindowDimensions();

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    return( isLoading ? 
        <Loading />
        :
        <SafeAreaView  style={styles.container}>
            
            <ImageBackground source={require('../../../assets/background.png')} style={{
                flex: 1,
                resizeMode: 'stretch',
                width: window.width,
                height: window.height,
            }}>
            
                <ScrollView style={{ width: '100%', }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1}}>
                
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
                            onPress={async () => { 
                                if(email.length >= 1 && password.length >= 1){
                                    setIsLoading(true);
                                    await singin(email, password);
                                    setIsLoading(false);
                                }
                            }}
                        >
                            <Text style={{color: '#ffffff', fontWeight: 'bold'}}> Connexion </Text>
                        </TouchableOpacity>
            
                    </View>
                    <Text style={styles.Danger}>
                        {err}
                    </Text>
                
                </View>
            
                </ScrollView>
                
            </ImageBackground>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
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
      position: 'absolute',
      top: 30,
      right: 20,
      height: 200.9,
      width: 400,
    },
    image: {
        flex: 1,
        resizeMode: 'stretch',
        width: window.width,
        height: window.height,
    },
    logo:{
        // marginTop: '5%',
        width: '50%',
        height: '50%',
        borderRadius: 15,
    },
    containerBody:{
      flex: 3,
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
      alignItems: 'center'
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