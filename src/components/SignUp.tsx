import React, { useState } from "react";
import { TextInput, View, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { Auth } from 'aws-amplify'
import { Text } from "react-native";
// import { useNavigation } from '@react-navigation/native';

interface SignUpProps {
    setSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = ({ setSignedUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const navigation = useNavigation();

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
            <View style={styles.signIn}>
                <Text
                    // onPress={() => navigation.navigate}
                >Sign in?</Text>
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
    },
    signIn: {
        marginLeft: 10,
        marginTop: 10,
        fontWeight: "bold",
        color: 'black',
    }
})

export default SignUp;