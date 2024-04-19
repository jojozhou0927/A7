/*
 * StAuth10244: I Zhongwen Zhou, 904509 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
 */

import React, { useState } from "react";
import {
  ImageBackground,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, Pressable, Text } from "react-native";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";

const styles = require("./styles");

export default function ImageEditor(props) {
  const [image, setImage] = useState(props.image);
  const [modalVisible, setModalVisible] = useState(false);
  const [x, setX] = useState(String(props.image.width));
  const [y, setY] = useState(String(props.image.height));

  // Save the image to the device's media library
  function saveImage() {
    MediaLibrary.saveToLibraryAsync(image.uri);
    alert("Image saved to gallery");
    props.reset();
  }

  // Resize the image with the provided x/y dimensions
  async function resize() {
    const manipResult = await manipulateAsync(
      image.uri,
      [{ resize: { width: Number(x), height: Number(y) } }],
      { compress: 1, format: SaveFormat.JPEG }
    );
    setImage(manipResult);
    setModalVisible(false);
  }

  // Flip the image horizontally
  async function flip() {
    const manipResult = await manipulateAsync(
      image.uri,
      [{ flip: FlipType.Horizontal }],
      { compress: 1, format: SaveFormat.JPEG }
    );
    setImage(manipResult);
  }

  // Rotate the image 90 degrees
  async function rotate() {
    const manipResult = await manipulateAsync(image.uri, [{ rotate: 90 }], {
      compress: 1,
      format: SaveFormat.JPEG,
    });
    setImage(manipResult);
  }

  return (
    <ImageBackground
      source={{ uri: image.uri }}
      resizeMode="contain"
      style={styles.image}
    >
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
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
                  onPress={resize}
                >
                  <Text style={styles.textStyle}>Resize</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={saveImage}>
            <MaterialIcons name="save" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <MaterialIcons
              name="photo-size-select-large"
              size={40}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={flip}>
            <MaterialIcons name="flip" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={rotate}>
            <MaterialIcons name="rotate-left" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => props.reset()}>
            <MaterialIcons name="cancel" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
