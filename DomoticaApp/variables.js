import React, { Component } from 'react';
import { Dimensions, Text, View, Image, TextInput, TouchableHighlight, TouchableOpacity, Switch, Slider } from 'react-native';
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
            return (<Icon theme={{ iconFamily: 'MaterialIcons' }} name='autorenew' color={this.props.color} size={30}/>);
        
    }
}

class MyButton extends Component {
    constructor(props){
        super(props);

        this.state = {
            color: 'white',
        }
        this.changeIconValue = this.changeIconValue.bind(this);
    }

    componentWillMount(){
        console.log("render de variable: "+this.props.id);
        value = Communication.getInstance().getVariable(this.props.varId).value;
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
    }

    changeIconValue(){
        this.setState({color: 'cyan'});
        this.props.handler(this.props.id);
    }

    render(){
        const { color } = this.state;
        return (
            <TouchableOpacity style={{flex: 1}} onPress={this.changeIconValue}>
                <View key={this.props.id} style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <IconButton type={this.props.type} color={color} />
                    </View>
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <Text style={{fontSize: 17, color: color}}>{this.props.name}</Text>
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
        console.log("render de variable: "+this.props.id);
        value = Communication.getInstance().getVariable(this.props.varId).value;
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
    }

    changeIconValue(){
        this.setState({color: 'cyan'});
        this.props.handler(this.props.id);
    }

    render(){
        const { color } = this.state;
        return (
            <View key={this.props.id} style={{flex: 1, paddingHorizontal:30, paddingTop: 20}}>
                <TouchableOpacity onPress={this.changeIconValue}>
                    <View style={{padding:10, alignItems: 'center', borderRadius:10, borderColor: color, borderWidth: 2}}>
                        <Text style={{color: color}}>{this.props.name}</Text>
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
            
        }

        this.changeValue = this.changeValue.bind(this);
        this.minus = this.minus.bind(this);
        this.plus = this.plus.bind(this);
        this.less = this.less.bind(this);
        this.more = this.more.bind(this);

    }

    componentWillMount(){
        this.state.variable = Communication.getInstance().getVariable(this.props.id);
        this.state.value = this.state.variable.value;
        this.state.ranges = Communication.getInstance().getRanges(this.props.id);
    }

    changeValue(value){
        if (value >= this.state.variable.min && value <= this.state.variable.max){
            this.state.variable.value = value;
            Communication.getInstance().setValue(this.props.id, value);
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
                                onValueChange={value => this.changeValue(value)}
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
                    {this.state.variable.name.length > 0 && <View><Text>{this.state.variable.name}</Text></View>}
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    {
                        this.state.ranges.map(item =>
                            <MyButton key={item.id} id={item.id} type={item.type} name={item.name} handler={this.changeValue} varId={this.props.id}/>   
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
                        this.state.ranges.map(item =>
                            <MyLabel key={item.id} id={item.id} type={item.type} name={item.name} handler={this.changeValue} varId={this.props.id}/>
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
                            onValueChange={value => this.changeValue(value)}
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