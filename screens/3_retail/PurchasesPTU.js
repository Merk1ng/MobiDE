'use strict';

import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import CommonFunctions from '../../helpers/CommonFunctions';
import {ListItem} from '@rneui/themed';
import MobidServer1C from '../../helpers/MobidServer1C';
import DocumentList from '../../prototypes/DocumentList';

export class PurchasesPTU extends DocumentList {
  static navigationOptions = CommonFunctions.getNavigationOptions(
    'ПТУ(Склад)',
    'shopping-cart',
    'font-awesome',
  );

  ASYNC_STORAGE_KEY = 'DocumentsP';
  TITLE = 'ПТУ(Cклад)';
  DOCUMENT_DETAILS_SCREEN = 'PurchaseDetailsPTU';
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  _willFocus() {
    CommonFunctions.stack = null;
    this.setState({loading: true});
    let params = {
      UserCode: global.user.name,
      UserKey: global.user.key,
    };

    MobidServer1C.fetch('GetPurchasesOurSuppliers', params) // Склад
      .then(data => {
        this.setState({list: data, loading: false});
      })
      .catch(error => {
        console.log(error.toString());
      });
  }

  render() {
    return (
      <View style={_styles.container}>
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

    return (
      <ListItem
        Component={TouchableHighlight}
        badge={{
          value: rowData.item.items.length,
          textStyle: {color: 'white'},
          containerStyle: {width: 30},
        }}
        onPress={() => {
          this.props.navigation.navigate(this.DOCUMENT_DETAILS_SCREEN, {
            document: rowData.item,
          });
        }}
        pad={20}
        key={rowData.item.id}>
        <ListItem.Content>
          <ListItem.Title>
            {CommonFunctions.getStringDate(rowData.item.date)}
          </ListItem.Title>

          <ListItem.Subtitle>
            {rowData.item.supplier ? rowData.item.supplier.name : ''}
          </ListItem.Subtitle>

          <ListItem.Subtitle right>
            {rowData.item.automatic ? 'Aвто' : ''}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };
}
const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
export default PurchasesPTU;
