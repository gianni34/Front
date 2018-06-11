import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, TextInput, Switch } from 'react-native';
import styles from './styles.js';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ToggleSwitch from 'toggle-switch-react-native';

const NAVBAR_HEIGHT = 0;
const DAY_WIDTH = (Dimensions.get("window").width - 30)/7 - 15;
const BLUE = "rgb(22, 43, 59)";
const GRAY_LIGHT = 'rgb(204, 204, 204)';
const GRAY_DARK = 'rgb(127, 127, 127)';
const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

class ErrorMessage extends Component {
    constructor(props){
      super(props);
    }
  
    render(){
      return (
        <View style={styles.errorContainer} >
          <Text style={styles.errorText}>{this.props.message}</Text>
        </View>);
    }
}


function getParsedTime(date){
    date = String(date).split(' ');
    var hours = String(date[4]).split(':');
    return hours[0] + ':' + hours[1];
}

export default class SceneScreen extends Component{

    constructor(props){
        super(props);
    
        this.state = {
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
            isDateTimePickerVisibleS: false,
            isDateTimePickerVisibleE: false,
            timeStart : getParsedTime(new Date()),
            //endTimeCondition:  false;
            timeEnd : getParsedTime(new Date()),
        }
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

    _showDateTimePickerS = () => this.setState({ isDateTimePickerVisibleS: true });
 
    _hideDateTimePickerS = () => this.setState({ isDateTimePickerVisibleS: false });
    
    _handleDatePickedS = (date) => {
        time = getParsedTime(date);
        console.log('A date has been picked: ', time);
        this.setState({timeStart: time});
        this._hideDateTimePicker();
    };

    _showDateTimePickerE = () => this.setState({ isDateTimePickerVisibleE: true });
 
    _hideDateTimePickerE = () => this.setState({ isDateTimePickerVisibleE: false });
    
    _handleDatePickedE = (date) => {
        time = getParsedTime(date);
        console.log('A date has been picked: ', time);
        this.setState({timeEnd: time});
        this._hideDateTimePickerE();
    };

    updateSize = (height) => {
        this.setState({ descrHeight: (height>40?height:40) });
    }

    _validateDays(){
        result = this.stateDays.filter(function(obj){
            return obj.pressed;
        }).map(function({id, letter, pressed}){
            return {id, letter, pressed};
        });
        return result.length > 0;
    }

    _validateEndTime(){
        return true;
    }

    _validateData(){
        return ((this.state.timeCondition  && this._validateDays() && this_.validateEndTime()) 
                || this.state.onDemand) && this.state.actions.length > 0 && this.state.name.length > 0;
    }

    handleSubmit(){
        if (Communication.getInstance().saveScene()){
            this.props.navigation.goBack();
        } else {
            this.setState({errorMessage: true});
        }
    }

    render(){
        timeAux = this.state.time;
        time = timeAux.toString();
        const { onDemand, onDemandText, valueCondition, valueConditionText, timeCondition, timeConditionText } = this.state;
        errorMessage = this.state.errorMessage;
        submittable = this._validateData();
        return(
            <ScrollView style={{flex: 1, flexDirection: 'column', backgroundColor: 'rgb(204, 204, 204)', paddingTop:5 }}>
                <View style={{ flex:1, flexDirection:'column', padding: 5, backgroundColor: 'rgb(127, 127, 127)', margin:5, borderRadius:10, borderWidth: 1, borderColor: 'transparent', overflow: 'hidden'}}>
                
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
                            onValueChange={(timeCondition) => this.setState({timeCondition: timeCondition})}
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
                                    <TouchableOpacity onPress={ () => this.changeValue(item, this.state.days)}
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
                                <TouchableOpacity style={{ marginLeft: 20, height: '100%', width: 200}} onPress={this._showDateTimePickerS}>
                                    <Text style={{color: 'white', fontSize: 16,}}>Hora inicio:   {timeStart}  hs</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <DateTimePicker
                                mode = 'time'
                                isVisible={this.state.isDateTimePickerVisibleS}
                                onConfirm={this._handleDatePickedS}
                                onCancel={this._hideDateTimePickerS}/>
                        </View>
                        {/*<View style={{ flexDirection: 'row', justifyContent: 'center', height: 40, marginRight: 20 }}>
                            <View style={{flex:4}}>
                                <Text style={styles.whiteText}>{this.state.endTimeConditionText}</Text>
                            </View>
                            <View style={{flex:1}}>
                            <Switch
                                value={this.state.timeCondition}
                                onTintColor='cyan'
                                tintColor='rgb(204, 204, 204)'
                                onValueChange={(timeCondition) => this.setState({timeCondition: timeCondition})}
                            />                       
                            </View>
                        </View>
                        <View style={{width: '100%' }}>
                            <View style={{marginLeft: 20, marginTop: 20, marginRight: 20, width: '100%', height: 30}}>
                                <TouchableOpacity style={{ marginLeft: 20, height: '100%', width: 200}} onPress={this._showDateTimePickerE}>
                                    <Text style={{color: 'white', fontSize: 16,}}>Hora fin:   {timeEnd}  hs</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <DateTimePicker
                                mode = 'time'
                                isVisible={this.state.isDateTimePickerVisibleE}
                                onConfirm={this._handleDatePickedE}
                                onCancel={this._hideDateTimePickerE}/>
                        </View>*/}
                    </View>
                    }

                    {/*<View style={{ flexDirection: 'row', justifyContent: 'center', height: 40, marginRight: 20 }}>
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
                */}
                    
                </View>
                { submittable && (
                    <TouchableHighlight onPress={this.handleSubmit} underlayColor='transparent'>
                        <View style={styles.buttonContainerSave}>
                            <Text style={styles.textSubmitLogin}>Guardar</Text>
                        </View>
                    </TouchableHighlight>
                )} 
                
                    <TouchableHighlight onPress={() => this.navigation.goBack()} underlayColor='transparent'>
                        <View style={styles.buttonContainerCancel}>
                            <Text style={styles.textSubmitLogin}>Cancelar</Text>
                        </View>
                    </TouchableHighlight>
                 
            </ScrollView>
        );
    }
}

