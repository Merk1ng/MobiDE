import React, {useEffect} from 'react';
import DocScanner from 'react-native-document-scanner-plugin';

export default function CameraScan({handleOnPressOK}) {
  useEffect(() => {
    DocScanner.scanDocument({
      maxNumDocuments: 1,
    }).then(({scannedImages}) => {
      if (scannedImages.length > 0) {
        handleOnPressOK(scannedImages[0]);
      }
    });
  }, [handleOnPressOK]);

  return <React.Fragment />;
}
