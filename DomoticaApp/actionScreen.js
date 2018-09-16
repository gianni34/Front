import React, { Component } from 'react';
import { Alert, View, Picker, Text, ScrollView, TouchableOpacity, TouchableHighlight, Dimensions, TextInput, Switch } from 'react-native';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { CustomPicker } from 'react-native-custom-picker';
//import NumberInput from 'rn-number-input';
import NumericInput from 'react-native-numeric-input';

import Communication from './communication';
import { FontLoader } from './fontLoader';
import styles from './styles';



export default class ActionScreen extends Component {
    constructor(props){
        super(props);

        this.state = { 
            id: 0,
            zone: 0,
            artifact: 0,
            variable: 0,
            value: 0,
            changed: false,
            edit: true,
            submittable: false,
        }
        
        this.zones = [];
        this.artifacts = [];
        this.variables = [];
        this.variableType = 'on';
        this.description = "";

        this.delete = this.delete.bind(this);
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Acción',
        headerRight:
        <View>
        { navigation.getParam('action', null) != null && 
        <TouchableOpacity style={{marginRight: 20}} onPress={() => {Alert.alert('¿Desea eliminar la acción?',
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

    

    async componentDidMount(){
        action = this.props.navigation.getParam('action', null);
        this.zones = await Communication.getInstance().getZones();
        if (action != null){
            this.state.id = this.props.navigation.state.params.action.id;
            this.state.zone = this.props.navigation.state.params.action.zone;
            this.artifacts = await Communication.getInstance().getArtifacts(this.state.zone);
            this.state.artifact = this.props.navigation.state.params.action.artifact;
            this.variables = this.artifacts.filter(function(obj){return obj.artifact == this.state.artifact});
            this.state.variable = this.props.navigation.state.params.action.variable;
            if (this.state.variable > 0) {
                this.ranges = this.variables.filter(function(obj){return obj.id==this.state.variable}).first().ranges;
                variable = this.state.variable;
                variable = this.variables.filter(function(obj){
                    return obj.id == variable;
                })[0];
                this.variableType = variable.type;
                if (this.variableType=='dimmerValue'){
                    for (let i = variable.min; i <= variable.max; i++){
                        this.ranges.push(i);
                    }
                }
            } 
            this.state.value = this.props.navigation.state.params.action.value;
            this.state.edit = false;
        }  
        this.props.navigation.setParams({ id: this.state.id, handleDelete: this.delete });    
        this.setState({changed: false});
    }

    async changeZone(id){
        if (id==0) {
            this.artifacts = [];
            this.state.artifact = 0;
            this.variables = [];
            this.state.variable = 0;
            this.state.value = 0;
        } else {
            this.artifacts = await Communication.getInstance().getArtifacts(id);
        }
        this.setState({zone: id, changed: true});
    }

    changeArtifact(id){
        if (id==0) {
            this.variables = [];
            this.state.variable = 0;
            this.state.value = 0;
        } else {
            artifact = this.artifacts.filter(function(obj){return obj.id == id})[0];
            this.variables = artifact.variables;
            console.log("----------------------------- CAMBIO ARTEFACTO --------------------------");
            console.log(artifact);
        }
        console.log('change artifact: '+id);
        this.setState({artifact: id, changed: true});
    }

    changeVariable(id){
        if (id == 0) {
            this.state.value = 0;
            this.variableType = 'on';
        } else {
            //this.ranges = this.variables.filter(function(obj){return obj.id==this.state.variable}).first().ranges;
            variable = this.variables.filter(function(obj){
                return obj.id == id;
            })[0];
            this.ranges = variable.ranges;
            console.log(variable);
            this.variableType = variable.type;
            if (this.variableType=='dimmerValue'){
                for (let i = variable.min; i <= variable.max; i++){
                    this.ranges.push(i);
                }
            }
        }
        console.log('change variable: '+id);
        this.setState({variable: id, changed: true});
    }


    save(){
        zone = this.zones.filter(function(obj){return obj.id==this.state.zone})[0];
        artifact = this.artifacts.filter(function(obj){return obj.id==this.state.artifact})[0];
        variable = this.state.variable == 0 ? this.state.variable : this.variables.filter(function(obj){return obj.id==this.state.variable})[0];
        action = { id: this.state.id, zone: zone, artifact: artifact, variable: variable, value: this.state.value }
        result = this.props.navigation.state.params.save(action);
        if (!result){
            this.setState({message: "Se produjo un error", errorMessage: result});
        } else {
            this.props.navigation.goBack();
        }
    }

    delete(){
        console.log("------ llega al delete en actionScreen ------");
        this.props.navigation.state.params.delete(this.props.navigation.state.params.id);
        this.props.navigation.goBack();
    }

    validData(){
        if (this.state.zone > 0 && this.state.artifact > 0 && this.state.changed){
            if (this.state.variable > 0 && this.state.value > 0){
                return true;
            } 
            else if(this.state.variable == 0){
                return true;
            }
            else{
                console.log('no valido todavia...');
                return false;
            }
        }
        else {
            return false;
        }
    }

    componentWillUpdate(){
        console.log("submittable: "+this.state.submittable+" - value: "+this.state.value);
        //this.state.submittable = this.validData();
        //this.state.zone > 0 && this.state.artifact > 0 && this.state.variable > 0 && this.state.value.length > 0; //&& this.state.changed;
    }
    
    render(){
        this.state.submittable = this.validData();
        const { edit, zone, artifact, variable, value, changed, submittable} = this.state;
        /*if(variable > 0)
           variable=variable.id;*/
        console.log(submittable);

        return(
            <FontLoader>
            <ScrollView style={{flex: 1, flexDirection: 'column', backgroundColor: 'rgb(204, 204, 204)', paddingTop:5 }}>
            <View style={{ flexDirection:'column', padding: 5, backgroundColor: 'rgb(127, 127, 127)', margin:5, borderRadius:10, borderWidth: 1, borderColor: 'transparent', overflow: 'hidden'}}>
                <View style={{justifyContent: 'center'}}>
                    <View style={{marginTop: 20}}>
                        <Text style={styles.whiteText}>Cuarto: </Text>
                    </View>
                    <View style={{borderBottomWidth: 1, alignSelf: 'center', borderBottomColor: 'white', margin: 10}}>
                        <Picker
                            selectedValue={zone.id}
                            style={{ color:'white', height: 50, width: 300, }}
                            placeholder="Seleccione el cuarto"
                            onValueChange={(itemValue, itemIndex) => this.changeZone(itemValue)}
                            enabled={edit}
                            prompt='Seleccione el cuarto'>
                            <Picker.Item disabled={true} label=' Seleccione' value='0' />
                            { this.zones.map((item) => 
                                <Picker.Item key={item.id} label={" " + item.name} value={item.id} />)}
                        </Picker>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={styles.whiteText}>Artefacto: </Text>
                    </View>
                    <View style={{borderBottomWidth: 1, alignSelf: 'center', borderBottomColor: 'white', margin: 10}}>
                        <Picker
                            selectedValue={artifact.id}
                            style={{ color:'white', height: 50, width: 300, }}
                            enabled={edit}
                            onValueChange={(itemValue, itemIndex) => this.changeArtifact(itemValue)}>
                            <Picker.Item disabled={true} label=' Seleccione' value='0' />
                            { this.artifacts.map((item) => 
                                <Picker.Item key={item.id} label={" " + item.name} value={item.id} />)}
                        </Picker>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={styles.whiteText}>Variable: </Text>
                    </View>
                    <View style={{borderBottomWidth: 1, alignSelf: 'center', borderBottomColor: 'white', margin: 10}}>
                        <Picker
                            selectedValue={variable}
                            style={{ color:'white', height: 50, width: 300, }}
                            enabled={edit}
                            onValueChange={(itemValue, itemIndex) => this.changeVariable(itemValue)}>
                            <Picker.Item label=' Prendido' value='0' />
                            { this.variables.map((item) => 
                                <Picker.Item key={item.id} label={" " + item.name} value={item.id} />)}
                        </Picker>
                    </View>
                    { artifact > 0 && this.variableType!='dimmerSwitch' &&
                        <View>
                            <View style={{marginTop: 20}}>
                                <Text style={styles.whiteText}>Valor: </Text>
                            </View>
                            <View style={{borderBottomWidth: 1, alignSelf: 'center', borderBottomColor: 'white', margin: 10}}>
                                
                                { artifact > 0 && variable == 0 && 
                                    <Picker
                                            selectedValue={value}
                                            style={{ color:'white', height: 50, width: 300, }}
                                            enabled={edit}
                                            onValueChange={(itemValue, itemIndex) => this.setState({value: itemValue, changed: true})}>
                                            <Picker.Item key={0} label=' Apagado' value='0' />
                                            <Picker.Item key={1} label=' Prendido' value='1' />
                                        </Picker>
                                }
                                { artifact > 0 && variable > 0 && (this.variableType == 'iconButtons' || this.variableType=='labelButtons') &&
                                    <Picker
                                        selectedValue={this.state.value}
                                        style={{ color:'white', height: 50, width: 300, }}
                                        enabled={edit}
                                        onValueChange={(itemValue, itemIndex) => this.setState({value: itemValue, changed: true})}>
                                        <Picker.Item disabled={true} label=' Seleccione' value='0' />
                                        { this.ranges.map((item) => 
                                            <Picker.Item key={item.id} label={' ' + item.name} value={item.id} />
                                        )}
                                        
                                    </Picker>
                                }
                                { artifact > 0 && variable > 0 && this.variableType=='dimmerValue' &&
                                    <Picker
                                        selectedValue={this.state.value}
                                        style={{ color:'white', height: 50, width: 300, }}
                                        enabled={edit}
                                        onValueChange={(itemValue, itemIndex) => this.setState({value: itemValue, changed: true})}>
                                        <Picker.Item label=' Seleccione' value='0' />
                                        { this.ranges.map((item) => 
                                            <Picker.Item key={item} label={' ' + item} value={item} />
                                        )}
                                        
                                    </Picker>
                                }
                            </View>
                        </View>
                    }
                    { artifact > 0 && variable > 0 && this.variableType=='dimmerSwitch' &&
                        <View>
                            <View style={{marginTop: 20, marginBottom: 10}}>
                                <Text style={styles.whiteText}>Porcentaje: </Text>
                            </View>
                            <View style={{ flexDirection:'column', alignSelf: 'center', margin: 10}}>    
                                <NumericInput 
                                    value={value} 
                                    onChange={value => this.setState({value: value, changed: true})} 
                                    totalWidth={300} 
                                    totalHeight={40} 
                                    iconSize={25}
                                    step={1}
                                    minValue={1}
                                    maxValue={100}
                                    valueType='integer'
                                    rounded 
                                    editable={edit}
                                    textColor='white' 
                                    iconStyle={{ color: 'rgb(127, 127, 127)' }} 
                                    rightButtonBackgroundColor='rgb(232, 229, 229)' 
                                    leftButtonBackgroundColor='rgb(232, 229, 229)'/>
                            </View>
                        </View>
                    }
                    <View style={{height: 30}}/>
                    
                </View>
            </View>
            { submittable && edit &&
                <TouchableHighlight onPress={() => this.save()} underlayColor='transparent'>
                    <View style={styles.buttonContainerSave}>
                        <Text style={styles.textSubmitLogin}>Guardar</Text>
                    </View>
                </TouchableHighlight>
            }
            </ScrollView>
            { !edit &&
                        <ActionButton buttonColor='rgb(22, 43, 59)' onPress={() => this.setState({edit: true})} 
                        renderIcon={() => <Icon name='edit' size={25} color='white'/>}/>
                    }
            </FontLoader>
        );
    }
}
