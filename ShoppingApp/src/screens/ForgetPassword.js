import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { fontsizes, Color } from '../styles/index.js';
import Icon from 'react-native-vector-icons/Ionicons';

const ForgetPassword = () => {
  return (
     <View style={styles.container}>
             <Text style={styles.title}>Forgot{'\n'}Password{"?"}</Text>
       
             <View>
               <View style={styles.inputContainer}>
                 <Icon name="mail" size={20} color="#626262" style={styles.icon} />
                 <TextInput
                   style={styles.input}
                   placeholder="Enter your email address"
                   placeholderTextColor="#626262"
                 />
               </View>
               
               <View style={styles.forgot}>
                 <TouchableOpacity style={styles.forgotcontainer}>
                   <Text style={styles.forgotText}>{'*'}We will send you a message to set or reset your new password</Text>
                 </TouchableOpacity>
               </View>
             </View>
       
             <View style={styles.buttonContainer}>
               <TouchableOpacity style={styles.button}>
                 <Text style={styles.buttontitle}>Submit</Text>
               </TouchableOpacity>
             </View>
       
             <View></View>
           </View>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({
    container: {
    flex: 1,
    //justifyContent: 'center'
  },
  title: {
    fontWeight: '700',
    fontSize: fontsizes.l,
    top: 63,
    left: 32,
    width: 185,
    height: 83,
  },
  inputContainer: {
    top: 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A8A8A9',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 45,
    width: 310,
    marginLeft: 25,
    backgroundColor: '#e4e4e4',
    marginBottom: 20,
  },
  icon: {
    marginRight: 20,
  },
  input: {
    flex: 1,
    height: '100%',
    padding: 0,
    fontSize: 11,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 150,
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: Color.buttoncolor,
    borderColor: Color.buttoncolor,
    //width:130,
    height: 40,
    width: 290,
  },
  buttontitle: {
    padding: 8,
    paddingLeft: 120,
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  forgot: {
    top: 100,
    
  },
  forgotText: {
    color:'#575757',
    fontSize: 13,
    fontWeight:'400',
    paddingLeft:30,
  },
})