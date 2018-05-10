import Drawer from 'react-native-drawer';
import React, { Component } from 'react';
import SideBarContent from './SideBarContent';
import { Text, View, Image, TouchableHighlight } from 'react-native';

export default class SideBar extends Component{

    constructor(){
        super();

        this.closeControlPanel = this.closeControlPanel.bind(this);
        this.openControlPanel = this.openControlPanel.bind(this);
    }

    closeControlPanel = () => {
        this._drawer.close()
    };

    openControlPanel = () => {
        this._drawer.open()
    };

    render()
    {
        const drawerStyles = {
            drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
            main: {paddingLeft: 3},
        }

        return (
            <Drawer
                type="static"
                content={<SideBarContent />}
                ref = {(ref) => this._drawer = ref}
                openDrawerOffset={100}
                styles={drawerStyles}
                tweenHandler={Drawer.tweenPresets.parallax}
            >
               
            
            <TouchableHighlight onPress={this.openControlPanel} >
                
                <Image source={require('./images/menu.png')} style={{height:20, width:20, marginTop:5 }} />
                </TouchableHighlight>
            </Drawer>
        );
    }
}