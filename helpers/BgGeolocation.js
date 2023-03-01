'use strict';

import BackgroundJob from 'react-native-background-job';
import Geolocation from '@react-native-community/geolocation';
import Logger from './Logger';
import database from '@react-native-firebase/database';

const bgWorker = function () {
  if (!global.user) {
    return;
  }
  Geolocation.getCurrentPosition(info => {
    let values = {
      lat: info.coords.latitude,
      lon: info.coords.longitude,
      timestamp: info.timestamp,
    };
    database()
      .ref('geo/' + global.user.name)
      .set(values);
  });
};

const backgroundJob = {
  jobKey: 'myJob',
  job: () => bgWorker(),
};

BackgroundJob.register(backgroundJob);

var backgroundSchedule = {
  jobKey: 'myJob',
};

export default class BgGeolocation {
  static start() {
    // Когда приложение в фоне. Раз в 15 МИНУТ.
    BackgroundJob.schedule(backgroundSchedule)
      .then(() => {
        console.log('bgworker is started');
        Logger.log('bgworker is started');
      })
      .catch(err => {
        Logger.log('bgWorker is failed ' + JSON.stringify(err));
      });

    // Когда приложение в рантайме. Раз в 15 СЕКУНД.
    setInterval(() => {
      bgWorker();
    }, 15000);
  }
}
