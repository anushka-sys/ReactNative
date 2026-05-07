import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect,useContext } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { Menu } from 'react-native-paper';
import { spacing,fontSizes } from '../styles';
import {ThemeContext} from '../context/ThemeContext';

const Filter = ({ onSelectCategory, onSelectSort, resetKey }) => {
  const [visible, setVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const { theme } = useContext(ThemeContext);
  
     const styles = getStyles(theme);

  //  resetkey
  useEffect(() => {
    if (resetKey > 0) {
      onSelectCategory('All');
      onSelectSort(null);
    }
  }, [resetKey]);


  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  
  const openSortMenu = () => setSortVisible(true);
  const closeSortMenu = () => setSortVisible(false);

  
  const onSelect = category => {
    onSelectCategory(category);
    closeMenu();
  };

  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>All Featured</Text>

      <View style={styles.filterButtons}>
        <Menu
          visible={sortVisible}
          onDismiss={closeSortMenu}
          anchor={
            <TouchableOpacity style={styles.sortChip} onPress={openSortMenu}>
              <Text style={styles.chipText}>Sort</Text>
              <IconFA
                name="exchange"
                size={14}
                
                style={styles.exchange}
              />
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => { onSelectSort('low'); closeSortMenu(); }} title="Price: Low to High" />
          <Menu.Item onPress={() => { onSelectSort('high'); closeSortMenu(); }} title="Price: High to Low" />
        </Menu>

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity style={styles.filterChip} onPress={openMenu}>
              <Text style={styles.chipText}>Filter</Text>
              <Icon name="filter" size={14}  style={styles.filter}/>
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => onSelect('All')} title="All" />
          <Menu.Item onPress={() => onSelect("men's clothing")} title="Mens" />
          <Menu.Item onPress={() => onSelect("women's clothing")} title="Women" />
          <Menu.Item onPress={() => onSelect('jewelery')} title="Jewellery" />
          <Menu.Item onPress={() => onSelect('electronics')} title="Electronics" />
        </Menu>
      </View>
    </View>
  );
};

export default Filter;

const getStyles = (theme) => StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['4xl'],
    paddingTop: spacing['4xl'],
  },
  sectionTitle: {
    fontSize: fontSizes['3xl'],
    fontWeight: '700',
    color: theme.textPrimary,
  },
  filterButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  sortChip: {
    height: 24,
    paddingVertical: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: theme.backgroundMuted,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  filterChip: {
    height: 24,
    paddingVertical: 4,
    paddingLeft: 12,
    paddingRight: 18,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: theme.backgroundMuted,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  filter:{
    color:theme.textPrimary,
  },
  exchange:{
     transform: [{ rotate: '90deg' }] ,
     color:theme.textPrimary,
  }
});