import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableHighlight, KeyboardAvoidingView } from 'react-native';

import { LogoLogin, ErrorMessage } from './commons';
import Communication from './communication';

export default class ChangePassword extends Component {
    constructor(props){
      super(props);

      this.state = {
        submittable: false,
        password: '',
        repeatPassword: '',
        errorMessage: false,
        message: 'Se produjo un problema, por favor intente nuevamente.',
        result: false,
      }
      
      this.imageHeight = 300;
  
      this.handleSubmit = this.handleSubmit.bind(this);
      
    }

    handleSubmit(){
      okay = Communication.getInstance().changePassword(this.id, this.state.password);
      if (okay) {
        this.props.navigation.navigate('login');
      } else {
        this.setState({errorMessage: true});
      }
    }

    ComponentWillMount(){
      this.id = this.props.navigation.getParam('userId', 0);
      this.user = this.props.navigation.getParam('user','');
    }
  
    render(){
      this.state.submittable = this.state.password.length > 4 && this.state.password==this.state.repeatPassword; 
      const { submittable, errorMessage, message, result, password, repeatPassword } = this.state;
      return(
        <KeyboardAvoidingView behavior="position" style={{flex: 1, backgroundColor: 'rgb(22, 43, 59)'}} enabled>
            <View style={{  marginTop: 10, alignItems: 'center' }}>
                <Image source={require('./domotica.png')} style={{height: this.imageHeight}} resizeMode='contain' />
            </View>
                <View style={{ marginTop: 40, backgroundColor: 'transparent', alignItems: 'center'}} >
                  {errorMessage && <ErrorMessage message={message} />}
          
          <View style={styles.inputContainerLogin}>
            
            <Image source={require('./psswrdIcon.png')} style={styles.inputIconLogin} />
            
            <TextInput
              style={styles.inputLogin}
              value={this.state.password} 
              placeholder="contraseña"
              placeholderTextColor="rgb(202, 199, 199)"
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password: password})}
            />
      
          </View>
          <View style={styles.inputContainerLogin}>
            
            <Image source={require('./psswrdIcon.png')} style={styles.inputIconLogin} />
            
            <TextInput
              style={styles.inputLogin}
              value={this.state.repeatPassword} 
              placeholder="contraseña"
              placeholderTextColor="rgb(202, 199, 199)"
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              onChangeText={(repeatPassword) => this.setState({repeatPassword: repeatPassword})}
            />
      
          </View>
          { submittable && (
                <TouchableHighlight onPress={this.handleSubmit} underlayColor='rgb(22, 43, 59)'>
                  <View style={styles.buttonContainer}>
                    <Text style={styles.textSubmitLogin}>Continuar</Text>
                  </View>
                </TouchableHighlight>
          )}
          </View>
        </KeyboardAvoidingView>
      );
    }
  }