import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import ProductCard from '../components/ProductCard';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example products data - replace with your API call
    const dummyProducts = [
      { id: '1', name: 'Product 1', price: '29.99', image: 'url1' },
      { id: '2', name: 'Product 2', price: '39.99', image: 'url2' },
      { id: '3', name: 'Product 3', price: '49.99', image: 'url3' },
    ];
    
    setProducts(dummyProducts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}); 