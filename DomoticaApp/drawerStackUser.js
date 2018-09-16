import { createStackNavigator } from 'react-navigation';
import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, Alert, TouchableHighlight, Dimensions, ScrollView, ImageBackground } from 'react-native';

import DrawerScreenUser from './drawerScreenUser.js';
import { DrawerActions } from 'react-navigation';

export const DrawerNavigationUser = createStackNavigator({
    DrawerStackUser: {screen: DrawerScreenUser}
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
            <TouchableHighlight style={{height: '100%', width:30, justifyContent:'center', alignItems:'center'}} onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
                /*if(navigation.state.index==0){
                    navigation.dispatch(DrawerActions.openDrawer());
                }else{
                    navigation.dispatch(DrawerActions.closeDrawer());
                } */
            }}>
                 <Image source={require('./images/menu.png')} style={{height:20, width:20, marginTop:5 }} />
            </TouchableHighlight>
        </View>,
    })
})

export default DrawerNavigationUser;