import React, {Component} from "react";
import { Text, View, Image, Alert, TouchableHighlight, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Communication from './communication';
import styles  from './styles';
import ActionButton from 'react-native-action-button';
import { withNavigation } from 'react-navigation';
import Navigator from './App';
import Menu, {
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';

class MoreMenu extends Component {
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
                    <MenuOption value={1} style={{height: 40, justifyContent: 'center'}} onSelect={() => this.props.navigation.navigate('newScene')}>
                        <Text style={{color:'rgb(127, 127, 127)', fontSize: 16, fontWeight: 'bold' }}>  Editar</Text>
                    </MenuOption>
                    <MenuOption value={2} style={{height: 40, justifyContent: 'center'}} onSelect={() => Alert.alert('¿Desea eliminar la escena?',
                                                                                                                        'Confirme',
                                                                                                                        [
                                                                                                                            {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                                                                                                            {text: 'Aceptar', onPress: () => Communication.getInstance().deleteUser(this.props.id)},
                                                                                                                        ],
                                                                                                                        { cancelable: false })}>
                        <Text style={{color:'rgb(127, 127, 127)', fontSize: 16, fontWeight: 'bold' }}>  Eliminar</Text>
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
                   <MoreMenu id={this.props.id} navigation={this.props.navigation}/>
                </View>
            </View>
        );
    }
}

export default class Scenes extends Component {
    static navigationOptions = {
        header: { visible: false },
    };
    
    constructor(props){
        super(props);
        
        this.state = {
            users: []
        }
    }
    
    customBackHandler = (instance) => {
        if(instance.isMenuOpen()){
            instance.close();
        }
    }

    render(){
        this.state.scenes = Communication.getInstance().getScenes();
        return(
            <MenuProvider backHandler={this.customBackHandler}>
                <View style={{height: 60, backgroundColor: 'rgb(22, 43, 59)', 
                            justifyContent: 'center', borderColor: 'black',
                            borderBottomWidth: 1, shadowColor: 'black',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8, shadowRadius: 3,
                            elevation: 1,}}>
                    <Text style={[styles.whiteText, {paddingLeft: 50}]}>Escenas</Text>
                </View>
                <ScrollView style={{flex: 1, backgroundColor: 'rgb(204, 204, 204)', paddingTop:10 }}>
                {this.state.scenes.map(item =>
                        <View style={{ height:70, marginTop:10, marginHorizontal:10 }} key={item.id}>
                             <Block name={item.name} key={item.id} id={item.id} navigation={this.props.navigation}/>
                        </View>)}
                <View style={{height:100, width:'100%'}}/>
                </ScrollView>
                <ActionButton buttonColor='rgb(22, 43, 59)' onPress={() => this.props.navigation.push('newScene')} 
                                        renderIcon={() => <Icon theme={{ iconFamily: 'FontAwesome' }} name='plus' size={40} color='black'/>}/>
            </MenuProvider>
        );
    }
}