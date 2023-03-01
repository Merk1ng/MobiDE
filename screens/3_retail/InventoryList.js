import React from 'react';
import {ListItem} from '@rneui/themed';
import CommonFunctions from '../../helpers/CommonFunctions';
import DocumentList from '../../prototypes/DocumentList';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import MobidServer1C from '../../helpers/MobidServer1C';

export class InventoryList extends DocumentList {
  // @Override
  static navigationOptions = CommonFunctions.getNavigationOptions(
    'Инвентаризации',
    'calculator',
    'material-community',
  );

  ASYNC_STORAGE_KEY = 'Documents_Inventory';
  TITLE = 'Инвентаризации';
  DOCUMENT_DETAILS_SCREEN = 'InventoryDetails';
  EMPTY_DOCUMENT = {
    id: CommonFunctions.getDocumentID('DEF'),
    date: new Date(),
    items: [],
    type: 'Тара',
  };
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

    MobidServer1C.fetch('GetInventory', params)
      .then(data => {
        this.setState({list: data, loading: false});
      })
      .catch(error => {
        console.log(error.toString());
      });
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
    let item = rowData.item;

    /* тут надо вкрутить проверок... */

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
        onLongPress={this.onLongPressItem(item)}
        pad={20}
        key={rowData.item.id}>
        <ListItem.Content>
          <ListItem.Title>
            {CommonFunctions.getStringDate(item.date)}
          </ListItem.Title>

          <ListItem.Subtitle style={styles.rightSubtitle}>
            {item.status}
          </ListItem.Subtitle>

          <ListItem.Subtitle right style={styles.rightSubtitle}>
            {item.type}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };
}

const styles = StyleSheet.create({
  rightSubtitle: {
    textAlign: 'left',
    width: '100%',
  },
});

export default InventoryList;
