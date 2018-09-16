import { createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, Alert, TouchableHighlight, Dimensions, ScrollView, ImageBackground } from 'react-native';

import Home from './home';
import Profile from './profile';
import Users from './users';
import Scenes from './scenes';
import LogOut from './logout';

import { Slider, AsyncStorage } from 'react-native';
import Communication from './communication';


const DrawerScreenAdmin = createDrawerNavigator({
    Home: {screen:Home, navigationOptions: { title: 'Inicio' } },
    Profile: {screen:Profile, navigationOptions: { title: 'Perfil' } },
    Users: {screen:Users, navigationOptions: { title: 'Usuarios' }}, 
    Scenes: {screen:Scenes, navigationOptions: { title: 'Escenas', headerTitle: 'Escenas' }}, 
    LogOut: {screen:LogOut, navigationOptions: { title: 'Cerrar sesión', headerTitle: 'Cerrar sesión' }}, 
},{
    headerMode: 'none'
});

export default  DrawerScreenAdmin;