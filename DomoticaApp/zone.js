import React, { Component } from 'react'
import { Text, View, Image, TextInput, TouchableHighlight, Alert, AsyncStorage, ScrollView } from 'react-native';
import { Slider } from 'react-native-elements';

import styles from './styles';
import { LogoLogin, ErrorMessage } from './commons';
import Communication from './communication';
import Artifact from './artifact';
import { FontLoader } from './fontLoader';


export default class ZoneScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: 0,
            artifacts: [],
            zone: null,
            errorMessage: false,
            message: 'No se pudo conectar con el servidor, verifique que tiene conexión.',
        }

        this.refresh = this.refresh.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.name}`
    });

    setStateAsync(state) {
        return new Promise((resolve) => {
          this.setState(state, resolve)
        });
    }

    componentWillMount(){
        this.state.id = this.props.navigation.getParam('zoneId', 0);
    }

    async componentDidMount() {
        zone = await Communication.getInstance().getZone(this.state.id);
        artifacts = await Communication.getInstance().getArtifacts(this.state.id);
        this.setStateAsync({zone: zone, artifacts: artifacts});
    }

    refresh(){
        this.setState({id: this.state.id});
    }


    render(){
        const { errorMessage } = this.state;
        return(
            <FontLoader>
                <ScrollView style={{flex:1, backgroundColor: 'rgb(204, 204, 204)'}}>
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'transparent', paddingTop:5 }}>
                
                    { /* this.zone.state.length > 0 && (
                        <View style={{ flexDirection:'column', padding: 5, backgroundColor: 'rgb(127, 127, 127)', margin:5, borderRadius:10, borderWidth: 1, borderColor: 'transparent', overflow: 'hidden'}}>
                            {this.state.zone.state.map(item =>
                                <View style={{ height:70, marginTop:10, marginHorizontal:10 }} key={item.id}>
                                    <View><Icon name={item.icon} color='white' style={{height: '100%', width: '100%'}}/></View>
                                    <View><Text>{item.name}</Text></View>
                                    <View><Text>{item.value} {item.measure}</Text></View>
                                </View>)}
                        </View>)*/ }

                    { errorMessage && (
                        <View style={{marginTop:20}}>
                            <ErrorMessage message={this.state.message}/>
                        </View>)
                    }
                    { this.state.artifacts.map(item =>
                        <Artifact handler={this.refresh} key={item.id} object={item}/>)
                    }

                    </View>
                </ScrollView>
            </FontLoader>
        );
    }
}