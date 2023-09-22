import React, { useState } from 'react';
import { SafeAreaView, Button, TextInput, StyleSheet, View, Text } from 'react-native';
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
            user && navigation.navigate('SignIn');
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    };

    const handleCodeChange = (code: string) => {
        setConfirmParams({ ...confirmParams, code });
    };

    return (
        <SafeAreaView>
            <View>
                <Text style={styles.head}>Verify Email:</Text>
            </View>
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
    head: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    }
});

export default EmailConfirm;
