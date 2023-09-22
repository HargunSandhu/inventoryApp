import React, {useState} from 'react';
import {
  TextInput,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import {Auth} from 'aws-amplify';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeParamList} from '../navigation/home-stack';

type SignUpProps = NativeStackScreenProps<HomeParamList, 'SignUp'> & {};

// navigation.navigate('SignUp', { setSignedUp: setSignedUp })

type SignUpParams = {
  email: string;
  password: string;
};

const SignUp = ({route, navigation}: SignUpProps) => {
  const setSignedUp = route.params?.setSignedUp;
  const [signUpParams, setSignUpParams] = useState<SignUpParams>({
    email: '',
    password: '',
  });

  const signUp = async () => {
    try {
      const {user} = await Auth.signUp({
        username: signUpParams.email,
        password: signUpParams.password,
        autoSignIn: {
          enabled: true,
        },
      });
      console.log('Sign up successful', user);
      user && navigation.navigate('EmailConfirm', {email: signUpParams.email});
      setSignedUp && setSignedUp(true);
    } catch (error) {
      console.log('  signing up', error);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.head}>Sign Up:</Text>
      </View>
      <TextInput
        placeholder="Email"
        value={signUpParams.email}
        onChangeText={text => setSignUpParams(prev => ({...prev, email: text}))}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={signUpParams.password}
        onChangeText={text =>
          setSignUpParams(prev => ({...prev, password: text}))
        }
        style={styles.input}
      />
      <View style={styles.btn}>
        <Button title="Sign Up" onPress={signUp} />
      </View>
      <View style={styles.signIn}>
        <Button
          title="Sign In"
          onPress={() => navigation.navigate('SignIn')}></Button>
      </View>
    </SafeAreaView>
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
  signIn: {
    marginLeft: 10,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
  },
  head: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
},
});

export default SignUp;
