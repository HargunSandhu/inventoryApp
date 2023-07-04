import React, {useReducer, type Reducer} from 'react';
import {Auth} from 'aws-amplify';
import {View, TextInput, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeParamList} from '../navigation/home-stack';

type LoginParams = {
  email: string;
  password: string;
};

interface SignInProps extends NativeStackScreenProps<HomeParamList, 'SignIn'> {}

const SignIn = (props: SignInProps) => {
  const {navigation} = props || {};
  const [loginParams, setLoginParams] = useReducer<
    Reducer<LoginParams, Partial<LoginParams>>
  >(
    (prev, next) => {
      return {...prev, ...next};
    },
    {email: '', password: ''},
  );

  const signIn = async () => {
    try {
      const user = await Auth.signIn(loginParams.email, loginParams.password);
      console.log('sign in successful');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={loginParams.email}
        onChangeText={text => setLoginParams({email: text})}
      />
      <TextInput
        placeholder="Password"
        value={loginParams.password}
        onChangeText={text => setLoginParams({password: text})}
      />
      <View>
        <Button title="Sign In" onPress={signIn} />
      </View>
    </View>
  );
};

export default SignIn;
