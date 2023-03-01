import React, {Component} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {GlobalContext} from '../../context';

export class Splash extends Component {
  keys;
  static contextType = GlobalContext;

  init() {
    switch (global.user.type) {
      case 1:
        this.props.navigation.navigate('TabScreen', {screen: 'TechnicStack'});
        this.keys = ['goods', 'customers', 'reports'];
        break;

      case 2:
        this.props.navigation.navigate('TabScreen', {
          screen: 'WholesaleStack',
        });
        this.keys = ['customers', 'questions'];
        break;

      case 3:
        this.props.navigation.navigate('TabScreen', {screen: 'RetailStack'});
        this.keys = [
          'goods',
          'storages',
          'organizations',
          'suppliers',
          'suppliersGoods',
          'barcodes',
          'inventory',
          'internalOrders',
          'internalOrdersDraft',
          'externalOrders',
          'externalOrdersDraft',
          'purchases',
          'purchasesDraft',
          'technics',
          'servicesList',
          'hgoods',
          'receivedfromsupplier',
        ];
        break;

      case 4:
        this.props.navigation.navigate('TabScreen', {
          screen: 'RetailTechnicStack',
        });
        this.keys = ['goods', 'customers', 'servicesList'];
        break;

      case 5:
        this.props.navigation.navigate('TabScreen', {
          screen: 'FoodServiceStack',
        });
        this.keys = ['goods', 'organizations', 'storages'];
        break;

      case 6:
        this.props.navigation.navigate('TabScreen', {screen: 'FranchiseStack'});
        this.keys = ['barcodes', 'goods'];
        break;
    }

    let promises = [];
    this.keys.forEach(key => {
      promises.push(AsyncStorage.getItem(key));
      AsyncStorage.removeItem(key);
    });

    return Promise.all(promises);
  }

  constructor(props) {
    super(props);
    this.props.navigation.addListener('focus', () => this._willFocus());
  }

  _willFocus() {
    AsyncStorage.getItem('user').then(user => {
      global.user = JSON.parse(user);

      if (!user) {
        this.props.navigation.navigate('LoginScreen');
        return;
      }

      this.init()
        .then(results => {
          this.keys.forEach((key, i) => {
            let d = JSON.parse(results[i]);
            global[key] = d ? d : [];
          });
          console.log('test  1');

          let d = [];

          this.keys.forEach((key, i) => {
            d = d.concat(global[key]);
          });

          if (d.length === 0 || this.needUPD(global.user)) {
            console.log('test 2');
            let newUser = JSON.parse(user);
            newUser.lastUPD = new Date().toISOString();
            AsyncStorage.setItem('user', JSON.stringify(newUser)).then(
              res => {},
            );
            this.props.navigation.navigate('Downloading');
          }
          console.log('test 3');
        })
        .catch(err => {
          Alert.alert('Не удалось загрузить данные', JSON.stringify(err));
          console.log(err);
        });
    });
  }

  needUPD(user) {
    let currDate = new Date().getTime();

    if (!user) {
      return true;
    } else if (!user.lastUPD) {
      return true;
    } else if (currDate - new Date(user.lastUPD).getTime() > 1000 * 86400 * 2) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Загрузка... </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
});

export default Splash;
