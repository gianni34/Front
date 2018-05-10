import React, {Component} from "react";
import { Text, View, Image, Alert, TouchableHighlight} from 'react-native';
import { Icon } from 'react-native-elements';

import styles  from './styles';
import Block from './Menu';

export default class Users extends Component {
    constructor(props){
        super(props);

        this.state = {
            users: [
                {name:"Ceci", id:1},{name:"Caro", id:2},{name:"Fran", id:3},{name:"Nancy", id:4}]
        }

    }
     render(){
         return(
            <View style={{flex: 1, backgroundColor: 'rgb(204, 204, 204)', paddingTop:10 }}>
               {this.state.users.map(item =>
                    <View style={{ height:70, marginTop:10, marginHorizontal:10 }} key={item.id}>
                        <Block name={item.name} key={item.id}/>
                    </View>)}
            </View>
         );
     }
}