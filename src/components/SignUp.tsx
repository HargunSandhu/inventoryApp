import React, { useState } from "react";
import { TextInput, View, Button, StyleSheet } from 'react-native'
import { Auth } from 'aws-amplify'

interface SignUpProps {
    setSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = ({ setSignedUp }) => {
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

    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />
            <View style={styles.btn}>
                <Button
                    title="Sign Up"
                    onPress={signUp}
                />
            </View>
            <View>
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderColor: 'black',
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
    }
})

export default SignUp;