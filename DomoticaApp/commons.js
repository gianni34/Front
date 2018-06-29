import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';


export function LogoLogin(){
    return (
      <View style={{flex: 1, backgroundColor: 'transparent'}} >
        <View style={styles.logo}>
          <Image source={require('./domotica.png')} style={{flex: 1}} resizeMode="contain"/>
        </View>
      </View>
    );
}

export class ErrorMessage extends Component {
    constructor(props){
      super(props);
    }
  
    render(){
      return (
        <View style={styles.errorContainer} >
          <Text style={styles.errorText}>{this.props.message}</Text>
        </View>);
    }
}

