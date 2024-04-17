import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType, FaceDetectorLandmarks, FaceDetectorMode, FaceDetectorClassifications, AutoFocus } from 'expo-camera';
import { Camera as CameraComponent } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';


export default function CameraPage(props) {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [onCameraReady, setCameraReady] = useState(false);
    const [autoFocus, setAutoFocus] = useState(AutoFocus.auto);

    // Handling camera loading from expo sample code
    if (!permission) {
        // Camera permissions are still loading
        return <View><Text>Loading Camera...</Text></View>;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    // Allow user to pick an image from the gallery instead of taking a picture
    async function pickImageFromGallery() {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 1],
            quality: 1,
        });

        if (!result.canceled) {
            props.capture(result.assets[0].uri);
        }

    }


    // Switch between front and back camera
    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    // Take a picture and switch to image editor
    function capture() {
        // Take a picture
        if (!onCameraReady && camera != null) {
            camera.takePictureAsync().then(data => {
                console.log(data);
                props.capture(data.uri);
            });
        }
    }

    // Tap the screen to focus the camera
    const tap = Gesture.Tap().numberOfTaps(1).onStart(() => {
        // Wait for one second assuming focus is done and turn it off. 
        setTimeout(() => { setAutoFocus(AutoFocus.off); }, 1000);
        setAutoFocus(AutoFocus.on);
    });

    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={tap} style={styles.container}>
                <Camera autoFocus={autoFocus} style={styles.camera} type={type} ref={(r) => { camera = r }}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onCameraReady={() => setCameraReady(true)} onPress={toggleCameraType}>
                            <MaterialIcons name="cameraswitch" size={40} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={capture}>
                            <MaterialIcons name="photo-camera" size={40} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={pickImageFromGallery}>
                            <MaterialIcons name="photo-library" size={40} color="white" />
                        </TouchableOpacity>
                    </View>
                </Camera>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});