import { createStackNavigator } from 'react-navigation';
import DrawerStackAdmin from './drawerStackAdmin';
import DrawerStackUser from './drawerStackUser';
import UserScreen from './userScreen';
import SceneScreen from './sceneScreen';
import LogIn from './login';
import ForgotPassword from './forgotPassword';
import SecretAnswer from './secretAnswer';
import ChangePassword from './changePassword';
import ZoneScreen from './zone';
import ActionScreen from './actionScreen';
import ConfigIP  from './configIP';


export const AppNavAdmin = createStackNavigator({
    drawerStack: {screen: DrawerStackAdmin, navigationOptions:{ header: null }},
    newUser: {screen: UserScreen, },
    newScene: {screen: SceneScreen, },
    zone: {screen: ZoneScreen},
    action: {screen: ActionScreen},
},{
    headerMode: 'screen',
    initialRouteName: 'drawerStack',
    navigationOptions: ({navigation}) => ({
      headerStyle: { 
          backgroundColor: 'rgb(22, 43, 59)',
          paddingLeft: 10,
          paddingRight: 10
      },
      headerTintColor: 'white',
    })
});

export const AppNavUser = createStackNavigator({
    drawerStack: {screen: DrawerStackUser, navigationOptions:{ header: null }},
    newScene: {screen: SceneScreen, },
    zone: {screen: ZoneScreen},
    action: {screen: ActionScreen},
},{
    headerMode: 'screen',
    initialRouteName: 'drawerStack',
    navigationOptions: ({navigation}) => ({
      headerStyle: { 
          backgroundColor: 'rgb(22, 43, 59)',
          paddingLeft: 10,
          paddingRight: 10
      },
      headerTintColor: 'white',
    })
});

export const AuthNav = createStackNavigator({
    logIn: {
        screen: LogIn,
        navigationOptions:{ title: '           Inicie sesión' }
    }, 
    forgotPassword: {
        screen: ForgotPassword,
        navigationOptions:{ title: 'Ingrese su usuario' }
    },
    secretAnswer: {
        screen: SecretAnswer,
        navigationOptions:{ title: 'Pregunta secreta' }
    },
    changePassword: {
        screen: ChangePassword,
        navigationOptions:{ title: 'Ingrese su nueva contraseña' }
    },
    config: {
        screen: ConfigIP,
    },
},{
    initialRouteName: 'logIn',
    headerMode: 'screen',
    navigationOptions: ({navigation}) => ({
        headerStyle: { 
            backgroundColor: 'rgb(22, 43, 59)',
            paddingLeft: 10,
            paddingRight: 10
        },
        headerTintColor: 'white',
    })
})
