import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, Text } from 'react-native';
import { stat } from 'fs';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
        user: '',
        password: '',
        submittable: false,
        logedIn: false,
        errorMessage: false,
        changePassword: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(e) {
    e.preventDefault();
    this.setState({password: e.password, user: e.user});
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (this.state.user && this.state.password.length > 4)
        this.setState({ submittable: true});
    else 
        this.setState({ submittable: false});
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    fetch("http://127.0.0.1:8000/login/"+this.state.user+"/"+this.state.password+"/")
    .then(response => {return response.json()})
    .then((json) => this.setState({ logedIn: json.result }));
    this.setState({errorMessage: !this.state.logedIn });
  }
 
  render() {
    const { user, password, submittable, logedIn, errorMessage, changePassword, idUser } = this.state;
    
    if (logedIn){
      return (<MainMenu />);
    }
    if(changePassword && !logedIn)
      return (<EnterUser/>);
      return (
      <View style={styles.windowContainerLogin}>
        <View style={{height: 40}} />
        <View style={styles.logoContainerLogin}>
           <Image source={require('./domotica.png')} style={{flex: 1}} resizeMode="contain"/>
        </View>
        { errorMessage && (
          <View id="login">
            <Text>No hemos encontrado esa combinación de usuario y contraseña. Si no recuerda su contraseña ingrese a Olvidé mi contraseña.</Text>
          </View>)
        }
        <View style={styles.inputContainerLogin}>
          <Image source={require('./userIcon.png')} style={styles.inputIconLogin} />
  
          <TextInput
              style={styles.inputLogin}
              placeholder="usuario"
              placeholderTextColor="rgb(202, 199, 199)"
              underlineColorAndroid="transparent"
              onChangeText={this.handleChange}
          />
 
        </View>

        <View style={styles.inputContainerLogin}>
 
          <Image source={require('./psswrdIcon.png')} style={styles.inputIconLogin} />

          <TextInput
              style={styles.inputLogin}
              placeholder="contraseña"
              placeholderTextColor='rgb(199, 199, 199)'
              underlineColorAndroid="transparent"
          />

        </View>

        <View style={styles.linkLogin}>
          <Text style={styles.linkLogin} title="OLVIDÉ MI CONTRASEÑA" onPress={this.handleChange} />
        </View>

        { submittable && (
          <View style={styles.buttonSubmitLogin}>
            <Text style={styles.buttonSubmitLogin} value="Login"  onPress={this.handleSubmit} />
          </View>
        )}
      </View>

    );
  }
}

class MainMenu extends React.Component{
  constructor(props){
    super(props);

    this.state = {
        zones: [],
        scenes: [],
    };

    this.changeSceneStatus = this.changeSceneStatus.bind(this);
    
  }
  
  componentWillMount(){
    /* obtenemos las zonas */
    var zoneList = [];
    fetch("http://127.0.0.1:8000/zones/")
    .then(results => results.json())
    .then((json) => this.setState( {zones: json.zones
    }));
    this.setState({zones: zoneList});
    /* obtenemos las escenas */
    var sceneList = [];
    fetch("http://127.0.0.1:8000/scenes/")
    .then(results => results.json())
    .then((json) => this.setState( {zones: json.scenes
    }));
    this.setState({scenes: sceneList});
  }

  changeSceneStatus(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    fetch("http://127.0.0.1:8000/sceneStatus/"+this.state.id+"/")
    .then(response => {return response.json()})
    .then((json) => this.setState(
        { result: !json.result, errorMessage: json.errorMessage}));
  }

  render(){
    let zoneList = this.state.zones;
    let sceneList = this.state.scenes;
    return (
        <View className="windowContainer-main-menu">
            <View>
                <View>
                    <Text> Zonas </Text>
                </View>
                <View>
                {
                    zoneList.map(item =>
                    <button className="" key={item.id} value={item.name} onClick={navigateZone}/>)
                }
                </View>
            </View>
            <View>
                <View>
                    <Text> Escenas </Text>
                </View>
                <View>
                {
                    sceneList.map(item =>
                    <Scene idScene={item.id} status={item.status} key={item.id} value={item.name} onClick={Scene.changeStatus()}/>)
                }
                </View>
            </View>
        </View>
    );
  }
};
 
class Scene extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      
    }

    
    this.changeStatus() = this.changeStatus.bind(this);
    
  }

  changeStatus(){
    fetch("http://127.0.0.1:8000/sceneStatus/"+this.props.idScene+"/"+this.props.status)
    .then(response => {return response.json()})
    .then((json) => this.setState(
        { result: !json.result, errorMessage: json.errorMessage}));
  }
}
 
const styles = StyleSheet.create({
 
  baseText: {
    fontFamily: 'sans-serif',
  },

  windowContainerLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(22, 43, 59)',
  },
  
  inputContainerLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: .5,
    borderBottomColor: 'rgb(252, 249, 249)',
    height: 50,
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
    fontFamily: 'sans-serif',
  },

  linkLogin: {
    color: 'rgb(179, 176, 176)',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    fontSize: 16,
  },

  buttonSubmitLogin: {
    alignItems: 'center',
    color: 'rgb(252, 249, 249)',
    borderColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    fontSize: 16,
  },

});

      
   
     

