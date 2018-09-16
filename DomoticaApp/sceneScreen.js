import React, { Component } from 'react';
import { Alert, View, Text, ScrollView, TouchableOpacity, TouchableHighlight, Dimensions, TextInput, Switch } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ToggleSwitch from 'toggle-switch-react-native';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

import { ErrorMessage } from './commons';
import Communication from './communication';
import { FontLoader } from './fontLoader';
import styles from './styles.js';

const NAVBAR_HEIGHT = 0;
const DAY_WIDTH = (Dimensions.get("window").width - 30)/7 - 15;
const BLUE = "rgb(22, 43, 59)";
const GRAY_LIGHT = 'rgb(204, 204, 204)';
const GRAY_DARK = 'rgb(127, 127, 127)';
const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

function getParsedTime(date){
    date = String(date).split(' ');
    var hours = String(date[4]).split(':');
    return hours[0] + ':' + hours[1];

}

function capitalizeText(text){
    return text.slice(0,1).toUpperCase() + text.slice(1, text.length).toLowerCase();
}

function getValueLabel(value, variable, type=""){
    if (variable == 0){
        return value==0?'Apagado':'Prendido';
    }
    else if (type == 'iconButtons' || type == 'labelButtons'){
        ranges = variable.ranges; //.getRanges(variableId);
        res = ranges.filter(function(obj){
            return obj.value == value;
        })[0];
        value = capitalizeText(res.name);
    }
    return value;
}

export default class SceneScreen extends Component{
    constructor(props){
        super(props);
    
        this.state = {
            id: 0,
            days: [
                {id: 0, letter: 'L', pressed: false, iconColor: 'transparent', textColor: 'white'},
                {id: 1, letter: 'M', pressed: false, iconColor: 'transparent', textColor: 'white'},
                {id: 2, letter: 'M', pressed: false, iconColor: 'transparent', textColor: 'white'},
                {id: 3, letter: 'J', pressed: false, iconColor: 'transparent', textColor: 'white'},
                {id: 4, letter: 'V', pressed: false, iconColor: 'transparent', textColor: 'white'},
                {id: 5, letter: 'S', pressed: false, iconColor: 'transparent', textColor: 'white'},
                {id: 6, letter: 'D', pressed: false, iconColor: 'transparent', textColor: 'white'}],
            errorMessage: false,
            message : 'mensaje de errooooooor!!',
            name: '',
            description: '',
            descrHwight: 40,
            actions: [],
            onDemand: true,
            onDemandText: 'Ejecución a demanda', 
            onDemandDescription: 'Esta escena aparecerá en el inicio, permitiendo a los usuarios ejecutarla en cualquier momento',
            timeCondition: false,
            timeConditionText: 'Agregar condición temporal',
            timeConditionDescription: 'Esta escena se ejecutará en los dias y hora seleccionada de forma automática',
            /*valueCondition: false,
            valueConditionText: 'Agregar condición de valor',
            valueConditionDescription: 'Esta escena se ejecutará cuando se cumpla la siguiente condición de valor sobre un artefacto de forma automática',*/
            isDateTimePickerVisible: false,
            time : getParsedTime(new Date()),
            edit: true,
            play: false,
        }

        this.changeValue = this.changeValue.bind(this);
        this._validateDays = this._validateDays.bind(this);
        this.createAction = this.createAction.bind(this);
        this.updateAction = this.updateAction.bind(this);
        this.deleteAction = this.deleteAction.bind(this);
        this.goToEditAction = this.goToEditAction.bind(this);
        this.delete = this.delete.bind(this);
        
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Escena',
        headerRight:
        <View>
        { navigation.getParam('id', 0) != 0 && !navigation.getParam('play', false) &&
        <TouchableOpacity style={{marginRight: 20}} onPress={() => {Alert.alert('¿Desea eliminar la escena?',
            'Confirme',
            [
                {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Aceptar', onPress: () => {navigation.state.params.handleDelete()}},
            ],
            { cancelable: false })}}>
        <Icon name='delete' color='white' size={25}/>
        </TouchableOpacity>}
        </View>
    });

    async componentWillMount(){
        this.state.id = this.props.navigation.getParam('id', 0);
        this.state.play = this.props.navigation.getParam('play', false);
        if (this.state.id > 0){
            scene = await Communication.getInstance().getScene(this.state.id);
            this.state.name = scene.name;
            this.state.description = scene.description;
            this.state.onDemand = scene.onDemand;
            this.state.timeCondition = scene.timeCondition;
            this.state.time = scene.time;
            this.state.actions = scene.actions;
            console.log("----------------------------------------------------------------------------------------------");
            console.log(scene.actions);
            console.log("----------------------------------------------------------------------------------------------");
            days = scene.days.split(',')
            this.state.days = this.state.days.map(item => { 
                if (days.filter(function(obj){ return obj == item.id; }).length > 0){ 
                    return { id: item.id, letter: item.letter, pressed: true, iconColor: 'white', textColor: GRAY_DARK };
                } else { 
                    return item 
                } 
            });
            this.state.edit = this.props.navigation.getParam('edit', false);
        }
        this.props.navigation.setParams({ id: this.state.id, handleDelete: this.delete });    

    }

    changeValue(x, days){
        ic = 'white';
        tc = GRAY_DARK;
        if(x.pressed){
            ic = 'transparent';
            tc = 'white';
        }
        aux = {id: x.id, letter: x.letter, pressed: !x.pressed, iconColor: ic, textColor: tc};
        days[x.id] = aux;
        this.setState({days: days});
    }

    changeTimeCondition(value){
        if (value){
            this._showDateTimePicker();
        }
        this.setState({timeCondition: value});
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
    _handleDatePicked = (date) => {
        time = getParsedTime(date);
        this.setState({time: time});
        this._hideDateTimePicker();
    };

    updateSize = (height) => {
        this.setState({ descrHeight: (height>40?height:40) });
    }

    _validateDays(){
        result = this.state.days.filter(function(obj){
            return obj.pressed;
        }).map(function({id, letter}){
            return {id, letter};
        });
        return result.length;
    }

    _validateData(){
        return ((this.state.timeCondition  && this._validateDays()) 
                || this.state.onDemand) && this.state.actions.length > 0 && this.state.name.length > 0;
    }

    delete(){
        this.props.navigation.state.params.delete(this.props.navigation.state.params.id);
        this.props.navigation.goBack();
    }

    createAction(action){
        console.log(action);
        console.log('---------------------------------------')
        try {
            id = 1;
            if (this.state.actions.length > 0)
                id = this.state.actions[this.state.actions.length - 1].id + 1;
            action.id = id;
            this.state.actions.push(action);
            console.log("-------------- se agrego! -------------")
            this.setState({actions: this.state.actions});
            
            return true;
        } catch (e){
            console.log(e);
        }
    }

    updateAction(action){
        try {
            actions = this.state.actions.map(item => {
                    if(item.id === action.id){
                      return action
                    }
                    return item
            });
            this.setState({actions: actions});
            return true;
        } catch (e){
            return false;
        }
    }

    deleteAction(id){
        try {
            actions = this.state.actions.filter(function(obj){
                return obj.id != id;
            }).map(function({id, zoneId, artifactId, variableId, value}){
                return {id, zoneId, artifactId, variableId, value};
            });
            this.setState({actions: actions});
        } catch (e){
            return false;
        }
    }

    async handleSubmit(){
        days = this.state.days.filter(function(obj){
            return obj.pressed
        }).map(item => {
            return item.id
        });
        var dayString;
        for(d in days)
            dayString += dayString.length==0?d:','+d;
        scene = { id: this.state.id, name: this.state.name, description: this.state.description, actions: this.state.actions, onDemand: this.state.onDemand, timeCondition: this.state.timeCondition, days: dayString, time: this.state.time };
        response = await Communication.getInstance().saveScene(scene);
        if (response.result) {
            this.props.navigation.goBack();
        } else {
            this.setState({errorMessage: true, message: response.message });
        }
    }

    goToEditAction(action){
        this.props.navigation.push('action', {action: action, save: this.updateAction, 
            delete: this.deleteAction});
    }

    render(){
        timeAux = this.state.time;
        time = timeAux;
        this.state.submittable = this._validateData();
        const { edit, onDemand, onDemandText, play, submittable, valueCondition, valueConditionText, timeCondition, timeConditionText } = this.state;
        errorMessage = this.state.errorMessage;
        console.log(this.state.actions);
        return(
            <FontLoader>
            <ScrollView style={{flex: 1, flexDirection: 'column', backgroundColor: 'rgb(204, 204, 204)' }}>
                <View style={{ flex:1, flexDirection:'column', padding: 5, backgroundColor: 'rgb(127, 127, 127)', margin:10, borderRadius:10, borderWidth: 1, borderColor: 'transparent', overflow: 'hidden'}}>
                
                    { errorMessage && (
                        <View style={{marginTop:20}}>
                            <ErrorMessage message={this.state.message}/>
                        </View>)
                    }


                    <View style={{width: '100%', marginTop: 20, height: 60}}>
                        <View style={{width: '100%', height: 30, }}>
                            <Text style={styles.whiteText}>Nombre:</Text>
                        </View>
                        <View style={{width: '100%', height: '100%',}}>
                            <View style={styles.inputContainerScene}>
                                <TextInput
                                    style={styles.inputLogin}
                                    value={this.state.name} 
                                    placeholder="nombre de escena"
                                    placeholderTextColor="rgb(202, 199, 199)"
                                    underlineColorAndroid="transparent"
                                    onChangeText={(name) => this.setState({name: name})}
                                    editable={edit}
                                />
                            </View>
                        </View>
                    </View> 
                    
                    <View style={{width: '100%', marginVertical: 20, height: this.state.descrHeight+30, }}>
                        <View style={{width: '100%', height: 30, }}>
                            <Text style={styles.whiteText}>Descripción:</Text>
                        </View>
                        <View style={{width: '100%', height: '100%',}}>
                            <View style={{flexDirection: 'row',
                                    alignItems: 'center',
                                    borderBottomWidth: .5,
                                    borderBottomColor: 'rgb(252, 249, 249)',
                                    height: this.state.descrHeight,
                                    marginLeft:20,
                                    marginRight:20,}}>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={1}
                                    style={styles.inputLogin}
                                    value={this.state.description} 
                                    placeholder="descripción"
                                    placeholderTextColor="rgb(202, 199, 199)"
                                    underlineColorAndroid="transparent"
                                    onChangeText={(description) => this.setState({description: description})}
                                    onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                                    editable={edit}
                                />
                            </View>
                        </View>
                    </View> 
                    
                   
                    <View style={{ flexDirection: 'row', justifyContent: 'center', height: 40, marginRight: 20 }}>
                        <View style={{flex:4/*height:'100%', width: '80%'*/}}>
                            <Text style={styles.whiteText}>{this.state.onDemandText}</Text>
                        </View>
                        <View style={{flex:1/*height:'100%', width: '20%'*/}}>
                        <Switch
                            value={this.state.onDemand}
                            onTintColor='cyan'
                            tintColor='rgb(204, 204, 204)'
                            onValueChange={(onDemand) => this.setState({onDemand: onDemand})}
                            disabled={!edit}
                        />                       
                        </View>
                    </View>
                    
                    { onDemand && <View style={{width: '100%', marginBottom: 20 }}>
                        <View style={{width: '100%', }}>
                            <Text style={{ marginLeft: 20, marginTop: 5, fontSize: 14, color: 'white' }}>{this.state.onDemandDescription}</Text>
                        </View>
                        
                    </View>
                    }

                    <View style={{ flexDirection: 'row', justifyContent: 'center', height: 40, marginRight: 20 }}>
                        <View style={{flex:4/*height:'100%', width: '80%'*/}}>
                            <Text style={styles.whiteText}>{this.state.timeConditionText}</Text>
                        </View>
                        <View style={{flex:1/*height:'100%', width: '20%'*/}}>
                        <Switch
                            value={this.state.timeCondition}
                            onTintColor='cyan'
                            tintColor='rgb(204, 204, 204)'
                            onValueChange={(timeCondition) => this.changeTimeCondition(timeCondition)}
                            disabled={!edit}
                        />                       
                        </View>
                    </View>

                    { timeCondition && <View>
                        <View style={{width: '100%', }}>
                            <Text style={{ marginLeft: 20, marginTop: 5, fontSize: 14, color: 'white' }}>{this.state.timeConditionDescription}</Text>
                        </View>
                        <View style={styles.dayPickerContainer}>
                        {
                            this.state.days.map((item) =>
                            <View key = {item.id} style = {{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                                    <TouchableOpacity disabled={!edit} onPress={ () => this.changeValue(item, this.state.days)}
                                        style={{
                                                borderWidth:1,
                                                borderColor: GRAY_DARK,
                                                alignItems:'center',
                                                justifyContent:'center',
                                                width: DAY_WIDTH,
                                                height: DAY_WIDTH,
                                                backgroundColor: item.iconColor,
                                                borderRadius: DAY_WIDTH - 10,
                                        }}>
                                        <Text style={{color: item.textColor, fontSize: 16,}}>{item.letter}</Text>
                                    </TouchableOpacity>
                            </View>)
                        }
                        </View>  
                        
                        <View style={{width: '100%' }}>
                            <View style={{marginLeft: 20, marginTop: 20, marginRight: 20, width: '100%', height: 30}}>
                                <TouchableOpacity disabled={!edit} style={{ marginLeft: 20, height: '100%', width: 200}} onPress={this._showDateTimePicker}>
                                    <Text style={{color: 'white', fontSize: 16,}}>Hora inicio:   {time}  hs</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <DateTimePicker
                                mode = 'time'
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this._handleDatePicked}
                                onCancel={this._hideDateTimePicker}/>
                        </View>
                        
                    </View>
                    }

                    <View style={{ marginTop: 10, marginBottom: 20 }}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{ flex: 4 }}>
                                <Text style={styles.whiteText}>Acciones: </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <TouchableOpacity disabled={!edit} onPress={() => this.props.navigation.push('action', {action: null, save: this.createAction})}>
                                    <Icon name='add' color='white' size={30}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexDirection: 'column', marginHorizontal: 20 }}>
                            <TableHeader/>
                            { this.state.actions.map(item => 
                                <Action key={item.id} edit={edit} press={this.goToEditAction} action={item} />
                            )}
                            { this.state.actions.length == 0 &&
                                <View style={{ backgroundColor: 'white', height: 60, paddingVertical:10, alignItems:'center', justifyContent: 'center' }}>
                                    <Text style={{color: 'rgb(80,80,80)', fontSize: 15}}>No hay acciones</Text>
                                    <Text style={{color: 'rgb(80,80,80)', fontSize: 14}}>Para agregar presione el botón + </Text>
                                </View>
                            }

                            
                        </View>
                    </View>
                    
                </View>
                { submittable && edit && !play && (
                    <TouchableHighlight onPress={() => this.handleSubmit()} underlayColor='transparent'>
                        <View style={styles.buttonContainerSave}>
                            <Text style={styles.textSubmitLogin}>Guardar</Text>
                        </View>
                    </TouchableHighlight>
                )} 
                 { play && (
                    <TouchableHighlight onPress={() => this.props.navigation.goBack()} underlayColor='transparent'>
                        <View style={styles.buttonContainerSave}>
                            <Text style={styles.textSubmitLogin}>Ejecutar</Text>
                        </View>
                    </TouchableHighlight>
                )} 
                 
                </ScrollView>
                { !edit && !play &&
                        <ActionButton buttonColor='rgb(22, 43, 59)' onPress={() => this.setState({edit: true})} 
                        renderIcon={() => <Icon name='edit' size={25} color='white'/>}/>
                    }
            </FontLoader>
        );
    }
}

class TableHeader extends Component {
    render(){
        return(
        <View style={{ marginTop: 20, paddingVertical: 20, flexDirection: 'row', backgroundColor: 'rgb(204, 204, 204)'}}>
            <View key={1} style={{flex: 3}}><Text style={{marginLeft: 10, fontSize: 16, color: 'rgb(80, 80, 80)'}}>Artefacto</Text></View>
            <View key={2} style={{flex: 3}}><Text style={{marginLeft: 10, fontSize: 16, color: 'rgb(80, 80, 80)'}}>Variable</Text></View>
            <View key={3} style={{flex: 2}}><Text style={{marginLeft: 10, fontSize: 16, color: 'rgb(80, 80, 80)'}}>Valor</Text></View>
        </View>
        );
    }
}

class Action extends Component{
    constructor(props){
        super(props);

        this.state = {
            zone: '',
            artifact: '',
            variable: '',
            type: '',
            refresh: false,
            edit: true,
        }

    }

    componentWillReceiveProps(props) {
        const { action, edit } = this.props;
        if (edit != props.edit || props.action.zone !== action.zone || props.action.artifac !== action.artifact
            || props.action.variable !== action.variable || props.action.value !== action.value) {
                this.state.zone = action.zone.name;
                this.state.artifact = action.artifact.name;                
                if(props.action.variable > 0){
                    variable = action.variable;
                    this.state.variable = variable.name;
                    this.state.type = variable.type;
                }
                else {
                    this.state.variable = "Prendido";
                    this.state.type = '';
                }
            //this.setState({refresh: true});
        }
    }

    updateData(){
        this.state.zone = this.props.action.zone.name;
        this.state.artifact = this.props.action.artifact.name;
        if(this.props.action.variable > 0){
            variable = this.props.action.variable;
            this.state.variable = variable.name;
            this.state.type = variable.type;
        }
        else {
            this.state.variable = "Prendido";
            this.state.type = '';
        }
        this.setState({refresh: true});
    }

    componentDidMount(){
        this.state.edit = this.props.edit;
        this.updateData();
    }

    render(){
        value = this.props.action.value;
        return(
            <TouchableOpacity disabled={!this.state.edit} onPress={() => this.props.press(this.props.action)} >
                <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 40, paddingVertical:10, justifyContent: 'center' }}>
                    <View key={1} style={{flex:3}}><Text style={{marginLeft: 10, color: 'rgb(80,80,80)', fontSize: 15}}>{this.state.artifact} ({this.state.zone})</Text></View>
                    <View key={2} style={{flex:3}}><Text style={{marginLeft: 10, color: 'rgb(80,80,80)', fontSize: 15}}>{this.state.variable}</Text></View>
                    <View key={3} style={{flex:2}}><Text style={{marginLeft: 10, color: 'rgb(80,80,80)', fontSize: 15}}>{getValueLabel(value, this.props.action.variable, this.state.type)}</Text></View>
                </View>
            </TouchableOpacity>
        );
    }
}


/*

    para agregar condicion de valor.. :
                    <View style={{ flexDirection: 'row', justifyContent: 'center', height: 40, marginRight: 20 }}>
                        <View style={{flex:4}}>
                            <Text style={styles.whiteText}>{this.state.valueConditionText}</Text>
                        </View>
                        <View style={{flex:1}}>
                        <Switch
                            value={this.state.valueCondition}
                            onTintColor='cyan'
                            tintColor='rgb(204, 204, 204)'
                            onValueChange={(valueCondition) => this.setState({valueCondition: valueCondition})}
                        />                       
                        </View>
                    </View>

                    { valueCondition && <View style={{width: '100%', marginBottom: 20 }}>
                        <View style={{ width: '100%'}}>
                            <Text style={{ marginLeft: 20, marginTop: 5, fontSize: 14, color: 'white' }}>{this.state.valueConditionDescription}</Text>
                        </View>

                        <!-- zona, artefacto o estado, si no tiene variables: Prendido y valores :on-off, 
                             si tiene variables: Prendido + variables segun type de variable.. -->
                        
                    </View>
                */