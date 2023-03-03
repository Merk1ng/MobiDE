import React from 'react';
import {StyleSheet, Modal} from 'react-native';
import storage from '@react-native-firebase/storage';
import CameraScan from './CameraScan';

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

  render() {
    console.log('state', this.state.data);
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={this.props.close}>
        <CameraScan handleOnPressOK={this.handleOnPressOK} />
      </Modal>
    );
  }
}

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
