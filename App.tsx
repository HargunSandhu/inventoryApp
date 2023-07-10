import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './src/navigation/home-stack';
import SignUp from './src/navigation/home-stack';
import EmailConfirm from './src/components/EmailConfirm';
  
const App = () => {
  return (
    <NavigationContainer>
      <SignUp />
    </NavigationContainer>
  );
};

export default App;
