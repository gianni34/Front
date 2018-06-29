import React from 'react';
import { AppLoading, Font } from 'expo';

import FontAwesome 
  from './node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';
import MaterialIcons  
  from './node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
import Entypo 
  from './node_modules/@expo/vector-icons/fonts/Entypo.ttf';
import MaterialCommunityIcons  
  from './node_modules/@expo/vector-icons/fonts/MaterialCommunityIcons.ttf';
import Ionicons 
  from './node_modules/@expo/vector-icons/fonts/Ionicons.ttf';
class FontLoader extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentWillMount() {
    try {
      await Font.loadAsync({
        MaterialIcons, 
        Entypo,
        MaterialCommunityIcons,
        Ionicons,
        FontAwesome
      });
      this.setState({ fontLoaded: true });

    } catch (error) {
      console.log('error loading icon fonts', error);
    }
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }

    return this.props.children;
  }
}

export { FontLoader };
