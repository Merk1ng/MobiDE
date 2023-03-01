import {Modal, StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';

export function BarcodeScanner({visible, lastTwo, onChange, onCancel}) {
  useEffect(() => {
    Camera.requestCameraPermission();
    Camera.requestMicrophonePermission();
    Camera.getAvailableCameraDevices();
  }, []);

  const [state, setState] = useState({maskColor: 'white'});

  const {height, width} = Dimensions.get('window');
  const maskColWidth = width / 2;

  const availableDevices = useCameraDevices();

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    onChange(barcodes);
  }, [barcodes, onChange]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={onCancel}>
        <View style={styles.container}>
          {/*<Camera*/}
          {/*  style={styles.preview}*/}
          {/*  device={availableDevices?.back}*/}
          {/*  isActive*/}
          {/*  photo*/}
          {/*  frameProcessor={frameProcessor}*/}
          {/*  frameProcessorFps={5}*/}
          {/*  ref={ref => {*/}
          {/*    this.camera = ref;*/}
          {/*  }}*/}
          {/*  preset="medium"*/}
          {/*  torch={'off'}*/}
          {/*/>*/}

          <View style={styles.maskOutter}>
            <View style={[{flex: 0.8}, styles.maskRow, styles.maskFrame]} />
            <View style={[{flex: 30}, styles.maskCenter]}>
              <View style={[{width: maskColWidth}, styles.maskFrame]} />
              <View
                style={[styles.maskInner, {borderColor: state.maskColor}]}
              />
              <View style={[{width: maskColWidth}, styles.maskFrame]} />
            </View>
            <View style={[{flex: 0.8}, styles.maskRow, styles.maskFrame]} />
          </View>
        </View>

        {/* last scanned positions */}
        <View
          style={{
            position: 'absolute',
            top: 4,
            left: 4,
            right: 4,
            height: 50,
          }}>
          {lastTwo
            ? lastTwo.map(item => {
                return (
                  <Text style={{color: '#0a0'}}>
                    Добавлен: {item.name} ...{' '}
                  </Text>
                );
              })
            : null}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 1,
    alignSelf: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskInner: {
    width: 300,
    borderWidth: 1,
    height: 500,
    backgroundColor: 'transparent',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default BarcodeScanner;
