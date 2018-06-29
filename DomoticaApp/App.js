import React, { Component } from 'react';
import { AsyncStorage, View, StatusBar } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import { AppNav, AuthNav } from './navigators';
import LogIn from './login';

import { AppLoading, Font } from 'expo';

import FontAwesome 
  from './node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';
import MaterialIcons  
  from './node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
  import Entypo 
  from './node_modules/@expo/vector-icons/fonts/Entypo.ttf';
import MaterialCommunityIcons  
  from './node_modules/@expo/vector-icons/fonts/MaterialCommunityIcons.ttf';


export class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
          fontLoaded: false
        }

        this._bootstrapAsync();
      }

      /*async componentWillMount() {
        try {
          await Font.loadAsync({
            FontAwesome,
            MaterialIcons, 
            Entypo,
            MaterialCommunityIcons
          });
          this.setState({fontLoaded : true});
    
        } catch (error) {
          console.log('error loading icon fonts', error);
        }
      }*/
    
      // Fetch the token from storage then navigate to our appropriate place
      _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
    
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
      };
    
      render() {
        return (
            <View />
        );
        
      }
}
  
export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppNav,
    Auth: AuthNav,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

