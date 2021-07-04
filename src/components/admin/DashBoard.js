import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import { Text as TextSVG } from 'react-native-svg'

import firebase from "firebase/app"
import 'firebase/app'
import "firebase/firestore";

const DashBoard = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
 

  const [data, setData] = useState([
      {
          key: 1,
          amount: 0,
          name: 'Off',
          svg: { fill: '#3d3d3d' },
      },
      {
          key: 2,
          amount: 0,
          name: 'On',
          svg: { fill: '#366464' }
      }
  ]);

  const getAnalyse = async (dataRetrieved) => {
    const on = []
    const off = []
    var data = null;
    const error = null

    var db = firebase.firestore();

    await db.collection("poteaux").
    where("etat", "==", true)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            on.push(doc.data)
            console.log(doc.id, " => ", doc.data());
            
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
        error = true;
    });

    await db.collection("poteaux").
    where("etat", "==", false)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            off.push(doc.data)
            console.log(doc.id, " => ", doc.data());
        });
        data[0].amount = off.length
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
        error = true;
    });

    

    data = [
      {
          key: 1,
          amount: off.length??0,
          name: 'Off',
          svg: { fill: '#3d3d3d' },
      },
      {
          key: 2,
          amount: on.length??0,
          name: 'On',
          svg: { fill: '#366464' }
      }
    ];
    console.log(data)
    dataRetrieved(data)
    

  }

  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
        const { pieCentroid, data } = slice;
        return (
            <TextSVG
                key={index}
                x={pieCentroid[ 0 ]}
                y={pieCentroid[ 1 ]}
                fill={'#ffffff'}
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                fontSize={24}
            >
                {data.amount == 0? "Aucune resultat trouvée" : data.amount}
            </TextSVG>
        )
    })
  }

  const open = async () => {
    navigation.setOptions({
      headerShown: false
    })
    await getAnalyse(setData)
    setTimeout(() =>{ 
      
      navigation.setOptions({
        headerShown: true
      })
      setIsLoading(false)
    }, 1000)
  }

  useEffect( () => {
    open()
    
  }, [])

  return (isLoading ? 
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#140A7E" />
    </View>
  :
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style= {{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <View style= {{backgroundColor: '#21C3A7', height: '60%', width: '70%', justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
            <Text style={{fontWeight: 'bold', color: '#ffffff', fontSize: 24}}>
              {data[0].amount + data[1].amount} Poteaux
            </Text>
          </View>
          
        </View>

        <View style= {{flex: 2, flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#ffffff', justifyContent: 'center', height: '95%', width: '95%', borderRadius: 15, paddingTop: '5%', paddingBottom: '5%'}}>
            <PieChart
                style={{flex: 3, height: '100%' }}
                valueAccessor={({ item }) => item.amount}
                data={data}
            >
                <Labels/>
            </PieChart>
            <View style={{flex: 1, justifyContent: 'center', marginLeft: '3%'}}>
              
            <View style={{flexDirection: 'row'}}>
                <View style={{backgroundColor: '#366464', height: 20, width: 20}}></View>
                <Text style={{ marginLeft: '5%', fontWeight: 'bold', color: '#366464'}}>
                  On {(data[1].amount / (data[0].amount + data[1].amount)).toFixed(4)*100}%
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: '5%',}}>
                <View style={{backgroundColor: '#3d3d3d', height: 20, width: 20}}></View>
                <Text style={{ marginLeft: '5%', fontWeight: 'bold'}}>
                  Off {(data[0].amount / (data[0].amount + data[1].amount)).toFixed(4)*100}%
                </Text>
              </View>
              
            </View>
          </View>
        </View>
      </View>
      
  )

}

export default DashBoard