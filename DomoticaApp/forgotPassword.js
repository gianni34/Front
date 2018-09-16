import React, { Component } from 'react';
import { View, Image, TextInput, Text, TouchableHighlight, KeyboardAvoidingView, Dimensions } from 'react-native';

import styles from './styles';
import { LogoLogin, ErrorMessage } from './commons';
import Communication from './communication';

var {height, width} = Dimensions.get('window');
const IMAGE_WIDTH = width*0.8;

export default class ForgotPassword extends Component {
    constructor(props){
      super(props);
  
      this.state = {
        user: '',
        submittable: false,
        errorMessage: false,
        result: false,
        message: 'No se encontró un usuario con ese nombre, intente nuevamente.'
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      
    }
  
    async handleSubmit(){
        response = await Communication.getInstance().getSecretQuestion(this.state.user);
        if (!response.result){
            this.setState({ errorMessage: true });
        } else {
            this.props.navigation.push('secretAnswer', { user: this.state.user, secretQuestion: response.question});
        }
    }
  
  
    render(){
      this.state.submittable = this.state.user.length > 0;
      const { user, submittable, errorMessage, message, result } = this.state;
      return (
        <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'rgb(22, 43, 59)'}} enabled>
                <View style={{ marginTop: 10, alignItems: 'center' }}>
                  <Image source={require('./images/futura.png')} style={{width: IMAGE_WIDTH}} resizeMode='contain' />
                </View>
            <View style={{ marginTop: 40, backgroundColor: 'transparent', justifyContent: 'flex-start'}} >
                      
                { errorMessage && <ErrorMessage message={message} /> }
                <View style={styles.inputContainerLogin}>
                    <Image source={require('./userIcon.png')} style={styles.inputIconLogin} />
                    <TextInput
                        style={styles.inputLogin}
                        value={this.state.user} 
                        placeholder="usuario"
                        placeholderTextColor="rgb(202, 199, 199)"
                        underlineColorAndroid="transparent"
                        onChangeText={(user) => this.setState({user: user})}
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