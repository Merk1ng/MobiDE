import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from '@rneui/themed';
import AppHeader from '../../components/AppHeader';
import {DropdownPicker} from '../../components/DropdownPicker';

export class Settings extends React.Component {
  static navigationOptions = {
    title: 'Настройки',
    drawerIcon: <Icon name="settings" color="#000" />,
  };

  constructor(props) {
    super(props);
    this.state = {
      theme: 'Default',
    };
  }

  render() {
    return (
      <View>
        <AppHeader
          navigation={this.props.navigation}
          leftIcon="arrow-back"
          title="Настройки"
          leftIconAction={() => {
            this.props.navigation.goBack();
          }}
        />

        <DropdownPicker
          disabled={false}
          value={this.state.theme}
          items={[{name: 'Версия № 6.1.20'}, {name: 'Default'}]}
          onChange={value => {
            this.setState({theme: value});
            global.theme = value;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Settings;
