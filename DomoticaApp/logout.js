import React, { Component } from 'react';

import { View, AsyncStorage } from 'react-native';

export default class LogOut extends Component {
    constructor(props){
        super(props);
        this._signOutAsync();
    }
  
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
  
    render() {
      return (
        <View />
      );
    }
}
