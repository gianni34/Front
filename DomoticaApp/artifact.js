import React, { Component } from 'react';
import { Text, View, Image, Alert, TouchableHighlight, ScrollView, Switch, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';


import styles from './styles';
import Communication from './communication';
import Variables from './variables';

export default class Artifact extends Component {
    constructor(props){
        super(props);

        this.state = {
            artifact: null,
            variables:[],
            on: false,
        }

        this.refresh = this.refresh.bind(this);
    }

    refresh(){
        console.log("refresh en artifact");
        //this.changeValue(this.state.on);
        this.props.handler();
    }

    changeValue(value){
        this.state.on = value;
        Communication.getInstance().turnOnOff(this.props.id, value);
        this.props.handler();
    }


    componentWillMount(){
        this.state.artifact = Communication.getInstance().getArtifact(this.props.id)
        this.state.on = this.state.artifact.on;
        this.state.variables = Communication.getInstance().getVariables(this.props.id);
    }

    render(){
        return (
        <View style={{margin:10,  backgroundColor: 'rgb(99, 99, 99)', borderRadius: 10}}>
            <View style={{ margin: 10, flexDirection: 'row'}}>
                <View style={{flex: 4}}><Text style={styles.whiteText}>{this.state.artifact.name}</Text></View>
                <View style={{flex: 1}}>
                    <Switch
                            value={this.state.on}
                            onTintColor='cyan'
                            tintColor='rgb(204, 204, 204)'
                            onValueChange={(value) => this.changeValue(value)}
                    />
                </View>
            </View>
            { this.state.on && this.state.variables.length > 0 &&
            <View style={{ borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10, backgroundColor: 'rgb(66, 66, 66)', padding: 10}}>
                {this.state.variables.map(item =>
                    <Variables handler={this.refresh} id={item.id} key={item.id}/>
                )}
            </View>
            }
        </View>);
    }
}