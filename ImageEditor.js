import React, { useState } from 'react';
import { Button, Image, ImageBackground, PermissionsAndroid, SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';
import { Modal, Pressable, Text } from 'react-native';
import { modalVisible, setModalVisible } from 'expo-constants';
import { StyleSheet } from 'react-native';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';


export default function ImageEditor(props) {
    const [image, setImage] = useState(props.image);
    const [modalVisible, setModalVisible] = useState(false);
    const [x, setX] = useState('600');
    const [y, setY] = useState('800');

    // Save the image to the device's media library
    function saveImage() {
        MediaLibrary.saveToLibraryAsync(image);
        alert('Image saved to gallery');
        props.reset();
    }

    // Resize the image with the provided x/y dimensions
    async function resize() {
        const manipResult = await manipulateAsync(
            image,
            [{ resize: { width: Number(x), height: Number(y) } }],
            { compress: 1, format: SaveFormat.JPEG }
        );
        setImage(manipResult.uri);
        setModalVisible(false);
    }

    // Flip the image horizontally
    async function flip() {
        const manipResult = await manipulateAsync(
            image,
            [{ flip: FlipType.Horizontal }],
            { compress: 1, format: SaveFormat.JPEG }
        );
        setImage(manipResult.uri);
    }

    // Rotate the image 90 degrees
    async function rotate() {
        const manipResult = await manipulateAsync(
            image,
            [{ rotate: 90 }],
            { compress: 1, format: SaveFormat.JPEG }
        );
        setImage(manipResult.uri);
    }

    return (
        <ImageBackground source={{ uri: image }} resizeMode="cover" style={styles.image}>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Resize Image</Text>
                            <View style={styles.formInput}>
                                <Text>X: </Text>
                                <TextInput placeholder="X" value={x} onChangeText={setX} />
                            </View>
                            <View style={styles.formInput}>
                                <Text>Y: </Text>
                                <TextInput placeholder="Y" value={y} onChangeText={setY} />
                            </View>
                            <View style={styles.controls}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={resize}>
                                    <Text style={styles.textStyle}>Resize</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.controls} >
                    <TouchableOpacity style={styles.button} onPress={saveImage}><MaterialIcons name="save" size={40} color="white" /></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}><MaterialIcons name="photo-size-select-large" size={40} color="white" /></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={flip}><MaterialIcons name="flip" size={40} color="white" /></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={rotate}><MaterialIcons name="rotate-left" size={40} color="white" /></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => props.reset()}><MaterialIcons name="cancel" size={40} color="white" /></TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    image: {
        flex: 1,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        justifyContent: 'flex-end',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    formInput: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },

});
