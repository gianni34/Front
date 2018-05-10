import {StackNavigator} from 'react-navigation';
import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, Alert, TouchableHighlight, Dimensions, ScrollView, ImageBackground } from 'react-native';

import DrawerScreen from './drawerScreen.js'

const DrawerNavigation = StackNavigator({
    DrawerStack: {screen: DrawerScreen}
},{
    headerMode: 'screen',
    navigationOptions: ({navigation}) => ({
        headerStyle: { 
            backgroundColor: 'rgb(22, 43, 59)',
            paddingLeft: 10,
            paddingRight: 10
        },
        headerTintColor: 'white',
        headerLeft:
        <View>
            <TouchableHighlight onPress={() => {
                if(navigation.state.index==0){
                    navigation.navigate('DrawerOpen');
                }else{
                    navigation.navigate('DrawerClose');
                } 
            }}>
                 <Image source={require('./images/menu.png')} style={{height:20, width:20, marginTop:5 }} />
            </TouchableHighlight>
        </View>,
    })
})

export default DrawerNavigation;