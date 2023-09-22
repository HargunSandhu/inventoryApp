import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';

import AutocompleteInput from 'react-native-autocomplete-input';

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';

import {
  type ListInventoryItemsQuery,
  type InventoryItems,
  CreateInventoryItemsMutation,
  DeleteInventoryItemsMutation,
  UpdateInventoryItemsMutation,
  CreateInventoryItemsInput,
  UpdateInventoryItemsInput,
  DeleteInventoryItemsInput,
} from '../API';
import { API, Auth, DataStore } from 'aws-amplify';
import { graphqlOperation, type GraphQLQuery } from '@aws-amplify/api';
import SignUp from './SignUp';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeParamList } from '../navigation/home-stack';

interface InventoryItem {
  id: string;
  name: string;
  totalQuantity: number;
  enteredQuantity: number;
}

interface Props extends NativeStackScreenProps<HomeParamList, 'Home'> { }

const Home = (props: Props) => {
  const { navigation } = props;
  const [inventory, setInventory] = useState<Array<any>>([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [signedIn, setSignedIn] = useState(false);

  const [selectedItem, setSelectedItem] = useState('');

  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateModalItem, setUpdateModalItem] = useState<InventoryItem | null>(null);
  const [updateItemName, setUpdateItemName] = useState('');
  const [updateItemQuantity, setUpdateItemQuantity] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const response = await API.graphql<GraphQLQuery<ListInventoryItemsQuery>>(
        { query: queries.listInventoryItems },
      );
      if (response.data?.listInventoryItems) {
        setInventory(response?.data?.listInventoryItems?.items);
      }
      // console.log({ items: response.data?.listInventoryItems?.items })
    };
    fetchItems();
  }, []);

  const createItems = async () => {
    const item: CreateInventoryItemsInput = {
      name: itemName,
      totalQuantity: parseInt(itemQuantity),
    };

    const response = await API.graphql<
      GraphQLQuery<CreateInventoryItemsMutation>
    >({
      query: mutations.createInventoryItems,
      variables: { input: item },
    });

    setInventory([...inventory, response.data?.createInventoryItems]);
  };

  const updateItems = async (itemId: string) => {
    // Check if both name and quantity are provided
    if (updateItemName.trim() !== '' && updateItemQuantity.trim() !== '') {
      const updatedItem: UpdateInventoryItemsInput = {
        id: itemId, // Use the itemId passed as an argument
        name: updateItemName, // Use updateItemName instead of itemName
        totalQuantity: parseInt(updateItemQuantity),
      };
      try {
        const response = await API.graphql<
          GraphQLQuery<UpdateInventoryItemsMutation>
        >({
          query: mutations.updateInventoryItems,
          variables: { input: updatedItem },
        });

        if (response.data?.updateInventoryItems) {
          const updatedInventory = inventory.map((item) =>
            item.id === updatedItem.id ? response.data?.updateInventoryItems : item
          );
          setInventory(updatedInventory);
          console.log(updatedInventory)
        }
        setUpdateItemName('');
        setUpdateItemQuantity('');
        setUpdateModalVisible(false);
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
  };


  // console.log(inventory)
  
  const handleAddItem = () => {
    if (itemName.trim() !== '' && itemQuantity.trim() !== '') {
      const existingItemIndex = inventory.findIndex(
        item => item.name === itemName,
      );

      if (existingItemIndex !== -1) {
        // updateItems()
      } else {
        createItems();
      }

      setItemName('');
      setItemQuantity('');
    }
  };

  const handleRemoveItem = () => {
    const existingItemIndex = inventory.findIndex(
      item => item.name === itemName,
    );
    if (existingItemIndex !== -1) {
      const updatedInventory = [...inventory];
      updatedInventory[existingItemIndex].totalQuantity -=
        parseInt(itemQuantity);
      updatedInventory[existingItemIndex].enteredQuantity -=
        parseInt(itemQuantity);
      setInventory(updatedInventory);
    }
    setItemName('');
    setItemQuantity('');
  };

  const handleClearItems = () => {
  };

  // console.log(inventory)

  const data = inventory.map(item => item.name);
  const filteredData = data.filter(item => item.includes(itemName));
  
  const handleOpenUpdateModal = (item: InventoryItem) => {
    setUpdateModalItem(item);
    setUpdateItemName(item.name);
    setUpdateItemQuantity(item.totalQuantity.toString());
    setUpdateModalVisible(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalItem(null);
    setUpdateItemName('');
    setUpdateItemQuantity('');
    setUpdateModalVisible(false);
  };

  const handleDeleteItem = async (itemId: string, version: number,) => {
    const item: DeleteInventoryItemsInput = {
      id: itemId,
      _version: version,
    };

    try {
      const response = await API.graphql<
        GraphQLQuery<DeleteInventoryItemsMutation>
      >({
        query: mutations.deleteInventoryItems,
        variables: { input: item },
      });

      if (response.data?.deleteInventoryItems) {
        const updatedInventory = inventory.filter(item => item.id !== itemId);
        setInventory(updatedInventory);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Inventory App</Text>

      <View style={styles.itemContainer}>
        <AutocompleteInput
          inputContainerStyle={styles.input}
          data={filteredData}
          value={itemName}
          onChangeText={text => setItemName(text)}
          placeholder="Enter the Item Name..."
          flatListProps={{
            renderItem: ({ item }) => (
              <TouchableOpacity onPress={() => setItemName(item)}>
                <Text>{item}</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </View>
      <View style={styles.c2}>
        <TextInput
          placeholder="Enter the Quantity of Item..."
          style={styles.input}
          keyboardType="numeric"
          value={itemQuantity}
          onChangeText={text => setItemQuantity(text)}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add" onPress={handleAddItem} />
          </View>
          <View style={styles.button}>
            <Button title="Clear" onPress={handleClearItems} />
          </View>
        </View>

        <Text style={styles.heading}>Stock Left:</Text>

        <FlatList
          data={inventory}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.stockItem}>
                <Text style={styles.stock}>
                  {item.name} - Quantity: {item.totalQuantity}
                </Text>
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonList}>
                    <Button title="Update" onPress={() => handleOpenUpdateModal(item)} />
                  </View>
                  <View style={styles.buttonList}>
                    <Button title="🗑️" onPress={() => handleDeleteItem(item.id, item._version)}/>
                  </View>
                </View>
              </View>
            );
          }}
        />

      </View>

      <Modal visible={updateModalVisible} animationType='slide'>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Update Item</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Enter updated item name..."
            value={updateItemName}
            onChangeText={text => setUpdateItemName(text)}
          />

          <TextInput
            style={styles.modalInput}
            placeholder="Enter updated item quantity..."
            keyboardType="numeric"
            value={updateItemQuantity}
            onChangeText={text => setUpdateItemQuantity(text)}
          />

          <View style={styles.modalBtn}>
            <Button
              title="Confirm Update"
              onPress={() => {
                console.log("Confirm Update button clicked");
                console.log("updateItemName:", updateItemName);
                console.log("updateItemQuantity:", updateItemQuantity);
                console.log(updateModalItem?.id)
                updateItems(updateModalItem?.id || '');
              }}
            />
          </View>
          <View style={styles.modalBtn}>
            <Button title="Cancel" onPress={handleCloseUpdateModal} />
          </View>
        </View>
      </Modal>


    </View>

    
  );
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
    padding: 10,
    borderRadius: 5,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  listContainer: {
    flex: 1,
    marginBottom: 20,
  },
  stock: {
    fontSize: 18,
  },
  itemContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 1,
    top: 80,
  },
  c2: {
    position: 'relative',
    top: 70,
  },
  hrow: {
    flexDirection: 'row'
  },
  buttonList: {
    width: 70,
    marginLeft: 5,
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)', 
  },


  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },


  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },


  modalInput: {
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,
    width: '75%',
  },
  modalBtn: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  }
});

export default Home;
