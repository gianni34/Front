import { createDrawerNavigator } from 'react-navigation';
import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, Alert, TouchableHighlight, Dimensions, ScrollView, ImageBackground } from 'react-native';

import Home from './home';
import Users from './users';
import Scenes from './scenes';
import LogOut from './logout';

import { Slider } from 'react-native';

class Profile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            sliderTime: 50,
            startAngle: 45,
            angleLength: 90,

        }
    }
    
    render(){
        return (<View style={{marginTop: 60}}>
            <Slider
            trackStyle={styleSlider.track}
            thumbStyle={styleSlider.thumb}
            minimumTrackTintColor='#eecba8'
          />
            <Slider
            minimumTrackTintColor='cyan'
            maximumTrackTintColor='gray'
            thumbTintColor='cyan'
            trackStyle={{
              height: 20,
              borderRadius: 20,
              backgroundColor: 'cyan',
            }}
            style={{
              'height': 60,

            }}
            value={this.state.sliderTime}
            maximumValue={100}
          />
        </View>);
    }
};

var styleSlider = StyleSheet.create({
    track: {
        height: 30,
        borderRadius: 5,
        backgroundColor: '#d0d0d0',
      },
      thumb: {
        borderRadius: 5,
        backgroundColor: 'cyan',
      }
})

const DrawerScreen = createDrawerNavigator({
    Home: {screen:Home, navigationOptions: { title: 'Inicio' } },
    Profile: {screen:Profile, navigationOptions: { title: 'Perfil' } },
    Users: {screen:Users, navigationOptions: { title: 'Usuarios' }}, 
    Scenes: {screen:Scenes, navigationOptions: { title: 'Escenas', headerTitle: 'Escenas' }}, 
    LogOut: {screen:LogOut, navigationOptions: { title: 'Cerrar sesión', headerTitle: 'Cerrar sesión' }}, 
},{
    headerMode: 'none'
})

export default DrawerScreen;