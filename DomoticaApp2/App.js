import React, {Component} from "react";
import {Animated, Dimensions, Platform, Text, View, StyleSheet, Image, Alert, TouchableHighlight} from 'react-native';

import { StackNavigator } from 'react-navigation';
import DrawerStack from './drawerStack.js'
import NewUserScreen from "./newUserScreen.js";

//import { MenuProvider } from 'react-native-popup-menu';


export const Navigator = StackNavigator({
    drawerStack: {screen: DrawerStack},
    newUser: {screen: NewUserScreen},
},{
    headerMode: 'none',
    initialRouteName: 'drawerStack'
});
/*
export const App = () => (
    <MenuProvider>
        {Navigator}
    </MenuProvider>
);
*/

