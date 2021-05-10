import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet,Image } from 'react-native'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'

export default class Scanner extends Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermission: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }
    BarCodeScanner = async ({ type, data }) => {
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        })
        this.setState({
            hasCameraPermission: status === "granted",
            scanned: false,
            buttonState: 'clicked'
        })
    }
    takeCameraPerissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission: status === "granted",
            scanned: false,
            buttonState: 'clicked'
        })
    }
    render() {
        const hasCameraPermission = this.state.hasCameraPermission
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState
        if (buttonState === 'clicked' && hasCameraPermission) {
            return (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.BarCodeScanner}
                    style={StyleSheet.absoluteFillObject} />
            )
        }
        else if (buttonState === 'normal') {
            return (
                <View style={styles.container}>
                    <Text style={styles.displayText}>
                        {
                            hasCameraPermission === true ? this.state.scannedData :
                                "request camera permission"
                        }
                    </Text>
                    <TouchableOpacity onPress={this.takeCameraPerissions}>
                        <Text>
                            Scan QR code
                        </Text>
                    </TouchableOpacity>
                    <Text>
                        Transaction Screen
              </Text>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    displayText: {
        fontSize: 15,
        textDecorationLine: 'underline',
        marginTop:1
    },
    scanButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
    },
    buttonText: {
        fontSize: 20,
    },
    imageIcon: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: 100
      },
});
