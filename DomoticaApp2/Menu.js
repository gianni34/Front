import React, {Component} from "react";
import {Animated, Dimensions, Platform, Text, View, StyleSheet, Image, Alert, TouchableHighlight} from 'react-native';
import { Icon } from 'react-native-elements';

import styles  from './styles';

/*import Menu, {
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';*/

/*const moreIcon = ({id}) => (
    <Menu>
        <MenuTrigger text='Select action'>
            <Icon name='more-vert' color='white'/>
        </MenuTrigger>
        <MenuOptions>
            <MenuOption onSelect={() => alert(`Save ` + id)} text='Editar' />
            <MenuOption onSelect={() => alert(`Delete `+ id)} text='Eliminar' />
        </MenuOptions>
    </Menu>
  )*/

export default class Block extends Component {
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
                   <Icon name='more-vert' color='white'/>
                </View>
            </View>
        );
    }
}