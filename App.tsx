import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from "react-native";

import ProductsScreen from './src/components/products/ProductsScreen';

import GlobalState from './src/context/GlobalState';

const App = () => {
  return (
    <GlobalState>
      <SafeAreaProvider>
        <ProductsScreen />
      </SafeAreaProvider>
    </GlobalState>
  );
};

export default App;