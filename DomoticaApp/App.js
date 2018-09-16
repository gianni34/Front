import React, { Component } from 'react';
import { AsyncStorage, View, StatusBar } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import { AppNavUser, AppNavAdmin, AuthNav } from './navigators';

import { AppLoading, Font } from 'expo';

import FontAwesome 
  from './node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';
import MaterialIcons  
  from './node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
  import Entypo 
  from './node_modules/@expo/vector-icons/fonts/Entypo.ttf';
import MaterialCommunityIcons  
  from './node_modules/@expo/vector-icons/fonts/MaterialCommunityIcons.ttf';

import LogIn from './login';
import Communication from './communication';
import Encryption from './encryption';

export class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
          fontLoaded: false
        }

        this._bootstrapAsync();
      }

      setStateAsync(state) {
        return new Promise((resolve) => {
          this.setState(state, resolve)
        });
      }

      /*async componentWillMount() {
        try {
          await Font.loadAsync({
            FontAwesome,
            MaterialIcons, 
            Entypo,
            MaterialCommunityIcons
          });
          this.fontLoaded = true;
        } catch (error) {
          console.log('error loading icon fonts', error);
        }
      }*/

         
      // Fetch the token from storage then navigate to our appropriate place
      _bootstrapAsync = async () => {
        logged = false;
        const userToken = await AsyncStorage.getItem('userToken');
        
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
        var isAdmin = false;
        if (userToken){
         // encrypted = Encryption.encrypt(userToken);
          console.log("userToken encrypted: " + userToken);
          //console.log("userTocken encrypted: " + encrypted);
          var decrypted = Encryption.decrypt(userToken);
          //console.log("userToken almacenado: " + userToken);
          console.log("userTocken decrypted: " + decrypted);
          user = decrypted.split('&');
          if (user.length == 3){
            Communication.getInstance().setId(user[0]);
            response = await Communication.getInstance().authenticate(user[1], user[2]);
            logged = response.result;
            if (logged)
              isAdmin = response.isAdmin;
          }
        }
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
        console.log(" ES ADMIN? "+isAdmin);
        if(logged && isAdmin)
          this.props.navigation.navigate('AppAdmin');
        else
          this.props.navigation.navigate(logged ? 'AppUser' : 'Auth');
        
       };
    
      render() {
        return (
            <View />
        );
        
      }
}
  
//export const App = createSwitchNavigator(
export default createSwitchNavigator(
{
    AuthLoading: AuthLoadingScreen,
    AppAdmin: AppNavAdmin,
    AppUser: AppNavUser,
    Auth: AuthNav,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

//export default App;

