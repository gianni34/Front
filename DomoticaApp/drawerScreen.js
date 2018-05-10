import { createDrawerNavigator } from 'react-navigation';
import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, Alert, TouchableHighlight, Dimensions, ScrollView, ImageBackground } from 'react-native';

import Home from './home'
import Users from './users'
//import NewUserScreen from './newUserScreen';

class Profile extends React.Component{
    constructor(){
        super();
    }
    
    render(){
        return (<View><Text> Perfil </Text></View>);
    }
}

class Configurations extends React.Component{
    constructor(){
        super();
    }
    
    render(){
        return (<View><Text>  </Text></View>);
    }
}

const DrawerScreen = createDrawerNavigator({
    Home: Home,
    Profile: Profile,
    Users: Users,
   // Test: NewUserScreen,
},{
    headerMode: 'none'
})

export default DrawerScreen;