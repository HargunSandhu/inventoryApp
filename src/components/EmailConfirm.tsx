import React, { useState } from 'react';
import { SafeAreaView, Button, TextInput, StyleSheet, View } from 'react-native';
import { Auth } from 'aws-amplify';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeParamList } from '../navigation/home-stack';

interface Props extends NativeStackScreenProps<HomeParamList, 'EmailConfirm'> { }

type SignUpParams = {
    email: string;
    code: string;
};

const EmailConfirm = (props: Props) => {
    const { navigation, route } = props;
    
    const [confirmParams, setConfirmParams] = useState<SignUpParams>({
        email: route.params?.email,
        code: '',
    });

    const confirmEmail = async () => {
        try {
            const user = await Auth.confirmSignUp(
                confirmParams.email,
                confirmParams.code,
            );
            user && navigation.navigate('Home');
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    };

    const handleCodeChange = (code: string) => {
        setConfirmParams({ ...confirmParams, code });
    };

    return (
        <SafeAreaView>
            <TextInput
                placeholder="Enter the Code..."
                style={styles.input}
                onChangeText={handleCodeChange}
            />
            <View style={styles.btn}>
                <Button title="Confirm Email" onPress={confirmEmail} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
});

export default EmailConfirm;
