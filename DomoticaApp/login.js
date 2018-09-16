import React, { Component } from 'react';
import { Animated, Dimensions, Text, View, Image, ScrollView, TextInput, TouchableHighlight, TouchableOpacity, Alert, AsyncStorage, Keyboard, KeyboardAvoidingView } from 'react-native';

import styles from './styles';
import { LogoLogin, ErrorMessage } from './commons';
import Communication from './communication';
import Encryption from './encryption';

var {height, width} = Dimensions.get('window');
IMAGE_WIDTH = width*0.8;
IMAGE_HEIGHT_SMALL = 50;

export default class LogIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            password: '',
            submittable: false,
            errorMessage: false,
            message: 'No hemos encontrado esa combinación de usuario y contraseña. Si no recuerda su contraseña ingrese a Olvidé mi contraseña.',
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setStateAsync(state) {
      return new Promise((resolve) => {
        this.setState(state, resolve)
      });
    }

    async handleSubmit() {
        response = await Communication.getInstance().authenticate(this.state.user, this.state.password);
        if (response.result) {
          try {
            await AsyncStorage.clear();
            var userToken = response.data + '&' + this.state.user + '&' +  this.state.password;
            var encrypted = Encryption.encrypt(userToken);
            await AsyncStorage.setItem('userToken', encrypted.toString());
            Communication.getInstance().setId(response.data);
            this.props.navigation.navigate(response.isAdmin ? 'AppAdmin': 'AppUser');
          } catch (e) {
            Alert.alert('Error', 'Oops! Something happened. Please try again '+ e);
          }
        } else {
          await this.setStateAsync({ errorMessage: true, message: response.message })
        }
    }

    async componentWillMount(){
      const userToken = await AsyncStorage.getItem('userToken');
      ip = Communication.getInstance().getIP();
      if (userToken){
        this.setState({ip: ip, errorMessage: true, message: 'Se produjo un error, o su contraseña fue modificada. Por favor vuelva a iniciar sesión.'});
      }
      else
        this.setState({ip: ip});
    }
    
    render() {
        this.state.submittable = this.state.user.length > 0 && this.state.password.length > 4;
        const { user, password, submittable, logedIn, errorMessage, changePassword, idUser, message } = this.state;
        return (
            <KeyboardAvoidingView behavior="position" style={{flex: 1,  backgroundColor: 'rgb(22, 43, 59)'}} enabled>
                <View style={{  marginTop: 10, alignItems: 'center' }}>
                  <TouchableOpacity onLongPress={() => this.props.navigation.push('config')}>
                    <Image source={require('./images/futura.png')} style={{width: IMAGE_WIDTH}} resizeMode='contain' />
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'transparent', alignItems: 'center'}} >
                  { errorMessage && (
                    <TouchableOpacity onPress={() => this.setState({errorMessage: false})}>
                      <ErrorMessage message={this.state.message}/>
                    </TouchableOpacity>)
                  }
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

                  <View style={styles.inputContainerLogin}>
        
                    <Image source={require('./psswrdIcon.png')} style={styles.inputIconLogin} />

                    <TextInput
                      style={styles.inputLogin}
                      value={this.state.password}
                      secureTextEntry={true}
                      placeholder="contraseña"
                      placeholderTextColor='rgb(199, 199, 199)'
                      underlineColorAndroid="transparent"
                      onChangeText={(password) => this.setState({password: password})}
                    />

                  </View>
                </View>
              <View style={{ backgroundColor: 'transparent', justifyContent: 'flex-start'} } >
                
                    { submittable && (
                            <TouchableHighlight onPress={this.handleSubmit} underlayColor='rgb(22, 43, 59)'>
                                <View style={styles.buttonContainer}>
                                <Text style={styles.textSubmitLogin}>Continuar</Text>
                                </View>
                            </TouchableHighlight>
                    )} 

                      { !submittable && (
                        <View style={{ height: 50 }} />
                      )}             
                      <View style={[styles.linkLogin, {marginTop:10}]} key="2" >
                          <Text style={styles.textLinkLogin} onPress={() => this.props.navigation.push('forgotPassword')} >OLVIDÉ MI CONTRASEÑA</Text>
                      </View>
              </View>
            </KeyboardAvoidingView>
        );
    }
  }
  

  /* <KeyboardAvoidingView
            style={{flex:1, backgroundColor: 'rgb(22, 43, 59)', alignItems: 'center'}}
            behavior="padding"> 
                <View style={{flex: 1, margin: 20, backgroundColor: 'transparent'}} >
                    <Animated.Image source={require('./domotica.png')} style={{height: this.imageWidth - 20, width: this.imageWidth}} resizeMode='contain' />
    
                        { errorMessage && (
                            <ErrorMessage message={this.state.message}/>)
                        }
                      
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
  
                        <View style={styles.inputContainerLogin}>
                            <Image source={require('./psswrdIcon.png')} style={styles.inputIconLogin} />
            
                            <TextInput
                              style={styles.inputLogin}
                              value={this.state.password}
                              secureTextEntry={true}
                              placeholder="contraseña"
                              placeholderTextColor='rgb(199, 199, 199)'
                              underlineColorAndroid="transparent"
                              onChangeText={(password) => this.setState({password: password})}
                            />
                        </View>
                      
                      { submittable && (
                        <TouchableHighlight style={styles.buttonContainer} onPress={this.handleSubmit} underlayColor='rgb(22, 43, 59)'>
                          <Text style={styles.textSubmitLogin}>Login</Text>
                        </TouchableHighlight>
                      )}  

                      { !submittable && (
                        <View style={{ height: 50 }} />
                      )}             
                      <View style={[styles.linkLogin, {marginTop:20}]} key="2" >
                          <Text style={styles.textLinkLogin} onPress={() => this.props.navigation.push('forgotPassword')} >OLVIDÉ MI CONTRASEÑA</Text>
                      </View>
                </View>
            </KeyboardAvoidingView>*/
  
  
  