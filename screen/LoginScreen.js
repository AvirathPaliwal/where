import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import * as firebase from 'firebase';
import db from '../config.js';

export default class LoginScreen extends React.Component(){
    constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
    };
  }

  login = async(email, password) => {
    if (email && password) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (response) {
          this.props.navigation.navigate('Transaction');
        }
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert('User Does Not Exsist ');
            break;

          case 'auth/invalid-email':
            alert('This Email ID and Password is Incorrect');
            break;
        }
      }
    } else {
      alert('Please enter an Email ID and Password!');
    }
  }

   render(){
     return(
       <View>
       TextInput
            style={styles.loginBox}
            placeholder="Enter your email ID"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}/>


          <TextInput
            style={styles.loginBox}
            placeholder="Enter your password "
            secureTextEntry = {true}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}>
          </TextInput>
       </View>

      <TouchableOpacity
        style = {{height: 30, width: 100, borderwith: 2.5, margin: 10, backgroundColor: 'pink', marginTop: 20}}
        onPress = {() => {
           this.login(this.state.emailId, this.state.password)
        }}>
          <Text style = {{textAlign: 'center'}}> Login </Text>
        </TouchableOpacity>
     )
   }
}

const styles = StyleSheet.create({
  
})