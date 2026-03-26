import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const NoData = ({ onClear }) => {
  return (
    <View style={styles.container}>
      <View style={styles.page}>
        <View style={styles.Imagecontainer}>
          <Image
            source={require('../assets/nodata.jpg')}
            style={{ width: 250, height: 200, padding: 10 }}
          />
        </View>
        <Text style={styles.text}>No Data found</Text>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity style={styles.button} onPress={onClear}> 
            <Text style={styles.buttontext}>Clear parameters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
    text:{
        fontSize:15,
        padding:10,
        textAlign:'center',
    },
    container:{
       flex:1,
       alignItems:'center',
       justifyContent:'center',
       backgroundColor:'white',
    },
    button:{
      borderWidth:1,
      borderColor:'#509de5',
      borderRadius:20,
      backgroundColor:'#509de5',
      width:130

    },
    buttontext:{
      padding:6,
      paddingLeft:10,
      color:'white',
    },
    page:{
      flex:1,
      marginBottom:100,
      alignItems:'center',
      justifyContent:'center',
    },
    buttoncontainer:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    }
});