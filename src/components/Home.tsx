import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AutocompleteInput from 'react-native-autocomplete-input';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';


import { listInventoryItems } from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import { type ListInventoryItemsQuery, type InventoryItems, CreateInventoryItemsMutation, DeleteInventoryItemsMutation, UpdateInventoryItemsMutation, CreateInventoryItemsInput } from '../API';
import { API, Auth } from 'aws-amplify';
import { type GraphQLQuery } from '@aws-amplify/api';
import SignUp from './SignUp';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeParamList } from '../navigation/home-stack';
 
interface InventoryItem {
    id: string;
    name: string;
    totalQuantity: number;
    enteredQuantity: number;
}


interface Props extends NativeStackScreenProps<HomeParamList, 'Home'> {}

const Home = (props: Props) => {
    const { navigation } = props
    const [inventory, setInventory] = useState<Array<any>>([]);
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [signedIn, setSignedIn] = useState(false)

    const [selectedItem, setSelectedItem] = useState(null);



    useEffect(() => {
        const fetchItems = async () => {
            const response = await API.graphql<GraphQLQuery<ListInventoryItemsQuery>>(
                { query: listInventoryItems },
            );
            if (response.data?.listInventoryItems) {
                setInventory(response?.data?.listInventoryItems?.items);
            }
        };
        fetchItems();
    }, []);
    const item: CreateInventoryItemsInput = {
        name: itemName,
        totalQuantity: parseInt(itemQuantity),
    }
    const createItems = async () => {
        const response = await API.graphql<GraphQLQuery<CreateInventoryItemsMutation>>(
            {
                query: mutations.createInventoryItems,
                variables: { input: item }
            }
        );
    }
    const deleteItem = async () => {
        const response = await API.graphql<GraphQLQuery<DeleteInventoryItemsMutation>>(
            {
                query: mutations.createInventoryItems,
                variables: { input: item }
            }
        )
    }
    const updateItems = async () => {
        const response = await API.graphql<GraphQLQuery<UpdateInventoryItemsMutation>>(
            {
                query: mutations.createInventoryItems,
                variables: { input: item }
            }
        )
    }

    const newItem: InventoryItem = {
        id: new Date().getTime().toString(),
        name: itemName,
        totalQuantity: parseInt(itemQuantity),
        enteredQuantity: parseInt(itemQuantity),
    };
    const handleAddItem = () => {
        if (itemName.trim() !== '' && itemQuantity.trim() !== '') {


            createItems()

            const existingItemIndex = inventory.findIndex(item => item.name === itemName);
            if (existingItemIndex !== -1) {
                const updatedInventory = [...inventory];
                updatedInventory[existingItemIndex].totalQuantity += newItem.totalQuantity;
                updatedInventory[existingItemIndex].enteredQuantity += newItem.enteredQuantity;
                setInventory(updatedInventory);
            } else {
                setInventory(prevInventory => [...prevInventory, newItem]);
            }

            setItemName('');
            setItemQuantity('');

        }
    };

    const handleRemoveItem = () => {
        const existingItemIndex = inventory.findIndex(item => item.name === itemName);
        if (existingItemIndex !== -1) {
            const updatedInventory = [...inventory];
            updatedInventory[existingItemIndex].totalQuantity -= parseInt(itemQuantity);
            updatedInventory[existingItemIndex].enteredQuantity -= parseInt(itemQuantity);
            setInventory(updatedInventory);
        }

        setItemName('');
        setItemQuantity('');
    };

    const handleClearItems = () => {
        deleteItem()
        setInventory([]);
    };
    console.log(inventory.map(item => item.name))
    const data = inventory.map((item) => ({ id: item.name, title: item.name }))
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Inventory App</Text>
            {/* <TextInput
                placeholder="Enter the Item Name..."
                style={styles.input}
                value={itemName}
                onChangeText={text => setItemName(text)}
            /> */}
            <AutocompleteDropdown
                dataSet={data}
                // style={styles.input}
                // value={itemName}
                textInputProps={
                    {
                        placeholder: 'Enter the Item Name'
                    }
                }
                onChangeText={text => setItemName(text)}
            />

            <TextInput
                placeholder="Enter the Quantity of Item..."
                keyboardType="numeric"
                style={styles.input}
                value={itemQuantity}
                onChangeText={text => setItemQuantity(text)}
            />

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title="Add" onPress={handleAddItem} />
                </View>
                <View style={styles.button}>
                    <Button title="Remove" onPress={handleRemoveItem} />
                </View>
                <View style={styles.button}>
                    <Button title="Clear" onPress={handleClearItems} />
                </View>
            </View>

            <Text style={styles.heading}>Stock Left:</Text>

            <View style={styles.listContainer}>
                <FlatList
                    data={inventory}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.stock}>
                                {item.name} - Quantity: {item.totalQuantity}
                            </Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 10,
        padding: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        marginRight: 10,
    },
    listContainer: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    stock: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Home;