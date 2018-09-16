import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableHighlight, Dimensions, ScrollView, ImageBackground, Animated, Platform } from 'react-native';
import { Body, Header, List, ListItem as Item, ScrollableTab, Tab, Tabs, Title, Button, StatusBar } from "native-base";
import { Icon } from 'react-native-elements';
import styles  from './styles';
import Communication from './communication';
import { MenuProvider } from 'react-native-popup-menu';
import { FontLoader } from './fontLoader';
import { white } from 'ansi-colors';

const NAVBAR_HEIGHT = 0;
const {width: SCREEN_WIDTH} = Dimensions.get("window");
const COLOR = "rgb(22, 43, 59)";
const TAB_PROPS = {
  tabStyle: {width: SCREEN_WIDTH / 2, backgroundColor: COLOR},
  activeTabStyle: {width: SCREEN_WIDTH / 2, backgroundColor: COLOR},
  textStyle: {color: "white"},
  activeTextStyle: {color: "white"}
};
/*
const MainTabNavigator = TabNavigator({
    Zones: { screen: Zones },
    Scenes: { screen: Scenes },
    Contacts: {screen: ContactsScreen },
    More: { screen: MoreScreen }
  }, {
    tabBarComponent: TXTabBar,
    tabBarPosition: 'top',
  });*/

class Zone extends Component {
    constructor(props){
      super(props);
      
      this.goToZone = this.goToZone.bind(this);

      this.state = {
        
      }
    }

    goToZone(){
 //this.props.handler(this.props.id);
      this.props.navigation.push('zone', {zoneId: this.props.id, name: this.props.name});
    }
  
    render(){
       return(
          <TouchableHighlight onPress={this.goToZone}>
            <View style={styles.zoneContainer} onPress={this.goToZone}>
              { this.props.object.type == 'dining' &&
                <Image source={require('./images/dining.png')} style={{flex: 1, position:'absolute'}} resizeMode="cover"/> }
              { this.props.object.type == 'living' &&
                <Image source={require('./images/living.png')} style={{flex: 1, position:'absolute'}} resizeMode="cover"/> }
              { this.props.object.type == 'hallway' &&
                <Image source={require('./images/hallway.png')} style={{flex: 1, position:'absolute'}} resizeMode='cover'/> }
              { this.props.object.type == 'bathroom' &&
                <Image source={require('./images/bathroom.png')} style={{flex: 1, position:'absolute'}} resizeMode='cover'/> }
              { this.props.object.type == 'kitchen' &&
                <Image source={require('./images/kitchen.png')} style={{flex: 1, position:'absolute'}} resizeMode='cover'/> }
              <View style={styles.zoneLabelContainer}>
            </View>
              <View style={styles.zoneTemperatureContainer}>
                <View style={{ flex: 4 }}>
                <Text style={styles.zoneName}>{this.props.name}</Text>
                </View>
                { this.props.object.intermediary != null &&
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', marginBottom: 5}}>
                  <Icon type='font-awesome' name='thermometer' color="white" size={20}/>
                  <Text style={[styles.zoneTemperature, {justifyContent:"center", alignSelf: 'flex-end'}]}>   {this.props.object.temperature} °C</Text>
                </View> }
              </View>
          </View>
          </TouchableHighlight>
        );        
    }
  }

class Scene extends Component {
    constructor(props){
      super(props);

      this.goToScene = this.goToScene.bind(this);
    }

    goToScene(){
      this.props.navigation.push('newScene', {id: this.props.id, play: true});
    }

    render(){
      return(
        <View style={{ flexDirection: 'column', marginVertical: 20}}>
          <TouchableHighlight onPress={this.goToScene}>
            <View style={{ marginHorizontal: 20, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomColor: 'rgb(204, 204, 204)', 
              borderBottomWidth: 1, backgroundColor: 'rgb(127, 127, 127)', padding: 10}}>
              <View style={{marginBottom: 10}}>
                <Text style={styles.whiteText}>{this.props.name}</Text>
              </View>
              <View>
                <Text style={{color: 'white', fontSize: 14, marginLeft: 20}}>{this.props.description}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={ ()=> Communication.getInstance().executeScene(this.props.id)}>
            <View style={{ marginHorizontal: 20, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, 
              backgroundColor: 'rgb(130, 130, 130)', alignItems: 'center', justifyContent: 'center', padding: 10}}>
              <Text style={{ fontSize:15, color: 'cyan'}}>EJECUTAR</Text>
            </View>
         </TouchableHighlight>
         </View>
       );        
   }
}

export default class Home extends Component {
    scroll = new Animated.Value(0);
    headerY;
    static navigationOptions = {
      title: 'Inicio',
    };
  
    constructor(props) {
      super(props);
      this.headerY = Animated.multiply(Animated.diffClamp(this.scroll, 0, NAVBAR_HEIGHT), -1);
  
      this.state = {
        scenes: [],
        zones: [],
      }
  
    }
    
    setStateAsync(state) {
      return new Promise((resolve) => {
        this.setState(state, resolve)
      });
    }

    async componentDidMount() {
      //StatusBar.setNetworkActivityIndicatorVisible(true);
      const zones = await Communication.getInstance().getZones();
      //await this.setStateAsync({zones: zones});
      const scenes = await Communication.getInstance().getScenes(true, false);
      await this.setStateAsync({zones: zones, scenes: scenes});
      //StatusBar.setNetworkActivityIndicatorVisible(false);
    }
    
    render() {
      const tabY = Animated.add(this.scroll, this.headerY);
      
      return (
        <FontLoader>
        <View style={{ backgroundColor: COLOR }}>
          <Animated.View style={{
            width: "100%",
            position: "absolute",
            transform: [{
              translateY: this.headerY
            }],
            elevation: 0,
            flex: 1,
            zIndex: 1,
            backgroundColor: COLOR
          }}>
          </Animated.View>
          <Animated.ScrollView
            scrollEventThrottle={1}
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={{zIndex: 0, height: "100%", elevation: -1, backgroundColor: COLOR}}
            contentContainerStyle={{paddingTop: NAVBAR_HEIGHT}}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.scroll}}}],
              {useNativeDriver: true},
            )}
            overScrollMode="never">
            <Tabs renderTabBar={(props) => <Animated.View
              style={[{
                transform: [{translateY: tabY}],
                zIndex: 1,
                width: "100%",
                backgroundColor: COLOR
              }, /*Platform.OS === "ios" ? {paddingTop: 20} : null*/]}>
              <ScrollableTab {...props} tabBarBackgroundColor={{COLOR}} style={{backgroundColor:COLOR, flex: 1}} underlineStyle={{backgroundColor: "white", borderColor: "transparent"}}/>
            </Animated.View>
            }>
              <Tab heading="CUARTOS" style={styles.mainMenuTab} {...TAB_PROPS}>
                { this.state.zones.length == 0 && 
                <View style={{flex: 1, backgroundColor: 'white'}}>
                </View>}
                {
                      this.state.zones.map(item =>
                      <Zone key={item.id} object={item} name={item.name} id={item.id}  type={item.type} intermediary={item.intermediary} temperature={item.temperature} navigation={this.props.navigation}/>)
                }
              </Tab>
              <Tab heading="ESCENAS" style={{ backgroundColor: 'rgb(204, 204, 204)' }} {...TAB_PROPS}>
                  {
                    this.state.scenes.map(item =>
                      <Scene name={item.name} id={item.id} key={item.id} description={item.description} navigation={this.props.navigation}/>)
                  }
              </Tab>
            </Tabs>
          </Animated.ScrollView>
        </View>
        </FontLoader>
      );
    }
}