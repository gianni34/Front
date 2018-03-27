import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput} from 'react-native';
import StackNavigator from './App.js'


function Logo(){
    return (
      <View style={{flex: 3, backgroundColor: 'transparent'}} >
  
        <View style={stylesP.logo}>
          <Image source={require('./domotica.png')} style={{flex: 1}} resizeMode="contain"/>
        </View>
      </View>
    );
  }
  

class ErrorMessage extends React.Component {
    constructor(props){
      super(props);
    }
  
    render(){
      return (
        <View style={stylesP.errorContainer} >
          <Text style={stylesP.errorText}>{this.props.message}</Text>
        </View>);
    }
}

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
        };
  
        this.handleChange = this.handleChange.bind(this);
        this.handleLogedIn = this.handleLogedIn.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
  
    componentDidMount(){
        fetch("http://192.168.0.34:8000/user/1/")
        .then(response => {return response.json()})
        .then((json) => this.setState(
            {userId: json.id, name: json.name, role: json.role, password: json.password, passwordConfirmation: json.password, secretQuestion: json.question, secretAnswer: json.answer, submittable: true}))
        .catch((error) => {
            console.log(error.message);
            });
    }
  
  
    handleLogedIn(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
        this.setState({submittable: false});
        fetch("http://192.168.0.34:8000/logged/"+this.state.name+"/")
        .then(response => {return response.json()})
        .then((json) => this.setState({ logedIn: json.result }))
        .catch((error) => {
            console.log(error.message);
          });
        this.setState({errorMessage: !this.state.logedIn });
        console.log("esta logueado");
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
        e.preventDefault();
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
        this.navigation.navigate('Login')  
    }
  
    render(){
      const { name, errorMessage, password, passwordConfirmation,secretQuestion, secretAnswer, submittable } = this.state;
      return (
            <View style={{flex: 1, backgroundColor: 'rgb(22, 43, 59)'}}>
                <View style={{flex: 2, backgroundColor: 'transparent', alignItems: 'center'}} >    
                { errorMessage && (
                    <ErrorMessage message={this.state.message}/>)
                }           
                    <View style={stylesP.inputContainerProfile}>
                        <Image source={require('./userIcon.png')} style={stylesP.inputIconProfile} />
                
                        <TextInput
                            style={stylesP.inputProfile}
                            value={this.state.name}
                            placeholder="Usuario"
                            placeholderTextColor="rgb(202, 199, 199)"
                            underlineColorAndroid="transparent"
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
                            onChangeText={(password) => this.setState({password: password})}
                        />
                    </View>
        
                    <View style={stylesP.inputContainerProfile}>
                        <Image source={require('./psswrdIcon.png')} style={stylesP.inputIconProfile} />
                        <TextInput
                            style={stylesP.inputProfile}
                            value={this.state.password}
                            placeholder="Confirmacion de Contraseña"
                            placeholderTextColor='rgb(199, 199, 199)'
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
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
                            onChangeText={(secretAnswer) => this.setState({secretAnswer: secretAnswer})}
                        />
                    </View>

                    { submittable && (
                    <TouchableHighlight onPress={() => this.handleSave} underlayColor='rgb(22, 43, 59)'>
                    <View style={stylesP.buttonContainer} key="2">
                    <Text style={stylesP.textSubmitProfile}>Guardar</Text>
                    </View>
                    </TouchableHighlight>
                    )} 
                </View>
            </View>       
          );
    }
  }

/*export default StackNavigator({
    Login: {
      screen: App,
    },
});*/

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
      fontSize: 17,
      fontFamily: 'sans-serif',
    },
  
    linkProfile: {
      color: 'rgb(179, 176, 176)',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      fontSize: 16,
    },
  
    buttonSubmitProfile: {
      alignItems: 'center',
      color: 'rgb(252, 249, 249)',
      borderColor: 'white',
      borderRadius: 5,
      alignItems: 'center',
      fontSize: 16,
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
        fontSize: 16,
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