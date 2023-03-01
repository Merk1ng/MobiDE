import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {Icon} from '@rneui/themed';
import DocScanner from 'react-native-document-scanner-plugin';
import storage from '@react-native-firebase/storage';

export default class DocumentScanner extends React.Component {
  // pdfScannerElement = useRef(null);
  constructor(props) {
    super(props);
    this.state = {data: null, torch: false, scannedImage: 'file://'};
  }

  handleOnPressRetry = () => {
    this.setState({data: null});
  };

  handleOnPress = () => {
    this.refs.pdfScannerElement.capture();
  };

  onSuccess() {
    console.log('success');
  }

  handleOnPressOK = croppedImage => {
    /* let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                let uploadTask = firebase.storage().ref().child('documents/' + global.user.name + '/' +xhr.response._data.name).put(xhr.response);
                uploadTask.on('state_changed', function (snapshot) {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes);
                    if (progress >= Uploading.progress_state) {
                        Uploading.progress_state = progress;
                    }
                }, function (error) {
                    rej(error);
                }, function () {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('success1');
                       // this.onSuccess();
                    });
                });
            };

            xhr.onerror = function (e) {
                res(null);
            };
            xhr.responseType = 'blob';
            xhr.open('GET', , true);
            xhr.send(null);
    */
    this.props.onStartUploading();

    this.uploadFile(croppedImage).then(url => {
      this.props.onCompleteUploading(url);
      this.setState({modalVisible: false});
    });
  };

  uploadFile(file) {
    return new Promise((res, rej) => {
      let xhr = new XMLHttpRequest();
      xhr.onload = function () {
        let uploadTask = storage()
          .ref()
          .child(
            'documents/' +
              global.user.name.toUpperCase() +
              '/' +
              xhr.response._data.name,
          )
          .put(xhr.response);
        uploadTask.on(
          'state_changed',
          function (snapshot) {
            console.log('123', snapshot);
            this.props.onProcessUploading(snapshot);
          },
          function (error) {
            rej(error);
          },
          function () {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                res(downloadURL);
              });
          },
        );
      };

      xhr.onerror = function (e) {
        res(null);
      };
      xhr.responseType = 'blob';
      xhr.open('GET', file, true);
      xhr.send(null);
    });
  }

  setData = data => {
    this.setState({data: data});
  };
  handleOnFlashSwitch = () => {
    this.setState({torch: !this.state.torch});
  };

  scanDocument = async () => {
    // start the document scanner
    const {scannedImages} = await DocScanner.scanDocument({
      maxNumDocuments: 1,
    });

    // get back an array with scanned image file paths
    if (scannedImages.length > 0) {
      this.handleOnPressOK(scannedImages[0]);
      // set the img src, so we can view the first scanned image
      this.setState({data: {croppedImage: scannedImages[0]}});
    }
  };

  componentDidMount() {
    this.scanDocument();
  }

  render() {
    console.log('state', this.state.data);
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={this.props.close}>
        <React.Fragment>
          <Image
            style={{width: '100%', height: '50%'}}
            source={{uri: this.state.data?.croppedImage}}
          />

          <Text style={styles.tipText}>1. Наведите камеру на документ</Text>
          <Text style={styles.tipText}>
            2. Дождитесь, когда сканер определит границы документа
          </Text>
          <View style={styles.btnTorch}>
            <TouchableOpacity
              onPress={this.handleOnFlashSwitch}
              style={styles.buttonTorch}>
              <Icon name={'flash-on'} size={52} />
            </TouchableOpacity>
          </View>
        </React.Fragment>
      </Modal>
    );
  }
}

/*
* <TouchableOpacity
                            onPress={this.handleOnPress}
                            style={styles.button}>

                            <Text style={styles.buttonText}>
                                Сканировать
                            </Text>

                        </TouchableOpacity>
* */

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    aspectRatio: undefined,
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 32,
  },
  btnTorch: {
    alignSelf: 'flex-end',
    position: 'absolute',
    flexDirection: 'row',
    top: 15,
    right: 10,
  },
  buttonTorch: {
    backgroundColor: 'rgba(245, 252, 255, 0.2)',
  },
  buttonRetry: {
    marginRight: 10,
  },
  btnGroup: {
    alignSelf: 'center',
    position: 'absolute',
    flexDirection: 'row',
    bottom: 32,
  },
  buttonOk: {
    marginLeft: 10,
  },
  tipText: {
    backgroundColor: 'rgba(245, 252, 255, 0.2)',
    fontSize: 14,
    color: 'tomato',
  },
  buttonText: {
    backgroundColor: 'rgba(245, 252, 255, 0.7)',
    fontSize: 32,
  },
  preview: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  permissions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
