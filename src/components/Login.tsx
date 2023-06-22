import React, {useState} from "react";
import { Auth } from 'aws-amplify';
import { View, TextInput, Button } from "react-native";

const Login = () => {
    const [signedUp, setSignedUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = async () => {
        try {
            const { user } = await Auth.signUp({
                username: email,
                password,
            });
            console.log('Sign up successful', user);
            setSignedUp(true);
        } catch (error) {
            console.log('Error signing up', error);
        }
    };
    return (<>
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Sign Up" onPress={signUp} />
        </View>
    </>)
}

export default Login;