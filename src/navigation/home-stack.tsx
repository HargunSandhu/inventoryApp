import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../components/Home';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import EmailConfirm from '../components/EmailConfirm';

export type HomeParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: {
    setSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
};
  EmailConfirm: { email: string };
};

const Stack = createNativeStackNavigator<HomeParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignIn">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name='EmailConfirm' component={EmailConfirm} />
    </Stack.Navigator>
  );
};

export default HomeStack;
