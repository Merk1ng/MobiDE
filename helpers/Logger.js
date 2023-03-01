import React from 'react';
import database from '@react-native-firebase/database';

export default class Logger {
  static log(info, lvl) {
    database()
      .ref('logs/' + global.user.name)
      .push({t: new Date().toISOString(), i: info});
  }
}
