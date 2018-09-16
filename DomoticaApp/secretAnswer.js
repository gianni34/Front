import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableHighlight, Alert, AsyncStorage, Dimensions } from 'react-native';

import { LogoLogin, ErrorMessage } from './commons';
import Communication from './communication';

var {height, width} = Dimensions.get('window');
const IMAGE_WIDTH = width*0.8;

export default class SecretAnswer extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: '',
            question: '',
            answer: '',
            submittable: '',
            errorMessage: false,
            message: 'La respuesta es incorrecta, intente nuevamente.',
        }
        
        this.imageHeight = 300;

        this.handleSubmit = this.handleSubmit.bind(this);
          
    }

    async handleSubmit() {
        okay = await Communication.getInstance().validateSecretAnswer(this.state.user, this.state.answer);
        if (okay) {
            this.props.navigation.navigate('changePassword', {user: this.state.user});
        } else {
            this.setState({ errorMessage: true });
        }
    }
    
    componentWillMount() {
        this.state.question = this.props.navigation.getParam('secretQuestion', '');
        this.state.user = this.props.navigation.getParam('user', '');
    }
    
    render(){
        this.state.submittable = this.state.answer.length > 0;
        const { submittable, errorMessage, message, answer } = this.state;
        return(
            <View style={{flex: 1, backgroundColor: 'rgb(22, 43, 59)'}}>
                <View style={{ marginTop:10, alignItems: 'center' }}>
                    <Image source={require('./images/futura.png')}  style={{width: IMAGE_WIDTH}} resizeMode='contain' />
                </View>
                <View style={{ marginTop: 40, backgroundColor: 'transparent', justifyContent: 'flex-start'}} >
                      
                    {errorMessage && <ErrorMessage message={message} />}
                
                    <View style={styles.labelContainerLogin}>
                        <Text style={styles.labelLogin}>{this.state.question}</Text>
                    </View>


                    <View style={styles.inputContainerLogin}>
                            
                    <TextInput
                        style={styles.inputLogin}
                        value={answer} 
                        placeholder="respuesta"
                        placeholderTextColor="rgb(202, 199, 199)"
                        underlineColorAndroid="transparent"
                        onChangeText={(answer) => this.setState({answer: answer})}
                    />
                
                    </View>
             
                    { submittable && (
                            <TouchableHighlight onPress={this.handleSubmit} underlayColor='rgb(22, 43, 59)'>
                                <View style={styles.buttonContainer}>
                                <Text style={styles.textSubmitLogin}>Continuar</Text>
                                </View>
                            </TouchableHighlight>
                    )}
                </View>
            </View>
        );
    }
}