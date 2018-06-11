import React, {Component} from "react";
import { Text, View, Image, Alert, TouchableHighlight, ScrollView, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native'

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
            name: "",
            password: "",
            passwordRepeat: "",
            isAdmin: false,
            errorMessage: false,
            message: 'Se produjo un problema, por favor intente nuevamente.',
            result: false,
            id: 0,
            changed: false,
        }

    }

    componentWillMount(){
        this.state.id = this.props.navigation.getParam('userId', 0);
        if (this.state.id > 0) {
            this.state.user  = Communication.getInstance().getUser(this.state.id);
            if(this.state.user){
                this.state.name = this.state.user.name;
                this.state.password = this.state.user.password;
                this.state.passwordRepeat = this.state.user.password;
                this.state.isAdmin = this.state.user.isAdmin;
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

    saveUser(){
        if(this.state.id > 0){
            Communication.getInstance().updateUser(this.state.id, this.state.name, this.state.password, this.state.isAdmin);         
        } else {
            Communication.getInstance().createUser(this.state.name, this.state.password, this.state.isAdmin);
        }
        this.props.navigation.goBack();
    }

    render(){
        const { name, password, passwordRepeat, isAdmin, errorMessage } = this.state;
        validData = name.length > 0 && password.length > 4 && password==passwordRepeat;
        this.state.submittable = (this.state.changed && this.state.id > 0 || this.state.id == 0) && validData;
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
                        <ToggleSwitch
                            isOn={isAdmin}
                            onColor='cyan'
                            offColor='rgb(204, 204, 204)'
                            size='small'
                            onToggle={(isAdmin) => this.changeIsAdmin(isAdmin)}
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