import React, { Component } from 'react';
import { Dimensions, Alert, Text, View, Image, TextInput, TouchableHighlight, TouchableOpacity, Switch, Slider } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';
import Communication from './communication';
import { FontLoader } from './fontLoader';

class IconButton extends Component{
    constructor(props){
        super(props);

    }

    render(){
        if (this.props.type == 'heat')
            return (<Icon type='material-icons' name='wb-sunny' color={this.props.color} size={30}/>);
        if (this.props.type == 'cool')
            return (<Icon type='font-awesome' name='snowflake-o' color={this.props.color} size={30} />);
        if (this.props.type == 'dry')
            return (<Icon type='entypo' name='drop' color={this.props.color} size={30}/>);
        if (this.props.type == 'fan')
            return (<Icon type='material-community' name='fan' color={this.props.color} size={30} />);
        if (this.props.type == 'auto')
            return (<Icon type='material-icons' name='autorenew' color={this.props.color} size={30}/>);
        
    }
}

class MyButton extends Component {
    constructor(props){
        super(props);

        this.state = {
            color: 'white',
            value: 0,
        }
        this.changeIconValue = this.changeIconValue.bind(this);
    }

    componentWillMount(){
        this.state.value = this.props.value;//Communication.getInstance().getVariable(this.props.varId).value;
        if (this.state.value == this.props.object.value)
            this.state.color = 'cyan';
        else
            this.state.color = 'white';
    }

    componentDidUpdate(){
        this.state.value = this.props.value;
        if (this.state.value == this.props.object.value) {
            if (this.state.color != 'cyan')
                this.setState({color: 'cyan'});
        } else {
            if (this.state.color != 'white')
                this.setState({color: 'white'});
        }
    }

    changeIconValue(){
        this.setState({color: 'cyan', value: this.props.object.value});
        this.props.handler(this.props.object.value);
    }

    render(){
        const { color } = this.state;
        return (
            <TouchableOpacity style={{flex: 1}} onPress={this.changeIconValue}>
                <View key={this.props.object.id} style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <IconButton type={this.props.object.type} color={color} />
                    </View>
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <Text style={{fontSize: 15, color: color}}>{this.props.object.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

class MyLabel extends Component {
    constructor(props){
        super(props);

        this.state = {
            color: 'white',
        }
        this.changeIconValue = this.changeIconValue.bind(this);
    }

    componentWillMount(){
        this.state.value = this.props.value; //Communication.getInstance().getVariable(this.props.varId).value;
        if (this.state.value == this.props.object.value)
            this.state.color = 'cyan';
        else
            this.state.color = 'white';
    }

    /* componentWillMount(){
        value = this.props.value;
        if (value == this.props.id)
            this.state.color = 'cyan';
        else
            this.state.color = 'white';
    }

    componentWillUpdate(){
        value = Communication.getInstance().getVariable(this.props.varId).value;
        if (value == this.props.id)
            this.state.color = 'cyan';
        else
            this.state.color = 'white';
    }*/

    
    componentDidUpdate(){
        this.state.value = this.props.value;
        if (this.state.value == this.props.object.value) {
            if (this.state.color != 'cyan')
                this.setState({color: 'cyan'});
        } else {
            if (this.state.color != 'white')
                this.setState({color: 'white'});
        }
    }

    changeIconValue(){
        this.setState({color: 'cyan', value: this.props.object.value});
        this.props.handler(this.props.object.value);
    }

    render(){
        const { color } = this.state;
        return (
            <View key={this.props.object.id} style={{flex: 1, paddingHorizontal:30, paddingTop: 20}}>
                <TouchableOpacity onPress={this.changeIconValue}>
                    <View style={{padding:10, alignItems: 'center', borderRadius:10, borderColor: color, borderWidth: 2}}>
                        <Text style={{color: color}}>{this.props.object.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}


export default class Variables extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: null,
            ranges: [],
            variable: null, 
            oldValue: null,
            
        }

        this.changeValue = this.changeValue.bind(this);
        this.minus = this.minus.bind(this);
        this.plus = this.plus.bind(this);
        this.less = this.less.bind(this);
        this.more = this.more.bind(this);

    }

    componentWillMount(){
        this.state.variable = this.props.object;
        console.log(this.state.variable);
        this.state.value = parseInt(this.state.variable.value);
        this.state.oldValue = this.state.value;
        this.state.ranges = [];
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
          this.setState(state, resolve)
        });
    }

    async changeValue(value){
        if (value >= this.props.object.min && value <= this.props.object.max){
            const oldValue = this.state.oldValue;
            this.setState({value: value});
            result = await Communication.getInstance().changeVariable(this.props.object.id, value);
            if(!result.result){
                Alert.alert("Error", result.message);
                console.log("Valor viejo: " + oldValue + ' - ' + " valor nuevo: " + value);
                this.setStateAsync({value: oldValue});
            }
            else{
                this.state.oldValue = value;
            }
            this.props.handler();
        }
    }

    updateValue(value){
        if (value >= this.state.variable.min && value <= this.state.variable.max){
            this.state.variable.value = value;
            this.setState({value: value});
            this.props.handler();
        }
    }

    minus(){
        if (this.state.value > this.state.variable.min) {
            this.changeValue(Math.max(this.state.value - 1, this.state.variable.min));
        }
    }

    plus(){
        if (this.state.value < this.state.variable.max) {
            this.changeValue(Math.min(this.state.value + 1, this.state.variable.max));
        }
    }

    
    less(){
        if (this.state.value > this.state.variable.min) {
            this.changeValue(Math.max(this.state.value - this.state.variable.max * 0.1, this.state.variable.min));
        }
    }

    more(){
        if (this.state.value < this.state.variable.max) {
            this.changeValue(Math.min(this.state.value + this.state.variable.max * 0.1, this.state.variable.max));
        }
    }

    render(){
        const widthAux = Dimensions.get('window').width -40;
        const widthSlider = widthAux - 70;
        const { variable, value } = this.state;
        if (variable.type == 'dimmerSwitch'){
            return (
                <View style={{ flexDirection: 'row', height: 40, width: '100%' }}>
                    {/*this.state.variable.name.length > 0 && <View><Text>{this.state.variable.name}</Text></View>*/}
                            <Icon type='entypo' name='light-down' color='white' size={30}  onPress={this.less}/>
                            <Slider
                                minimumTrackTintColor='cyan'
                                maximumTrackTintColor='white'
                                thumbTintColor='cyan'
                                trackStyle={{
                                height: 30,
                                borderRadius: 20,
                                backgroundColor: 'cyan',
                                }}
                                style={{
                                'height': 40,
                                'width': widthSlider,
                                }}
                                value={this.state.value}
                                minimumValue={this.state.variable.min}
                                maximumValue={this.state.variable.max}
                                onValueChange={value => this.updateValue(value)}
                                onSlidingComplete={value => this.changeValue(value)}
                            />
                            <Icon type='entypo' name='light-up' color='white' size={30}  onPress={this.more}/>
                            
                   
                </View>
                );
        } else if (variable.type == 'switch') {
            return (
            <View style={{ flexDirection: 'row', height: 40, width: '100%' }}>
                <View style={{ flex: 4, justifyContent: 'center'}}>
                    <Text style={styles.variableName}>{this.state.variable.name}</Text>
                </View>
                <View style={{ flex: 1, width: 40, alignItems: 'center', justifyContent: 'center'}}>
                    <Switch
                        value={this.state.value}
                        onTintColor='cyan'
                        tintColor='rgb(204, 204, 204)'
                        onValueChange={(value) => this.setState({value: value})}
                        /> 
                </View>
            </View>);
        } else if (variable.type == 'iconButtons'){
            return (
                <View style={{ marginVertical: 10, flexDirection: 'column' }}>
                    {/*this.state.variable.name.length > 0 && <View><Text></Text></View>*/}
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    {
                        variable.ranges.map(item =>
                            <MyButton key={item.id} object={item} value={this.state.value} handler={this.changeValue} varId={this.props.id}/>   
                        )
                    }
                    </View>
                </View>
            );
        } else if (variable.type == 'labelButtons'){
            return (
                <View style={{ marginVertical: 10, flexDirection: 'column' }}>
                    {this.state.variable.name.length > 0 && <View styles={{ margin: 10 }}><Text style={styles.variableName}>{this.state.variable.name}:</Text></View>}
                    <View style={{flexDirection: 'row', marginTop: 20, paddingVertical: 10}}>
                    {
                        variable.ranges.map(item =>
                            <MyLabel key={item.id} object={item} value={this.state.value} handler={this.changeValue} varId={this.props.id}/>
                        )
                    }
                    </View>
                </View>
            );
        } else if (variable.type == 'dimmerValue'){
            return (
                <View style={{ marginBottom: 10, flexDirection: 'column' }}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}><Text style={styles.temperatureValue}>{this.state.value.toFixed(0)} °C</Text></View>
                    <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', }}>
                        <Icon type='entypo' name='minus' color='white' size={30}  onPress={this.minus}/>
                        
                        <Slider
                            minimumTrackTintColor='cyan'
                            maximumTrackTintColor='gray'
                            thumbTintColor='cyan'
                            trackStyle={{
                            height: 20,
                            borderRadius: 20,
                            backgroundColor: 'cyan',
                            }}
                            style={{
                            'height': 40,
                            'width': widthSlider,
                            }}
                            value={this.state.value}
                            minimumValue={this.state.variable.min}
                            maximumValue={this.state.variable.max}
                            onValueChange={value => this.updateValue(value)}
                            onSlidingComplete={value => this.changeValue(value)}
                        />
                        <Icon type='entypo' name='plus' color='white' size={30}  onPress={this.plus}/>
                                                
                    </View>
                    <View style={{ margin:10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.variableName}>{this.state.variable.name}</Text>
                    </View>
                </View>
            );
        }
        else {
            return(
                <View />
            );
        }
    }
}