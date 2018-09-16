import React, {Component} from "react";
import {Animated, Dimensions, Platform, Text, View, StyleSheet, Image, Alert, TouchableHighlight} from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Communication from './communication';
import styles  from './styles';

import Menu, {
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';

export class UserMoreMenu extends Component {
    constructor(props){
        super(props);
        
    }

    render() {
        return (
            <Menu>
                <MenuTrigger style={{height: '100%', width: '100%', justifyContent: 'center'}}>
                    <View style={{height: '100%', width: '100%', justifyContent: 'center'}}> 
                        <Icon name='more-vert' color='white' style={{height: '100%', width: '100%'}}/>
                    </View>
                </MenuTrigger>
                <MenuOptions style={{ backgroundColor:'rgb(204, 204, 204)'}}>
                    <MenuOption value={1} style={{height: 40, justifyContent: 'center'}} onSelect={() => this.props.navigation.navigate('newUser')}>
                        <Text style={{color:'rgb(127, 127, 127)', fontSize: 14, fontWeight: 'bold' }}>  Editar</Text>
                    </MenuOption>
                    <MenuOption value={2} style={{height: 40, justifyContent: 'center'}} onSelect={() => Alert.alert('¿Desea eliminar el usuario?',
                                                                                                                        'Confirme',
                                                                                                                        [
                                                                                                                            {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                                                                                                            {text: 'Aceptar', onPress: () => Communication.getInstance().deleteUser(this.props.id)},
                                                                                                                        ],
                                                                                                                        { cancelable: false })}>
                        <Text style={{color:'rgb(127, 127, 127)', fontSize: 14, fontWeight: 'bold' }}>  Eliminar</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        );
    }
}

class Block extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex:1, flexDirection:'row', marginBottom:10, backgroundColor: 'rgb(127, 127, 127)'}} >
                <View style={{backgroundColor:'cyan', width:'3%', height:'100%'}} >
                </View>
                <View style={{backgroundColor: 'transparent', width:'87%', justifyContent: 'center', marginVertical:5, borderWidth:1, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderBottomColor: 'transparent', borderRightColor:'white'}} >
                    <Text style={styles.whiteText}>{this.props.name}</Text>
                </View>
                <View style={{backgroundColor: 'transparent', height: '100%', width:'10%', justifyContent: 'center', alignItems: 'center'}}>
                   <UserMoreMenu id={this.props.id} navigation={this.props.navigation}/>
                </View>
            </View>
        );
    }
}

export default withNavigation(Block);