import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const Loading = () => {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <ActivityIndicator size="large" color="3d3d3d" />
        </View>
    )
}

export default Loading;