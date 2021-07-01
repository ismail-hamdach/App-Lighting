import React, { useContext, useState } from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import {AuthContext} from '../../providers/AuthProvider'

const Home = () =>{
    const {user} = useContext(AuthContext);
    const {logOut} = useContext(AuthContext);
    const profile = "https://firebasestorage.googleapis.com/v0/b/app-lamps.appspot.com/o/profile.png?alt=media&token=6a471065-e8fd-42af-b019-91e1dbfa4883"

    return(
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: user.photoURL??profile}}/>
            <Text style={styles.title}>{user.displayName??'Name'}</Text>
            {/* <Button title = {"Se déconnecter"} onPress = {() => {logOut()}}/> */}
            <TouchableOpacity style={styles.buttomLogOut} 
              onPress={ () => {logOut()}}
            >
              <Text style={styles.verificetion}> Se déconnecter </Text>
          </TouchableOpacity>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        top: 30,
        // justifyContent: 'center',
        // alignItems: 'center',
    },item: {
        backgroundColor: '#F0F0F0',
    
        padding: 0,
        marginVertical: 3,
        marginHorizontal: 4,
        borderRadius:10,
      },
      title: {
        fontSize: 18,
        marginLeft:55,
        bottom:30,
        left:20,
      },
      image: {
        width: 50,
        height:50,
        borderRadius:10,
        top:17,
        left:15,
      },
      buttomLogOut: {
        top: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width:150,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#140A7E',
      },
      verificetion: {
        color: '#FFf',
        justifyContent: 'center',
        alignItems: 'center',
        top:15,
      },
})

export default Home