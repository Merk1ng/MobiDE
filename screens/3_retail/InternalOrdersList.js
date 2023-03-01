'use strict';

import React from 'react';

import {ListItem} from '@rneui/themed';
import CommonFunctions from '../../helpers/CommonFunctions';
import MobidServer1C from '../../helpers/MobidServer1C';
import DocumentList from '../../prototypes/DocumentList';

export class InternalOrdersList extends DocumentList {
  static navigationOptions = CommonFunctions.getNavigationOptions(
    'Заказы на склад',
    'parachute',
    'material-community',
  );
  componentDidMount() {
    this.props.navigation.addListener('focus', this._willFocus);
  }

  ASYNC_STORAGE_KEY = 'DocumentsIO';
  TITLE = 'Заказы на склад';
  DOCUMENT_DETAILS_SCREEN = 'InternalOrderDetails';

  _willFocus() {
    CommonFunctions.stack = null;

    let params = {
      UserCode: global.user.name,
      UserKey: global.user.key,
    };

    MobidServer1C.fetch('GetInternalOrders', params)
      .then(data => {
        this.state({list: data});
      })
      .catch(error => {
        console.log(error.toString());
      });
  }

  renderItem = rowData => {
    return (
      // <ListItem
      //   pad={20}
      //   leftIcon={CommonFunctions.getDocIcon(rowData.item)}
      //   badge={{
      //     value: rowData.item.items.length,
      //     textStyle: {color: 'white'},
      //     containerStyle: {width: 30},
      //   }}
      //   key={rowData.item.id}
      //   title={CommonFunctions.getStringDate(rowData.item.date)}
      //   subtitle={rowData.item.id}
      //   rightSubtitle={rowData.item.automatic ? 'Aвто' : ''}
      //   onPress={this.onPressItem(rowData.item)}
      // />
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>{'Document Example №' + rowData.id}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };
}

export default InternalOrdersList;
