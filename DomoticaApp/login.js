import React, { Component } from 'react';
import { Animated, Dimensions, Text, View, Image, ScrollView, TextInput, TouchableHighlight, Alert, AsyncStorage, Keyboard, KeyboardAvoidingView } from 'react-native';

import styles from './styles';
import { LogoLogin, ErrorMessage } from './commons';
import Communication from './communication';

IMAGE_HEIGHT = 250;
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
        
        this.imageHeight = IMAGE_HEIGHT;
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        okay = Communication.getInstance().authenticate(this.state.user, this.state.password);
        if (!okay) {
            this.setState({ errorMessage: true })
        } else {
            try {
                AsyncStorage.setItem('userToken', this.state.user);
                console.log("-------------- CORRECTO ----------");
                this.props.navigation.navigate('App');
            } catch (e) {
                console.log(e);
                Alert.alert('Error', 'Oops! Something happened. Please try again');
            }
            
        }
      /*fetch("http://192.168.43.77:8000/login/Ceci/chechu/")
      .then(response => {return response.json()})
      .then((json) => this.setState({ logedIn: json.result, errorMessage: !json.result, idUser:json.id }))
      .catch((error) => {
        this.setState({errorMessage: true})
        console.error(error);
      });
      this.props.navigation.push('MainMenu');*/
    }
  
    
    render() {
        this.state.submittable = this.state.user.length > 0 && this.state.password.length > 4;
        const { user, password, submittable, logedIn, errorMessage, changePassword, idUser, message } = this.state;
        return (
            <KeyboardAvoidingView behavior="position" style={{flex: 1, backgroundColor: 'rgb(22, 43, 59)'}} enabled>
                <View style={{  marginTop: 10, alignItems: 'center' }}>
                  <Image source={require('./domotica.png')} style={{height: this.imageHeight}} resizeMode='contain' />
                </View>
                <View style={{ marginTop: 40, backgroundColor: 'transparent', alignItems: 'center'}} >
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
  
  
  