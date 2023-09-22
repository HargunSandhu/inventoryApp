import React, {useReducer, type Reducer} from 'react';
import {Auth} from 'aws-amplify';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
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
      user && navigation.navigate('Home')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View>
        <Text style={styles.head}>Sign In:</Text>
      </View>
      <TextInput
        placeholder="Email"
        value={loginParams.email}
        onChangeText={text => setLoginParams({ email: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={loginParams.password}
        onChangeText={text => setLoginParams({ password: text })}
        style={styles.input}
      />
      <View style={styles.btn}>
        <Button title="Sign In" onPress={signIn}  />
      </View>
      <View style={styles.btn}>
        <Button title='SignUp' onPress={() => navigation.navigate("SignUp")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  btn: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  head: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  }

})

export default SignIn;
