import React from 'react';
import {Button, Icon} from '@rneui/themed';
import AsyncStorage from '@react-native-community/async-storage';

class LogOutButton extends React.Component {
  static navigationOptions = {
    title: 'Выйти',
    drawerIcon: <Icon name="exit-to-app" color="#000" />,
  };

  constructor(props) {
    super(props);

    AsyncStorage.clear();
    AsyncStorage.removeItem('user')
      .then(res => {
        return AsyncStorage.removeItem('documents');
      })
      .then(res => {
        this.props.navigation.navigate('LoginScreen');
      });
  }

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

export default LogOutButton;
