import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, Alert, TouchableHighlight } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Profile from './Profile.js'

function LogoLogin(){
  return (
    <View style={{flex: 3, backgroundColor: 'transparent'}} >

      <View style={styles.logo}>
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
      <View style={styles.errorContainer} >
        <Text style={styles.errorText}>{this.props.message}</Text>
      </View>);
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
        user: '',
        password: '',
        submittable: false,
        logedIn: false,
        errorMessage: false,
        changePassword: false,
        message: 'No hemos encontrado esa combinación de usuario y contraseña. Si no recuerda su contraseña ingrese a Olvidé mi contraseña.',
    }

  }

  handleSubmit() {
    fetch("http://192.168.43.77:8000/login/Ceci/chechu/")
    .then(response => {return response.json()})
    .then((json) => this.setState({ logedIn: json.result, errorMessage: !json.result, idUser:json.id }))
    .catch((error) => {
      this.setState({errorMessage: true})
      console.error(error);
    });
    Alert.alert("holaaaaa putooooo!!");
  }
  
  render() {
    this.state.submittable = this.state.user.length > 0 && this.state.password.length > 4;
    const { user, password, submittable, logedIn, errorMessage, changePassword, idUser, message } = this.state;
    if (logedIn){
      return (<MainMenu />);
    }
    if(changePassword && !logedIn)
      return (<EnterUser/>);
    //submittable = user.length>0 && password.length > 4;
      return (
        <View style={{flex: 1, backgroundColor: 'rgb(22, 43, 59)'}}>

          <LogoLogin/>

          <View style={{flex: 2, backgroundColor: 'transparent', alignItems: 'center'}} >
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
          <View style={{flex: 2, backgroundColor: 'transparent', justifyContent: 'flex-start'} } >
            
            { submittable && (
              <TouchableHighlight onPress={this.handleSubmit} underlayColor='rgb(22, 43, 59)'>
                <View style={styles.buttonContainer} key="3">
                  <Text style={styles.textSubmitLogin}>Login</Text>
                </View>
              </TouchableHighlight>
            )}            
            
            <View style={styles.linkLogin} key="1" >
                <Text style={styles.textLinkLogin} onPress={() => this.props.navigation.navigate('ForgotPassword')} >OLVIDÉ MI CONTRASEÑA</Text>
            </View>

            <View style={styles.linkLogin} key="2" >
                <Text style={styles.textLinkLogin} onPress={() => this.props.navigation.navigate('Profile')} >IR A MI PERFIL</Text>
            </View>
          </View>
        </View>


        /*<View style={styles.windowLogoContainer}>
          <View key="1" style={styles.windowLogoContainer}>
            <View style={styles.logo}>
              <Image source={require('./domotica.png')} style={{flex: 1}} resizeMode="contain"/>
            </View>
            { errorMessage && (
              <View style={styles.errorContainer} >
                <Text style={styles.errorText}>No hemos encontrado esa combinación de usuario y contraseña. Si no recuerda su contraseña ingrese a Olvidé mi contraseña.</Text>
              </View>)
            }
          </View>
          <View key='2' style={styles.windowInputContainer}>
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
                  placeholder="contraseña"
                  placeholderTextColor='rgb(199, 199, 199)'
                  underlineColorAndroid="transparent"
                  onChangeText={(password) => this.setState({password: password})}
                />

              </View>
          </View>
          <View style={styles.windowButtonContainer}>

              <View style={styles.linkLogin} key="1">
                <Text style={styles.textLinkLogin} onPress={this.handleChange}>OLVIDÉ MI CONTRASEÑA</Text>
              </View>

              { submittable && (
                <View style={styles.buttonContainer} key="2">
                  <Text title="Login" />
                  <Button color='rgb(95, 252, 218)' title="Login"  onPress={this.handleSubmit} containerViewStyle={{width: '100%', marginLeft: 0}}/>
                </View>
              )}
          </View>
        </View>*/
      );
  }
}

class ForgotPassword extends React.Component {
  constructor(){
    super();

    this.state = {
      user: '',
      submittable: false,
      errorMessage: false,
      result: false,
      idUser: 0,
      message: 'No se encontró un usuario con ese nombre.'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleSubmit(){
    /*fetch("http://127.0.0.1:8000/validateUser/"+this.state.user+"/")
    .then(response => {return response.json()})
    .then((json) => this.setState({ result: json.result, errorMessage: !json.result, idUser: json.id }))
    .catch((error) => {
      console.log(error.message);
    });
    if(this.state.result){*/
      // pasar a nueva contraseña
   // }
  }


  render(){
    this.state.submittable = this.state.user.length > 0;
    const { user, submittable, errorMessage, idUser, message, result } = this.state;
    return (
      <View style={{flex: 1, backgroundColor: 'rgb(22, 43, 59)'}}>
        <LogoLogin/>
        
        <View>
          {errorMessage && <ErrorMessage message={message} />}
        </View>
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
              <TouchableHighlight onPress={() => this.navigation.navigate('SecretAnswer')} underlayColor='rgb(22, 43, 59)'>
                <View style={styles.buttonContainer} key="2">
                  <Text style={styles.textSubmitLogin}>Continuar</Text>
                </View>
              </TouchableHighlight>
        )} 
      </View>
    );
  }
}

class SecretAnswer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      question: '',
      answer: '',
      submittable: '',
      errorMessage: false,
      message: 'La respuesta es incorrecta, intente nuevamente.',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleSubmit() {
    /*fetch("http://127.0.0.1:8000/validateUser/"+this.state.user+"/")
    .then(response => {return response.json()})
    .then((json) => this.setState({ result: json.result, errorMessage: !json.result, idUser: json.id }))
    .catch((error) => {
      console.log(error.message);
    });
    if(this.state.result){*/
      //() => this.props.navigation.navigate('Login'); 
   // }
  }

  componentWillMount() {
     question = '¿Quién es su persona favorita?';
  }

  render(){
    this.state.submittable = this.state.answer.length > 0;
    const { submittable, errorMessage, message } = this.state;
    return(
      <View style={{flex: 1, backgroundColor: 'rgb(22, 43, 59)'}}>
        <LogoLogin/>
        
        <View>
          {errorMessage && <ErrorMessage message={message} />}
        </View>
        <View style={styles.inputContainerLogin}>
                
          <TextInput
            style={styles.inputLogin}
            value={this.state.answer} 
            placeholder="respuesta"
            placeholderTextColor="rgb(202, 199, 199)"
            underlineColorAndroid="transparent"
            onChangeText={(answer) => this.setState({answer: answer})}
          />
    
        </View>
        { submittable && (
              <TouchableHighlight onPress={() => this.navigation.navigate('ChangePassword')} underlayColor='rgb(22, 43, 59)'>
                <View style={styles.buttonContainer}>
                  <Text style={styles.textSubmitLogin}>Continuar</Text>
                </View>
              </TouchableHighlight>
        )}
      </View>
    );
  }
}

class ChangePassword extends React.Component {
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

  }

  render(){
    this.state.submittable = this.state.password.length > 4 && this.state.password==this.state.repeatPassword; 
    const { submittable, errorMessage, message, result, password, repeatPassword } = this.state;
    return(
      <View style={{flex: 1, backgroundColor: 'rgb(22, 43, 59)'}}>
        <LogoLogin/>
        
        <View>
          {errorMessage && <ErrorMessage message={message} />}
        </View>
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
              <TouchableHighlight onPress={() => this.navigation.navigate('Login')} underlayColor='rgb(22, 43, 59)'>
                <View style={styles.buttonContainer}>
                  <Text style={styles.textSubmitLogin}>Continuar</Text>
                </View>
              </TouchableHighlight>
        )}
      </View>
    );
  }
}

/*class MainMenu extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      role = 0,
    }
  }

  render(){
    return(<Text>Menu ppal</Text>);
  }
}*/

export default StackNavigator({
    Login: {
      screen: App,
    },
    ForgotPassword: {
      screen: ForgotPassword,
    },
    SecretAnswer: {
      screen: SecretAnswer,
    },
    ChangePassword: {
      screen: ChangePassword,
    },
    Profile: {
      screen: Profile,
    }
    /*MainMenu: { 
      screen: MainMenu,
    },*/
  },
  {
    initialRouteName: 'Login',
  }
);

const styles = StyleSheet.create({
 
  baseText: {
    fontFamily: 'sans-serif',
  },

  windowLogoContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(22, 43, 59)',
  },

  windowInputContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  windowButtonContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  
  logo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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

  inputContainerLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: .5,
    borderBottomColor: 'rgb(252, 249, 249)',
    height: 40,
    margin: 20,
  },
  
  inputIconLogin: {
    padding: 10,
    margin: 5,
    marginLeft: 20,
    height: 10,
    width: 10,
    resizeMode : 'stretch',
    alignItems: 'center',
  },
 
  inputLogin:{
    flex:1, 
    paddingLeft: 20, 
    color: 'rgb(252, 249, 249)',
    fontSize: 17,
  },

  linkLogin: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    alignItems: 'center',
    height: 30,
  },
  
  textLinkLogin: {
    flex:1,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: 'rgb(252, 249, 249)',
    fontSize: 16,
  },

  textSubmitLogin: {
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
