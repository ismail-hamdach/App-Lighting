import React, { useContext, useState } from 'react'
import {View, Text, StyleSheet, Image, Button } from 'react-native'

import {AuthContext} from '../../providers/AuthProvider'

const Home = () =>{
    const {user} = useContext(AuthContext);
    const {logOut} = useContext(AuthContext);
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: user.photoURL}}/>
            <Text style={styles.title}>{user.displayName??'Name'}</Text>
            <Button title = {"Se déconnecter"} onPress = {() => {logOut()}}/>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
})

export default Home