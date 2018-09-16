import React, {Component} from "react";
import { Text, View, Image, Alert, TouchableHighlight, ScrollView, Switch, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
//import ToggleSwitch from 'toggle-switch-react-native'

import styles  from './styles';
import Communication from "./communication";

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

export default class UserScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: {},
            name: '',
            password: '',
            passwordRepeat: '',
            isAdmin: false,
            errorMessage: false,
            message: 'Se produjo un problema, por favor intente nuevamente.',
            result: false,
            id: 0,
            changed: false,
        }

    }

    setStateAsync(state) {
        return new Promise((resolve) => {
          this.setState(state, resolve)
        });
    }

    async componentDidMount(){
        this.state.id = this.props.navigation.getParam('userId', 0);
        if (this.state.id > 0) {
            user  = await Communication.getInstance().getUser(this.state.id);
            if (user){
                this.state.user = user;
                this.state.name = user.name;
                this.state.password = user.password;
                this.state.passwordRepeat = user.password;
                this.state.isAdmin = user.isAdmin;
                await this.setStateAsync({errorMessage: false});
                console.log('datos levantados '+ this.state.name);
            }
        }
    }

    changeName(name){
        if(this.state.id > 0){
            this.state.changed = this.state.user.name != name || this.state.user.password != this.state.password || this.state.user.password != this.state.passwordRepeat || this.state.user.isAdmin != this.state.isAdmin;
        }
        this.setState({name: name});
    }

    changePassword(password){
        if(this.state.id > 0){
            this.state.changed = this.state.user.password != password || this.state.user.name != this.state.name || this.state.user.password != this.state.passwordRepeat || this.state.user.isAdmin != this.state.isAdmin;
        }
        this.setState({password: password});
    }

    changePasswordRepeat(password){
        if(this.state.id > 0){
            this.state.changed = this.state.user.password != password || this.state.user.password != this.state.password || this.state.user.name != this.state.name || this.state.user.isAdmin != this.state.isAdmin;
        }
        this.setState({passwordRepeat: password});
    }

    changeIsAdmin(isAdmin){
        if(this.state.id > 0){
            this.state.changed = this.state.user.isAdmin != isAdmin || this.state.user.password != this.state.password || this.state.user.name != this.state.name || this.state.user.password != this.state.password;
        }
        this.setState({isAdmin: isAdmin});
    }

    async saveUser(){
        if (this.state.id > 0){
            result = await Communication.getInstance().updateUser(this.state.id, this.state.name, this.state.password, this.state.isAdmin);         
            console.log("update");
        } else {
            result = await Communication.getInstance().createUser(this.state.name, this.state.password, this.state.isAdmin);
        }
        if (result.error){
            this.setStateAsync({message: result.message, errorMessage: result.error});
        } else {
            this.props.navigation.state.params.refresh();
            this.props.navigation.goBack();
        }
    }

    
    render(){
        const { id, name, password, passwordRepeat, isAdmin, errorMessage, changed } = this.state;
        //validData = name && password.length > 4 && password==passwordRepeat;
        validData = name.length > 0 && password.length > 4 && password==passwordRepeat;
        this.state.submittable = (changed && id > 0 || id == 0) && validData;
        submittable = this.state.submittable;
        return(
            <ScrollView style={{flex: 1, flexDirection: 'column', backgroundColor: 'rgb(204, 204, 204)', paddingTop:5 }}>
                <View style={{ flex:1, flexDirection:'column', padding: 5, backgroundColor: 'rgb(127, 127, 127)', margin:5, borderRadius:10, borderWidth: 1, borderColor: 'transparent', overflow: 'hidden'}}>
                
                { errorMessage && (
                    <View style={{marginTop:20}}>
                    <ErrorMessage message={this.state.message}/></View>)
                }
                
                <View style={styles.inputContainerLogin}>
                        <Image source={require('./userIcon.png')} style={styles.inputIconLogin} />
                        <TextInput
                            style={styles.inputLogin}
                            value={name} 
                            placeholder="nombre de usuario"
                            placeholderTextColor="rgb(202, 199, 199)"
                            underlineColorAndroid="transparent"
                            onChangeText={(name) => this.changeName(name)}
                        />                
                    </View>
                    <View style={styles.inputContainerLogin}>
                        <Image source={require('./psswrdIcon.png')} style={styles.inputIconLogin} />
                        <TextInput
                            style={styles.inputLogin}
                            value={password} 
                            placeholder="contraseña"
                            placeholderTextColor="rgb(202, 199, 199)"
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            onChangeText={(password) => this.changePassword(password)}
                        />                
                    </View>
                    <View style={styles.inputContainerLogin}>
                        <Image source={require('./psswrdIcon.png')} style={styles.inputIconLogin} />
                        <TextInput
                            style={styles.inputLogin}
                            value={passwordRepeat} 
                            placeholder="repita contraseña"
                            placeholderTextColor="rgb(202, 199, 199)"
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            onChangeText={(passwordRepeat) => this.changePasswordRepeat(passwordRepeat)}
                        />                
                    </View>
                    <View style={styles.adminSwitchContainer}>
                        <Text style={styles.inputLogin}>Administrador</Text>
                        <Switch
                            value={isAdmin}
                            onTintColor='cyan'
                            tintColor='rgb(204, 204, 204)'
                            onValueChange={(isAdmin) => this.changeIsAdmin(isAdmin)}
                        />                      
                    </View>
                </View>
                { submittable && (
                    <TouchableHighlight onPress={() => this.saveUser()} underlayColor='transparent'>
                        <View style={styles.buttonContainerSave}>
                            <Text style={styles.textSubmitLogin}>Guardar</Text>
                        </View>
                    </TouchableHighlight>
                )} 
            </ScrollView>
        );
    }
}