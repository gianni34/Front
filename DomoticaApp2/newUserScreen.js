import React, {Component} from "react";
import { Text, View, Image, Alert, TouchableHighlight, ScrollView, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native'

import styles  from './styles';


export default class NewUserScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: '',
            password: '',
            passwordRepeat: '',
            isAdmin: true,
            errorMessage: false,
            message: 'Se produjo un problema, por favor intente nuevamente.',
            result: false,
        }
    }

    componentWillMount(){
        if (this.state.id>0) {
            // fecth a la api y obtengo datos del usuario!
        }
    }

    render(){
        submittable = this.state.user.length > 0 && this.state.password.length > 4 && this.state.password==this.state.passwordRepeat;
        return(
            <ScrollView style={{flex: 1, flexDirection: 'column', backgroundColor: 'rgb(204, 204, 204)', paddingTop:5 }}>
                <View style={{ flex:1, flexDirection:'column', padding: 5, backgroundColor: 'rgb(127, 127, 127)', margin:5, borderRadius:10, borderWidth: 1, borderColor: 'transparent', overflow: 'hidden'}}>
                <View style={styles.inputContainerLogin}>
                        <Image source={require('./userIcon.png')} style={styles.inputIconLogin} />
                        <TextInput
                            style={styles.inputLogin}
                            value={this.state.user} 
                            placeholder="nombre de usuario"
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
                            value={this.state.passwordRepeat} 
                            placeholder="repita contraseña"
                            placeholderTextColor="rgb(202, 199, 199)"
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            onChangeText={(passwordRepeat) => this.setState({passwordRepeat: passwordRepeat})}
                        />                
                    </View>
                    <View style={styles.adminSwitchContainer}>
                        <Text style={styles.inputLogin}>Administrador</Text>
                        <ToggleSwitch
                            isOn={this.state.isAdmin}
                            onColor='cyan'
                            offColor='rgb(204, 204, 204)'
                            size='medium'
                            onToggle={(isAdmin) => this.setState({isAdmin: isAdmin})}
                        />                       
                    </View>
                </View>
                { submittable && (
                    <TouchableHighlight onPress={() => this.navigation.goBack()} underlayColor='transparent'>
                        <View style={styles.buttonContainerSave}>
                            <Text style={styles.textSubmitLogin}>Guardar</Text>
                        </View>
                    </TouchableHighlight>
                )} 
            </ScrollView>
        );
    }
}