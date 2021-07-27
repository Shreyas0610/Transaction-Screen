import { StatusBar } from 'expo-status-bar';
import react from 'react';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BookTransaction extends React.Component {
    constructor() {
        super()
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
            scannedStudentID: '',
            scannedBookID: '',
        }
    }

    getCameraPermission = async (ID) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions: status == 'granted',
            buttonState: ID,
            scanned: false,
        })
    }

    handleBarCodeScanned = async ({ type, data }) => {
        const { buttonState } = this.state
        if (buttonState === 'BookID') {
            this.setState({
                scanned: true,
                scannedBookID: data,
                buttonState: 'normal'
            })
        }
        else if (buttonState === 'StudentID') {
            this.setState({
                scanned: true,
                scannedStudentID: data,
                buttonState: 'normal'
            })
        }
    }

    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState
        if (buttonState !== 'normal' && hasCameraPermissions) {
            return (
                <BarCodeScanner
                    style={StyleSheet.absoluteFillObject}
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                />
            )
        }
        else if (buttonState === 'normal') {
            return (
                <View style={styles.container}>
                    <View>
                        <Image
                            source={require('../assets/booklogo.jpg')}
                            style={{ width: 200, height: 200 }}
                        />
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            Library App
                        </Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputBox}
                            placeholder='Student ID'
                            value={this.state.scannedStudentID}
                        />
                        <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermission("StudentID")}>
                            <Text style={styles.buttonText}> Scan </Text>
                        </TouchableOpacity>
                        </View>
                        <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputBox}
                            placeholder='Book ID'
                            value={this.state.scannedBookID}
                        />
                        <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermission("BookID")}>
                            <Text style={styles.buttonText}> Scan </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({ 
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' }, 
    displayText:{ fontSize: 15, textDecorationLine: 'underline' }, 
    scanButton:{ backgroundColor: '#2196F3', padding: 10, margin: 10 }, 
    buttonText:{ fontSize: 15, textAlign: 'center', marginTop: 10 }, 
    inputView:{ flexDirection: 'row', margin: 20 }, 
    inputBox:{ width: 200, height: 40, borderWidth: 1.5,  borderRightWidth: 0, fontSize: 20 }, 
    scanButton:{ backgroundColor: '#66BB6A', width: 50, borderWidth: 1.5, borderLeftWidth: 0 } });
