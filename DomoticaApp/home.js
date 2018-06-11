import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableHighlight, Dimensions, ScrollView, ImageBackground, Animated, Platform } from 'react-native';
import { Body, Header, List, ListItem as Item, ScrollableTab, Tab, Tabs, Title, Button } from "native-base";
import styles  from './styles';
import Block from './Menu';
import Communication from './communication';

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
            { this.props.type == 'dining' &&
              <Image source={require('./images/dining.png')} style={{flex: 1, position:'absolute'}} resizeMode="cover"/> }
            { this.props.type == 'living' &&
              <Image source={require('./images/living.png')} style={{flex: 1, position:'absolute'}} resizeMode="cover"/> }
            { this.props.type == 'hallway' &&
              <Image source={require('./images/hallway.png')} style={{flex: 1, position:'absolute'}} resizeMode='cover'/> }
            { this.props.type == 'bathroom' &&
              <Image source={require('./images/bathroom.png')} style={{flex: 1, position:'absolute'}} resizeMode='cover'/> }
              <View style={styles.zoneLabelContainer}>
              </View>
              <Text style={styles.zoneName}>{this.props.name}</Text>
          </View>
          </TouchableHighlight>
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
        zones: [],
      }
  
    }
  
    componentWillMount(){
      this.state.zones = Communication.getInstance().getZones();
    }
    
    render() {
      const tabY = Animated.add(this.scroll, this.headerY);
      return (
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
              <ScrollableTab {...props} tabBarBackgroundColor={{COLOR}} style={{backgroundColor:COLOR}} underlineStyle={{backgroundColor: "white", borderColor: "transparent"}}/>
            </Animated.View>
            }>
              <Tab heading="CUARTOS" style={styles.mainMenuTab} {...TAB_PROPS}>
                {
                      this.state.zones.map(item =>
                      <Zone name={item.name} id={item.id} key={item.id} type={item.type} navigation={this.props.navigation}/>)
                }
              </Tab>
              <Tab heading="ESCENAS" style={styles.mainMenuTab} {...TAB_PROPS}>
                  {
                      <View style={{ height:70, marginTop:10, marginHorizontal:10 }}>
                        <Block name="Ceci"/>
                      </View>
                  }
              </Tab>
            </Tabs>
          </Animated.ScrollView>
        </View>
      );
    }
}