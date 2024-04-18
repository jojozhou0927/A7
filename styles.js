
/* 
 * StAuth10244: I Zhongwen Zhou, 904509 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
 */

'use strict';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
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
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
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
        backgroundColor: 'black',
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
  