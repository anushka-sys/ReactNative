import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Lucide } from '@react-native-vector-icons/lucide';
import { Menu } from 'react-native-paper';

const Filter = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onSelect = category => {
    console.log('Selected:', category);
    closeMenu();
  };

  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>All Featured</Text>

      <View style={styles.filterButtons}>
    
        <TouchableOpacity style={styles.chip}>
          <Text>Sort</Text>
          <Lucide name="arrow-down-up" size={15} color="#000" />
        </TouchableOpacity>

        
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity style={styles.chip} onPress={openMenu}>
              <Text>Filter</Text>
              <Lucide name="filter" size={15} color="#000" />
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => onSelect('Mens')} title="Mens" />
          <Menu.Item onPress={() => onSelect('Women')} title="Women" />
          <Menu.Item onPress={() => onSelect('Jewellery')} title="Jewellery" />
          <Menu.Item onPress={() => onSelect('Kids')} title="Kids" />
        </Menu>
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
    gap: 5,
  },
});
