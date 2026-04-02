import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'

const list = () => {
  return (
    <View>
    <FlatList
            data={users}
            keyExtractor={item => item.id}
            numColumns={2} 
            renderItem={({ item }) => (
              <View key={item.id} style={styles.productCard}>
                <Image source={{ uri: 'item.avatar' }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle} >
                    {item.title}
                  </Text>
                  <Text style={styles.productDesc} >
                    {item.description}
                  </Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                  <Text style={styles.productRating}> ⭐ {item.rating} ({item.reviews}) </Text>
                </View>
              </View>
            )}
          />
    </View>
  )
}

export default list

const styles = StyleSheet.create({
    
})