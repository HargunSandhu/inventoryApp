import React, { useState } from 'react'
import { SafeAreaView, Button, TextInput, StyleSheet, View } from 'react-native';
import { Auth } from 'aws-amplify';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeParamList } from '../navigation/home-stack';

interface Props extends NativeStackScreenProps<HomeParamList, 'EmailConfirm'> { }


type SignUpParams = {
    email: string;
    code: string;
};


const EmailConfirm = () => {
    const [verificationCode, setVerificationCode] = useState('')
  const [confirmParams, setConfirmParams] = useState<SignUpParams>({email: '', code: ''});


    const confirmEmail = async (props: Props) => {
        try {
            await Auth.confirmSignUp(confirmParams.email, confirmParams.code);
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    };

    return (
        <SafeAreaView>
            <TextInput
                placeholder='Enter the Code...'
                style={styles.input}
                onChangeText={() => { }}
            />
            <View style={styles.btn}>
                <Button title='Confirm Email'></Button>
            </View>
        </SafeAreaView>
    )
}

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

export default EmailConfirm;