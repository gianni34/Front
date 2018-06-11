import React, { Component } from 'react';
import { AsyncStorage, View, StatusBar } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import { AppNav, AuthNav } from './navigators';
import LogIn from './login';

export class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
      }
    
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

