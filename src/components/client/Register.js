import React, { useState, useEffect } from 'react'
import {View, Text, ActivityIndicator, StyleSheet, Button, Alert, TouchableOpacity, TextInput, SafeAreaView, Image, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firebase from "firebase/app"
import 'firebase/app'
import "firebase/firestore";
import "firebase/storage";

import Loading from '../effects/Loading'


const Home = () =>{
  // for some tests
  const [cameraOpen, setCameraOpen] = useState(false);
  const [progress, setProgress ] = useState(0);
  const [counter, setCounter ] = useState(0);

  // this states for inputs
  const [NP, setNP] = useState(null);
  const [type, setType] = useState({text: '', uri: null});
  const [photo, setPhoto] = useState({uri: null});
  const [AL, setAL] = useState({text: '', uri: null});
  const [AP, setAP] = useState({text: '', uri: null});
  const [ACB, setACB] = useState({text: '', uri: null});
  const [AC, setAC] = useState({text: '', uri: null});
  const [geocalization, setGeocalization] = useState(null);
  const [etat, setEtat] = useState(false);
  

   
  // Alert before submiting
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Enregistrement",
      "Vous avez sure!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress:async () => {
          await submit()
        } }
      ]
  );
  
  // Submit function
  const submit = async () => {
    setCameraOpen(true);
    await submitPictures(photo);
    await submitPictures(type);
    await submitPictures(AP);
    await submitPictures(ACB);
    await submitPictures(AC);
    await submitPictures(AL);
    // await getPoteauObject(setPoteau)
    console.log('Transition');
    await ajouterPoteau();
    setCameraOpen(false);
  }
  
  

  // to uplaod a picture
  const submitPictures =  async(pic) => {
    const upLoadUri = pic;
    if(pic.uri){
      console.log('I"m counter '+counter)
      let uri = upLoadUri.uri;
    let filename = uri.substring(uri.lastIndexOf('/') + 1)
    // setIsLoading(true)


    var db = firebase.storage().ref().child('images/' + filename);
      const blob = await (await fetch(uri)).blob()
      // setCameraOpen(true);
    
      var uploadTask = db.put(blob)
      uploadTask.on('state_changed', 
        (snapshot) => {
          setProgress(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2));

          var progression = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
          console.log('Upload is ' + progression + '% done');

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: 
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: 
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // Handle unsuccessful uploads
        }, 
        () => {
          
            
        }
      );

    try {

      
      await uploadTask;
      await uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        upLoadUri.uri = downloadURL;
        setPhoto(upLoadUri);
        
        
        // setCameraOpen(false)
        // setIsLoading(false)
      });
      
      
      // Alert.alert(
      //   'Image uploaded',
      //   'image uploaded succ'
      // )
      // setIsLoading(false)
    }catch(e) {
      console.log('Upload error : ' + e)
    }
    // setIsLoading(false)
    }
  }

  // to take a picture
  const takePhoto = async (pic, setPic) => {

    if(await ImagePicker.getCameraPermissionsAsync()){
      let result = await ImagePicker.launchCameraAsync({
      // let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
  
      
  
      if (!result.cancelled) {
        let images = pic;
        images.uri =  result.uri
        setPic(images);
        console.log(pic);
      }
    }else{
      alert('Sorry, we need camera roll permissions to make this work!')
    }
  }

  // to reset inputs
  const clearStates = () => {
    setNP(null);
    setType({text: '', uri: null});
    setPhoto({uri: null});
    setAL({text: '', uri: null});
    setAP({text: '', uri: null});
    setACB({text: '', uri: null});
    setAC({text: '', uri: null});
    setGeocalization(null);
    setEtat(false);
  }

  // to upload a poteau
  const ajouterPoteau = async () => {
    var db = firebase.firestore();
    console.log("Ajouter poteau");
    db.collection("poteaux").add({
      NP: NP,
      type: type,
      photo: photo,
      AL: AL,
      AP: AP,
      ACB: ACB,
      AC: AC,
      geocalization: geocalization,
      etat: etat,
    })
    .then(() => {
        alert("Document successfully written!");
        console.log("Document successfully written!");
        
    })
    .catch((error) => {
        alert("Error writing document: ", error);
    });
    try{
      await db
    }catch(e){
      console.log('error in Add Poteau : ' + e)
    }
  }

return(
    cameraOpen ?
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="3d3d3d" />
      <Text style={styles.text2}>
        Upload is {progress} % done
      </Text>
      <TouchableOpacity  style={{backgroundColor: '#3d3d3d', width: '40%', padding: 5, borderRadius: 15, alignSelf: 'center', alignContent: 'center'}} onPress={() => {
                clearStates();
              }}
              >
                <Text style={styles.text}>Cacher</Text>
              </TouchableOpacity>

    </View>
  : 
    <SafeAreaView style={{flex: 1}}>

      <ScrollView>

        <View style={styles.container}>
          
          <View style={styles.card}>
            <Text style={styles.title}>
              Ajouter un poteau
            </Text>
          </View>
          
          <View style={styles.card}>

            <View style={styles.row}>
              <TextInput
                  placeholder={'Numero du point'}
                  value={NP}
                  style= {styles.input}
                  onChangeText= {(val) => setNP(val)}
              />
              
            </View>

            <View style={styles.row}>
              <TextInput
                  placeholder={'Type de route'}
                  value={type.text}
                  style= {styles.input}
                  onChangeText= {(val) => setType({text: val, uri: type.uri})}
              />
              <TouchableOpacity  style={styles.icon} onPress={() => {
                takePhoto(type, setType)
              }}
              >
                <MaterialIcons
                    name= {type.uri ? 'edit':'add-a-photo'}
                    color={'#3d3d3d'}
                    size={35}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TextInput
                  placeholder={'Photo du point'}
                  style= {styles.input}
                  value={photo ? photo.uri : ''}
                  onChangeText= {(val) => setPhoto(val)}
                  editable={false}
              />
              <TouchableOpacity  style={styles.icon} onPress={async () => {
                  await takePhoto(photo, setPhoto)
              }}
              >
                <MaterialIcons
                    name= {photo.uri ? 'edit':'add-a-photo'}
                    color={'#3d3d3d'}
                    size={35}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TextInput
                  placeholder={'Anomalies Luminaire'}
                  value={AL.text}
                  style= {styles.input}
                  onChangeText= {(val) => setAL({text: val, uri: AL.uri})}
              />
              <TouchableOpacity  style={styles.icon} onPress={() => {
                  takePhoto(AL, setAL)
              }}
              >
                <MaterialIcons
                    name= {AL.uri ? 'edit':'add-a-photo'}
                    color={'#3d3d3d'}
                    size={35}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TextInput
                  placeholder={'Anomalies poteau'}
                  value={AP.text}
                  style= {styles.input}
                  onChangeText= {(val) => setAP({text: val, uri: AP.uri})}
              />
              <TouchableOpacity  style={styles.icon} onPress={() => {
                takePhoto(AP, setAP)
              }}
              >
                <MaterialIcons
                    name= {AP.uri ? 'edit':'add-a-photo'}
                    color={'#3d3d3d'}
                    size={35}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TextInput
                  placeholder={'Anomalies crosse/bras'}
                  value={ACB.text}
                  style= {styles.input}
                  onChangeText= {(val) => setACB({text: val, uri: ACB.uri})}
              />
              <TouchableOpacity  style={styles.icon} onPress={() => {
                  takePhoto(ACB, setACB)
              }}
              >
                <MaterialIcons
                    name= {ACB.uri ? 'edit':'add-a-photo'}
                    color={'#3d3d3d'}
                    size={35}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TextInput
                  placeholder={'Anomalies câble'}
                  value={AC.text}
                  style= {styles.input}
                  onChangeText= {(val) => {
                    setAC({text: val, uri: AC.uri})
                    console.log(AC)
                  }}
              />
              <TouchableOpacity  style={styles.icon} onPress={() => {
                  takePhoto(AC, setAC)
              }}
              >
                <MaterialIcons
                    name= {AC.uri ? 'edit':'add-a-photo'}
                    color={'#3d3d3d'}
                    size={35}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              
              <Text style={styles.text2}>Etat : </Text>

              <TouchableOpacity  style={styles.icon} onPress={() => {
                  setEtat(!etat);
                }}
              >
                <View style={{height: '70%', width: '25%', backgroundColor: '#fff', borderRadius: 50, borderColor: '#8c8f94', borderWidth: 2}}>
                  <View style= {{height: '100%', width: etat? '100%' : '60%', backgroundColor: '#3d3d3d', borderRadius: 100}}></View>
                </View>
              </TouchableOpacity>
            
            </View>

            <View style={styles.row} >

              <TouchableOpacity  style={{backgroundColor: '#3d3d3d', width: '40%', padding: 5, borderRadius: 15, alignSelf: 'center', alignContent: 'center'}} onPress={() => {
                if(NP && photo && AL.text != '' && AP.text != '' && ACB.text != '' && AC.text != '')
                {
                  createTwoButtonAlert()
                  
                }else{
                  
                  // console.log(poteauObject)
                  alert("Remplissez les champs! \nPhoto de point est obligatior !")
                }
              }}
              >
                <Text style={styles.text}>Enregistrer</Text>
              </TouchableOpacity>

              <TouchableOpacity  style={{backgroundColor: '#3d3d3d', width: '40%', padding: 5, borderRadius: 15, alignSelf: 'center', alignContent: 'center'}} onPress={() => {
                clearStates()
              }}
              >
                <Text style={styles.text}>Effacer</Text>
              </TouchableOpacity>
            
            </View>
 
          </View>
      
      </View>

      </ScrollView>
    
    </SafeAreaView>

    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        
    },
    card: {
        justifyContent: 'center',
        margin: '0.5%', 
        // alignItems: 'flex-start', 
        width: '95%', 
        backgroundColor: '#ffffff', 
        padding: '3%', 
        borderRadius: 15},
      title: {
        fontWeight: 'bold', 
        color: '#366464', 
        fontSize: 24
      },
      input:{
        borderBottomWidth:1,
        height:42,
        flex: 6,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: "#ffff",
        borderColor: "#045C64",
        paddingLeft: 15,
        marginBottom: 10,
      },
      icon: {
        alignItems: 'center',
        flex: 1,
        height: 50,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      text: {
        fontWeight: 'bold', 
        color: '#fff', 
        alignSelf: 'center', 
        margin: 5
      },
      text2: {
        fontWeight: 'bold', 
        color: '#3d3d3d', 
        alignSelf: 'center', 
        margin: 10
      },
})

export default Home