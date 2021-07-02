import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import { Text as TextSVG } from 'react-native-svg'


const DashBoard = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
    setTimeout(() =>{ 
      setIsLoading(false)
      navigation.setOptions({
        headerShown: true
      })
    }, 2000)
    
  }, [])

        const data = [
            {
                key: 1,
                amount: 10,
                name: 'Off',
                svg: { fill: '#3d3d3d' },
            },
            {
                key: 2,
                amount: 20,
                name: 'On',
                svg: { fill: '#366464' }
            }
        ];

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

        return (isLoading ? 
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#140A7E" />
          </View>
        :
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style= {{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style= {{backgroundColor: '#21C3A7', height: '60%', width: '70%', justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                  <Text style={{fontWeight: 'bold', color: '#ffffff', fontSize: 24}}>
                    {154} Poteaux
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
                        On {75}%
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: '5%',}}>
                      <View style={{backgroundColor: '#3d3d3d', height: 20, width: 20}}></View>
                      <Text style={{ marginLeft: '5%', fontWeight: 'bold'}}>
                        Off {75}%
                      </Text>
                    </View>
                    
                  </View>
                </View>
              </View>
            </View>
            
        )

}

export default DashBoard