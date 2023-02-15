import React from 'react';
import * as firebase from "@react-native-firebase/app";

export default class Logger {

    static log(info, lvl) {
        firebase.database().ref('logs/' + global.user.name).push({t: new Date().toISOString(), i: info});
    }
}
