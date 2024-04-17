import { Camera, CameraType, FaceDetectorLandmarks, FaceDetectorMode, FaceDetectorClassifications } from 'expo-camera';
import { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CameraPage from './Camera';
import ImageEditor from './ImageEditor';

export default function App() {
  const [captured, setCaptured] = useState('');

  // Based on whether an image is captured/selected, use camera view or image editor view.
  if (captured === '') {
    return <SafeAreaView style={styles.container}><CameraPage capture={setCaptured}/></SafeAreaView>;
  } else {
    return <SafeAreaView style={styles.container}><ImageEditor image={captured} reset={() => setCaptured('')}/></SafeAreaView> ;
  }
}

