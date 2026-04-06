import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Lucide } from '@react-native-vector-icons/lucide';
import { Menu, Divider, PaperProvider } from 'react-native-paper';

const Filter = () => {
    
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>All Featured</Text>
      <View style={styles.filterButtons}>
        <TouchableOpacity style={styles.chip}>
          <Text>Sort</Text>
         <Lucide name="filter" size={15} color="#000" />;
        </TouchableOpacity>
        <TouchableOpacity style={styles.chip}>
          <Text>Filter</Text>
          <Lucide name="arrow-down-up" size={15} color="#000" />;
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
      sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterButtons: {
    flexDirection: 'row',
  },
  chip: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#EEE',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
