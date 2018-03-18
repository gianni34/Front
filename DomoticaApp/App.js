import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
        user: 'ceci',
        password: 'chechu',
        submittable: false,
        logedIn: false,
        errorMessage: true,
        changePassword: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);

  };

  handleSubmit(event) {
    this.setState({value: event.target.value});
    fetch("http://127.0.0.1:8000/login/"+this.state.user+"/"+this.state.password+"/")
    .then(response => {return response.json()})
    .then((json) => this.setState({ logedIn: json.result, errorMessage: !json.result }))
    .catch((error) => {
      console.log(error.message);
    });
  }
  
  render() {
    this.state.submittable = this.state.user.length > 0 && this.state.password.length > 4;
    const { user, password, submittable, logedIn, errorMessage, changePassword, idUser } = this.state;
    if (logedIn){
      return (<MainMenu />);
    }
    if(changePassword && !logedIn)
      return (<EnterUser/>);
    //submittable = user.length>0 && password.length > 4;
      return (
        <View style={{flex: 1, backgroundColor: 'rgb(22, 43, 59)'}}>

          <View style={{flex: 3, backgroundColor: 'transparent'}} >

            <View style={styles.logo}>
              <Image source={require('./domotica.png')} style={{flex: 1}} resizeMode="contain"/>
            </View>

          </View>

          <View style={{flex: 2, backgroundColor: 'transparent', alignItems: 'center'}} >
            { errorMessage && (
              <View style={styles.errorContainer} >
                <Text style={styles.errorText}>No hemos encontrado esa combinación de usuario y contraseña. Si no recuerda su contraseña ingrese a Olvidé mi contraseña.</Text>
              </View>)
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
                  placeholder="contraseña"
                  placeholderTextColor='rgb(199, 199, 199)'
                  underlineColorAndroid="transparent"
                  onChangeText={(password) => this.setState({password: password})}
                />

              </View>


          </View>
          <View style={{flex: 2, backgroundColor: 'transparent', justifyContent: 'flex-start'} } >
            
            { submittable && (
                <View style={styles.buttonContainer} key="2">
                  <Text style={styles.textSubmitLogin}>Login</Text>
                </View>
            )}
            <View style={styles.linkLogin} key="1">
                <Text style={styles.textLinkLogin} onPress={this.handleChange}>OLVIDÉ MI CONTRASEÑA</Text>
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
  render(){
    return (<Text>Vamo los pibeeeee!!!</Text>);
  }
}

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
