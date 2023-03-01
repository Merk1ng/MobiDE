import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import {Icon, ListItem} from '@rneui/themed';
import CommonFunctions from '../../helpers/CommonFunctions';
import Fab from '../../components/Fab';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import MobidServer1C from '../../helpers/MobidServer1C';

export class FoodServiceOrdersList extends Component {
  static navigationOptions = {
    title: 'Заказы на склад',
    drawerIcon: <Icon name="parachute" type="material-community" />,
  };

  constructor(props) {
    super(props);

    if (!Array.isArray(global.internalOrdersDraft)) {
      global.internalOrdersDraft = [];
    }
    if (!Array.isArray(global.internalOrders)) {
      global.internalOrders = [];
    }

    this.state = {
      list: global.internalOrdersDraft.concat(global.internalOrders),
      loading: false,
    };
  }

  refreshItems() {
    if (!Array.isArray(global.internalOrdersDraft)) {
      global.internalOrdersDraft = [];
    }
    if (!Array.isArray(global.internalOrders)) {
      global.internalOrders = [];
    }
    // this.setState({
    //   list: global.internalOrdersDraft.concat(global.internalOrders),
    // });
  }

  static getIcon(item) {
    let color = item.comment === 'Тест МобиД' ? '#595' : '#777';

    switch (item.status) {
      case 'draft':
        return (
          <Icon name="file-outline" type="material-community" color={color} />
        );
      case 'new':
        return (
          <Icon name="file-check" type="material-community" color={color} />
        );
      case 'В пути':
        return (
          <Icon type="material-community" name={'truck-fast'} color={color} />
        );
      case 'Обрабатывается':
        return (
          <Icon
            type="material-community"
            name={'progress-clock'}
            color={color}
          />
        );
      case 'Принят':
        return (
          <Icon
            type="material-community"
            name={'check-outline'}
            color={color}
          />
        );
      default:
        return (
          <Icon type="material-community" name={'truck-fast'} color={color} />
        );
    }
  }

  UNSAFE_componentWillMount() {
    let params = {
      UserCode: global.user.name,
      UserKey: global.user.key,
    };
    this.setState({loading: true});

    MobidServer1C.fetch('GetInternalOrders', params)
      .then(data => {
        this.setState({list: data, loading: false});
        global.internalOrdersDraft = data;
      })
      .catch(error => {
        console.log(error.toString());
      });
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => this.startTimer());
    this.props.navigation.addListener('blur', () => this.stopTimer());
    this.refreshItems();
  }

  refresh() {
    let promises = [];

    if (!global.storages || !Array.isArray(global.storages)) {
      return;
    }

    global.storages.forEach(storage => {
      promises.push(
        new Promise((resolve, reject) => {
          database()
            .ref(
              'e/InternalOrders/_' + storage.guid.replace(/[^a-z0-9]/gi, '_'),
            )
            .on('value', snapshot => {
              resolve(snapshot.val());
            });
        }),
      );
    });

    let newArr = [];

    Promise.all(promises).then(results => {
      results.forEach(result => {
        newArr = newArr.concat(result);
      });

      global.internalOrders = newArr;
      AsyncStorage.setItem(
        'internalOrders',
        JSON.stringify(global.internalOrders),
      );
    });

    database()
      .ref('i/' + global.user.name + '/InternalOrders')
      .on('value', snapshot => {
        let docs = snapshot.val();

        let newDrafts = [];
        global.internalOrdersDraft.forEach(draft => {
          if (
            draft.status === 'draft' ||
            (docs && docs[draft.id] && draft.id === docs[draft.id].id)
          ) {
            newDrafts.push(draft);
          }
        });

        global.internalOrdersDraft = newDrafts;
        AsyncStorage.setItem(
          'internalOrdersDraft',
          JSON.stringify(global.internalOrdersDraft),
        );
      });
  }

  startTimer() {
    this.refresh();
    this.refreshItems();
  }

  stopTimer() {}

  renderItem(rowData) {
    if (!rowData.item) {
      return <Text>Нет данных</Text>;
    }
    console.log('item', rowData.item);

    return (
      <ListItem
        Component={TouchableHighlight}
        badge={{
          value: rowData.item.items.length,
          textStyle: {color: 'white'},
          containerStyle: {width: 30},
        }}
        onPress={() =>
          this.props.navigation.navigate('InternalOrderDetails', {
            document: rowData.item,
          })
        }
        pad={20}
        key={rowData.item.id}>
        <ListItem.Content>
          <ListItem.Title>
            {CommonFunctions.getStringDate(rowData.item.date)}
          </ListItem.Title>

          <ListItem.Subtitle>{rowData.item.id}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <AppHeader
          navigation={this.props.navigation}
          leftIcon="menu"
          title="Заказы на склад"
          leftIconAction={() => {
            this.props.navigation.openDrawer();
          }}
        />

        {this.state.loading ? (
          <ActivityIndicator color="#000000" />
        ) : (
          <FlatList
            extraData={this.state.refreshItems}
            data={this.state.list}
            renderItem={rowData => this.renderItem(rowData)}
            keyExtractor={(rowData, index) => index.toString()}
          />
        )}
        <Fab
          action={() => {
            this.props.navigation.navigate('InternalOrderDetails', {
              document: null,
              previousScreen: 'TabScreen',
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  indicator: {
    margin: 40,
    color: '#999',
  },
});

export default FoodServiceOrdersList;
