import React, { useState } from "react";
import { Auth } from 'aws-amplify'
import { View, TextInput, Button } from "react-native";

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const signIn = async () => {
        try {
            const user = await Auth.signIn(email, password);
            console.log("sign in successful")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button
                title="Sign In"
                onPress={signIn}
            />
        </View>
    )
}

export default SignIn