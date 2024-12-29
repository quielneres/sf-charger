import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import firebase from '@react-native-firebase/app';

const App = () => {
  useEffect(() => {
    console.log("Firebase initialized:", firebase.apps.length > 0);
  }, []);

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Testing Firebase</Text>
      </View>
  );
};

export default App;
