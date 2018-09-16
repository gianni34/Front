import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Navigator from './App.js'

import { ErrorMessage } from './commons';
import Communication from './communication';
import { MenuProvider } from 'react-native-popup-menu';
import { FontLoader } from './fontLoader';

export default class Profile extends React.Component{
    constructor() {
        super();
  
        this.state = {
            userId: '',
            name: '',
            password: '',
            secretQuestion: '',
            secretAnswer: '',
            passwordConfirmation: '',
            role: '',
            data: '',
            submittable: true,
            modified: false,
            errorMessage: false,
            profile: false,
            saved: false,
            editable: false,
        };
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
  
    componentWillMount(){
       /* fetch("http://192.168.0.34:8000/user/1/")
        .then(response => {return response.json()})
        .then((json) => this.setState(
            {userId: json.id, name: json.name, role: json.role, password: json.password, passwordConfirmation: json.password, secretQuestion: json.question, secretAnswer: json.answer, submittable: true}))
        .catch((error) => {
            console.log(error.message);
            });*/
        user = Communication.getInstance().getUser(1);
        this.state.id = user.id;
        this.state.name = user.name;
        this.state.password = user.password;
        this.state.passwordConfirmation = user.password;
    }
  
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ submittable: false});
        if (this.state.password && this.state.name && this.state.secretAnswer && this.state.passwordConfirmation){
            if (this.state.password.length > 8){
                if (this.state.password===this.state.passwordConfirmation){
                    this.setState({ submittable: true});
                    console.log("las contr son iguales");
                }
            }
        }
    }
  
    handleSave(e) {
        /*e.preventDefault();
        console.log("llego a handle de save");
        this.state.data = '{"name": "'+this.state.name+'", "password": "'+this.state.password+'", "question": "'+this.state.secretQuestion+'", "answer": "'+this.state.secretAnswer+'"}'
        const { name, value } = e.target;
        this.setState({ [name]: value });
        fetch("http://192.168.0.34:8000/user/"+this.state.userId+"/",{
            method: 'PUT',
            body: this.state.data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {return response.json()})
        .then((json) => this.setState({ saved: json.result }))
        .catch((error) => {
            console.log(error.message);
          });
        this.setState({errorMessage: !this.state.saved });
        console.log("se hizo el fecth y guardo = "+this.state.saved);  
        this.navigation.push('Login')  */
    }

    cancelEdit(){
        user = Communication.getInstance().getUser(1);
        this.state.id = user.id;
        this.state.name = user.name;
        this.state.password = user.password;
        this.state.passwordConfirmation = user.password;
        this.setState({editable: false});
    }
  
    render(){
      const { name, editable, errorMessage, password, passwordConfirmation,secretQuestion, secretAnswer, submittable } = this.state;
      return(
              <FontLoader>
        <ScrollView style={{flex: 1, flexDirection: 'column', backgroundColor: 'rgb(204, 204, 204)', paddingVertical:10 }}>
            <View style={{ flex:1, flexDirection:'column', padding: 5, backgroundColor: 'rgb(127, 127, 127)', marginHorizontal: 10, paddingBottom: 10, borderRadius:10, borderWidth: 1, borderColor: 'transparent', overflow: 'hidden'}}>
            
                <View style={{marginVertical: 20, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{height: 200, width:200, borderRadius: 100, borderWidth:0.5, borderColor: 'rgb(100, 100, 100)', backgroundColor: 'white'}}>
                        <Image source={require('./images/default2.png')} style={{flex: 1, height: 200, width:200, borderRadius:100}} reziseMode="cover"/>
                    </View>
                </View>

                { errorMessage && (
                    <View style={{marginTop:20}}>
                    <ErrorMessage message={this.state.message}/></View>)
                }             
                    <View style={stylesP.inputContainerProfile}>
                        <Image source={require('./userIcon.png')} style={stylesP.inputIconProfile} />
                
                        <TextInput
                            style={stylesP.inputProfile}
                            value={this.state.name}
                            placeholder="Usuario"
                            placeholderTextColor="rgb(202, 199, 199)"
                            underlineColorAndroid="transparent"
                            editable={this.state.editable}
                            onChangeText={(name) => this.setState({name: name})}
                        />    
                    </View>

                    <View style={stylesP.inputContainerProfile}>
                        <Image source={require('./psswrdIcon.png')} style={stylesP.inputIconProfile} />
                        <TextInput
                            style={stylesP.inputProfile}
                            value={this.state.password}
                            placeholder="Contraseña"
                            placeholderTextColor='rgb(199, 199, 199)'
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            editable={this.state.editable}
                            onChangeText={(password) => this.setState({password: password})}
                        />
                    </View>
        
                    <View style={stylesP.inputContainerProfile}>
                        <Image source={require('./psswrdIcon.png')} style={stylesP.inputIconProfile} />
                        <TextInput
                            style={stylesP.inputProfile}
                            value={this.state.passwordConfirmation}
                            placeholder="Confirmacion de Contraseña"
                            placeholderTextColor='rgb(199, 199, 199)'
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            editable={this.state.editable}
                            onChangeText={(passwordConfirmation) => this.setState({passwordConfirmation: passwordConfirmation})}
                        />
                    </View>
        
                    <View style={stylesP.textContainerProfile}>
                        <Text
                            style={stylesP.inputProfile}
                            Text="Pregunta secreta"
                            underlineColorAndroid="transparent"
                            placeholderTextColor='rgb(199, 199, 199)'
                        >
                        {this.state.secretQuestion}
                        </Text>
                    </View>
        
                    <View style={stylesP.inputContainerProfile}>    
                        <Image source={require('./psswrdIcon.png')} style={stylesP.inputIconProfile} />
                        <TextInput
                            style={stylesP.inputProfile}
                            value={this.state.secretAnswer}
                            placeholder="Respuesta"
                            placeholderTextColor='rgb(199, 199, 199)'
                            underlineColorAndroid="transparent"
                            editable={this.state.editable}
                            onChangeText={(secretAnswer) => this.setState({secretAnswer: secretAnswer})}
                        />
                    </View>

                     

                 
                </View>
                { editable && submittable && (
                    <TouchableHighlight onPress={this.handleSave} underlayColor='transparent'>
                    <View style={[styles.buttonContainerSave, {marginBottom:10}]}>
                        <Text style={styles.textSubmitLogin}>Guardar</Text>
                    </View>
                </TouchableHighlight>
                    )}
                   {!editable &&
                   <View style={{height:100, width:'100%'}}/>}
                   {!editable &&
                    <View style={{height:100, width:'100%'}}/>}
            </ScrollView>
            { !editable &&
                        <ActionButton buttonColor='rgb(22, 43, 59)' onPress={() => this.setState({editable: true})} 
                        renderIcon={() => <Icon name='edit' size={25} color='white'/>}/>
                    }
                    { editable &&
                        <ActionButton buttonColor='rgb(22, 43, 59)' onPress={() => this.cancelEdit()} 
                        renderIcon={() => <Icon name='undo' size={25} color='white'/>}/>
                    }
                    </FontLoader>
          );
    }
  }

const stylesP = StyleSheet.create({
 
    baseText: {
      fontFamily: 'sans-serif',
    },
    
    logo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    windowContainerProfile: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(22, 43, 59)',
    },

    logoContainerProfile: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainerProfile: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: .5,
      borderBottomColor: 'rgb(252, 249, 249)',
      height: 50,
      margin: 20,
    },

    textContainerProfile: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        margin: 10,
    },

    inputIconProfile: {
      padding: 10,
      margin: 5,
      marginLeft: 20,
      height: 10,
      width: 10,
      resizeMode : 'stretch',
      alignItems: 'center',
    },
   
    inputProfile:{
      flex:1, 
      paddingLeft: 20, 
      color: 'rgb(252, 249, 249)',
      fontSize: 15,
      fontFamily: 'sans-serif',
    },
  
    linkProfile: {
      color: 'rgb(179, 176, 176)',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      fontSize: 14,
    },
  
    buttonSubmitProfile: {
      alignItems: 'center',
      color: 'rgb(252, 249, 249)',
      borderColor: 'white',
      borderRadius: 5,
      alignItems: 'center',
      fontSize: 14,
    },

    errorContainer: {
        backgroundColor: 'rgba(249, 114, 114, 0.75)',
        marginLeft: 20,
        marginRight: 20,
        borderRadius:10,
      },
    
      errorText: {
        color: 'rgb(252, 249, 249)',
        margin: 10,
      },

      textSubmitProfile: {
        alignItems: 'center',
        color: 'rgb(22, 43, 59)',
        borderColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: 'transparent',
        fontSize: 15,
      },
    
      buttonContainer: {
        justifyContent: 'center',
        margin: 20,
        height: 50,
        alignItems: 'center',
        backgroundColor: 'rgb(95, 252, 218)',
        borderRadius: 5,
      },
  
  });