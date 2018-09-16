import React, { Component } from 'react';
import { Animated, Dimensions, Text, View, Image, ScrollView, TextInput, TouchableHighlight, TouchableOpacity, Alert, AsyncStorage, Keyboard, KeyboardAvoidingView } from 'react-native';

import styles from './styles';
import Communication from './communication';

export default class ConfigIP extends Component{
    constructor(props) {
        super(props);

        this.state = {
            ip: ''
        }
                
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    ComponentDidMount(){
        ip = Communication.getInstance().getIP();
        this.setState({ip: ip});
    }

    handleSubmit(){
        Communication.getInstance().setIP(this.state.ip);
        this.props.navigation.goBack();
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: 'rgb(22, 43, 59)', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.inputContainerLogin}>
                    <TextInput style={styles.inputLogin}
                    value={this.state.ip} 
                    placeholder="IP servidor"
                    placeholderTextColor="rgb(202, 199, 199)"
                    underlineColorAndroid="transparent"
                    onChangeText={(ip) => this.setState({ip: ip})}/>
                </View>
                <View style={{ width:'100%', backgroundColor: 'transparent', justifyContent: 'flex-start'}} >    
                    <TouchableHighlight onPress={this.handleSubmit} underlayColor='rgb(22, 43, 59)'>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.textSubmitLogin}>Guardar</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}