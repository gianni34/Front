import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, Alert, TouchableHighlight, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { createStackNavigator } from 'react-navigation';
//import Profile from './Profile.js'

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

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
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
                <Text style={styles.textLinkLogin} onPress={() => this.props.navigation.push('ForgotPassword')} >OLVIDÉ MI CONTRASEÑA</Text>
            </View>

            <View style={styles.linkLogin} key="2" >
                <Text style={styles.textLinkLogin} onPress={() => this.props.navigation.push('Profile')} >IR A MI PERFIL</Text>
            </View>
          </View>
        </View>
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
   /* fetch("http://127.0.0.1:8000/validateUser/"+this.state.user+"/")
    .then(response => {return response.json()})
    .then((json) => this.setState({ result: json.result, errorMessage: !json.result, idUser: json.id }))
    .catch((error) => {
      console.log(error.message);
    });
    if(this.state.result){
      // pasar a nueva contraseña
    }*/
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
              <TouchableHighlight onPress={() => this.navigation.push('SecretAnswer')} underlayColor='rgb(22, 43, 59)'>
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
      //() => this.props.navigation.push('Login'); 
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
              <TouchableHighlight onPress={() => this.navigation.push('ChangePassword')} underlayColor='rgb(22, 43, 59)'>
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
              <TouchableHighlight onPress={() => this.navigation.push('Login')} underlayColor='rgb(22, 43, 59)'>
                <View style={styles.buttonContainer}>
                  <Text style={styles.textSubmitLogin}>Continuar</Text>
                </View>
              </TouchableHighlight>
        )}
      </View>
    );
  }
}



class Scene extends React.Component {
  constructor(props){
      super(props);

      this.state = {
          result: false,
          errorMessage: '',
      }

      //this._excecuteScene = this._excecuteScene.bind(this);
  
  }
  
  /*_excecuteScene(){
      fetch("http://127.0.0.1:8000/excecuteScene/"+this.props.idScene+"/")
      .then(response => {return response.json()})
      .then((json) => this.setState(
        { result: !json.result, errorMessage: json.errorMessage})
      );
  }*/
  
  render(){
      return(
        <Button title={this.props.name} onPress={Alert.alert("okay!")} />
      );
  }
}

class Zone extends React.Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  render(){
    var url = './images/' + this.props.type + '.png';
    if (this.props.type == 'living'){
      return(
        <View style={styles.zoneContainer}>
          <Image source={require('./images/living.png')} style={{flex: 1, position:'absolute'}} resizeMode="cover"/>
        </View>
      );
    }
    else if (this.props.type == 'dining'){
      return(
        <View style={styles.zoneContainer}>
          <Image source={require('./images/dining.png')} style={{flex: 1, position:'absolute'}} resizeMode="cover"/>
          </View>
      );
    }
    else if (this.props.type == 'hallway'){
      return(
        <View style={styles.zoneContainer}>
          <Image source={require('./images/hallway.png')} style={{ position:'absolute'}} resizeMode="cover">
          
            
          
          </Image>
          <Text style={styles.whiteText}>    {this.props.name}</Text>
          </View>
      );
    }
    else {
      return(
        <View style={styles.zoneContainer}>
        <Image source={require('./images/bathroom.png')} style={{flex: 1}} resizeMode="cover"/>
        </View>
      );
    }
  }
}

class ZonesTab extends React.Component {
  constructor(props){
      super(props);

      this.state = {
          zones: [
            { name: 'Living', id: 1, type: 'living' },
            { name: 'Comedor', id: 2, type: 'dining' },
            { name: 'Baño principal', id: 3, type: 'bathroom' },
            { name: 'Pasillo', id:4, type: 'hallway' },
            /*{ name: 'Living 2', id:5, type: 'living' },
            { name: 'Comedor', id: 6, type: 'dining' },
            { name: 'Baño principal', id: 7, type: 'bathroom' },
            { name: 'Pasillo', id:8, type: 'hallway' },*/
          ],
      }

      this.actualizar = this.actualizar.bind(this);
  }

  actualizar(){
    // obtenemos las zonas
    /*fetch("http://127.0.0.1:8000/zones/")
    .then(results => results.json())
    .then((json) => (this.setState({zones : json.zones})))
    .catch((error) => {
      console.error(error);
    });*/
  }
  
  render(){
      let zoneList = this.state.zones;
      return(
          <View style={styles.mainMenuContainer}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {
                    this.state.zones.map(item =>
                    <Zone name={item.name} key={item.id} type={item.type}/>)
                }
            </ScrollView>
          </View>
      );
  }

};

class ScenesTab extends React.Component {
  constructor(props){
      super(props);

      this.state = {
          scenes: []
      }
  }

  /*componentWillMount(){
      // obtenemos las escenas
      fetch("http://127.0.0.1:8000/scenes/")
      .then(results => results.json())
      .then((json) => this.state.scenes = json.scenes);
  }*/

  render(){
      return(
          <View style={styles.mainMenuTab}>
            <View style={styles.mainMenuContainer}>
              {
                    this.state.scenes.map(item =>
                    <Scene name={item.name} idScene={item.id} key={item.id} description={item.description}/>)
              }
            </View>
          </View>
      );
  }
};

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
  backgroundColor: 'rgb(22, 43, 59)',
};

class MainMenu extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          index: 0,
          routes: [
          { key: 'zones', title: 'Cuartos' },
          { key: 'scenes', title: 'Escenas' },
          ],
      };

      this._handleIndexChange = this._handleIndexChange.bind(this);
      this._renderHeader = this._renderHeader.bind(this);
      this._renderScene = this._renderScene.bind(this);
  }

  _handleIndexChange = index => this.setState({ index });
  
  _renderHeader = props => <TabBar style={styles.tabBar} {...props} />;

  _renderHeaderCustom = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(
              inputIndex => (inputIndex === i ? '#D6356C' : '#222')
            ),
          });
          return (
            <TouchableOpacity
              style={styles.tabView}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  
  _renderScene = SceneMap({
      zones: ZonesTab,
      scenes: ScenesTab,
  });

  render() {
      return (
      <TabViewAnimated style={styles.tabView}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
      />
      );
  }
}

createStackNavigator({
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
  /*Profile: {
    screen: Profile,
  },*/
  MainMenu: { 
    screen: MainMenu,
  },
},
{
  initialRouteName: 'Login',
}
);


const styles = StyleSheet.create({

  baseText: {
    fontFamily: 'sans-serif',
  },

  tabView: {
    paddingTop: 22,
    backgroundColor: 'rgb(22, 43, 59)',
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

  mainMenuTab: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgb(22, 43, 59)',
  },

  mainMenuContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'rgb(22, 43, 59)',
  },

  zoneContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 10, 
    height: 170,
    backgroundColor: 'rgb(33, 33, 33)',
    opacity: .8,
  },

  scrollView : {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
  },

  zoneLabelContainer: {
    flex: 1,
    height: 30,
    backgroundColor: 'rgb(33, 33, 33)',
    opacity: .6,
  },

  whiteText: {
    fontSize: 20,
    color: 'rgb(252, 249, 249)',
    fontWeight: 'bold',
  }

});

