import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  Text,
} from 'react-native';
import {ListItem} from '@rneui/themed';
import CommonFunctions from '../../helpers/CommonFunctions';
import DeliveriesDate from '../../helpers/DeliveriesDate';
import MobidServer1C from '../../helpers/MobidServer1C';
import DocumentList from '../../prototypes/DocumentList';

export class ExternalOrdersList extends DocumentList {
  static navigationOptions = CommonFunctions.getNavigationOptions(
    'Заказы поставщикам',
    'truck',
    'font-awesome',
  );

  ASYNC_STORAGE_KEY = 'DocumentsEO';
  TITLE = 'Заказы поставщикам с УПД';
  DOCUMENT_DETAILS_SCREEN = 'ExternalOrderDetails';

  constructor(props) {
    super(props);
    this.state = {
      dialog_filter: false,
      list: global.internalOrdersDraft.concat(global.internalOrders),
      loading: false,
    };
  }
  onPressItem = item => () => {
    this.props.navigation.navigate(this.DOCUMENT_DETAILS_SCREEN, {
      document: item,
    });
  };

  _willFocus() {
    CommonFunctions.stack = null;

    let params = {
      UserCode: global.user.name,
      UserKey: global.user.key,
    };
    this.setState({loading: true});

    MobidServer1C.fetch('GetExternalOrdersNoReceipts', params)
      .then(data => {
        this.setState({list: data, loading: false});
      })
      .catch(error => {
        console.log(error.toString());
      });
  }

  onClickFilterIcon() {
    this.setState({dialog_filter: true});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.getHeader()}

        {this.state.loading ? (
          <ActivityIndicator color="#000000" />
        ) : (
          <FlatList
            data={this.state.list}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        )}

        {this.getDialogFilter()}
      </View>
    );
  }

  renderItem = rowData => {
    if (!rowData.item) {
      return <Text>Нет данных</Text>;
    }

    let item = rowData.item;

    return (
      <ListItem
        Component={TouchableHighlight}
        onPress={() => {
          this.props.navigation.navigate(this.DOCUMENT_DETAILS_SCREEN, {
            document: item,
          });
        }}
        pad={20}
        key={rowData.item.id}>
        <ListItem.Content>
          <ListItem.Title>
            {CommonFunctions.getStringDate(item?.date) +
              ' -  ' +
              CommonFunctions.getStringDateddMMMM(item.shipment)}
          </ListItem.Title>

          <ListItem.Subtitle>
            {item.supplier ? item.supplier.name : ''}
          </ListItem.Subtitle>

          <ListItem.Subtitle right style={{color: 'red'}}>
            {item.delay
              ? 'Просрочен!' +
                '\n' +
                DeliveriesDate.getStringDateddMMMM(item.DateDelay)
              : ''}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

export default ExternalOrdersList;
