import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';

import {createItem, updateItem, deleteItem, getAllItems} from ''

interface Home {
  id: string;
  name: string;
  quantity: number;
}

const HomeScreen = () => {
  const [inventory, setInventory] = useState<Home[]>([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const result = await API.graphql(graphqlOperation(getAllItems));
      const items = result.data.getAllItems;
      setInventory(items);
    } catch (error) {
      console.log('Error fetching items', error);
    }
  };

const handleAddItem = async () => {
  if (itemName.trim() !== '' && itemQuantity.trim() !== '') {
    try {
      const result = await API.graphql(
        graphqlOperation(createItem, {
          name: itemName,
          quantity: parseInt(itemQuantity),
        }),
      );
      const newItem = result.data.createItem;
      setItemName('');
      setItemQuantity('');
      fetchItems();
    } catch (error) {
      console.log('Error adding item', error);
    }
  }
};


  const handleRemoveItem = async (id: string) => {
    try {
      const existingItem = inventory.find(item => item.id === id);

      if (existingItem) {
        const updatedQuantity = existingItem.quantity - parseInt(itemQuantity);
        if (updatedQuantity > 0) {
          await API.graphql(
            graphqlOperation(updateItem, {
              input: {
                id,
                quantity: updatedQuantity,
              },
            }),
          );
        } else {
          await API.graphql(
            graphqlOperation(deleteItem, {
              input: {
                id,
              },
            }),
          );
        }
        fetchItems();
      }
    } catch (error) {
      console.log('Error removing item', error);
    }
  };

const handleClearItems = async () => {
  try {
    for (const item of inventory) {
      await API.graphql(
        graphqlOperation(deleteItem, {
          input: {
            id: item.id,
          },
        }),
      );
    }
    fetchItems();
  } catch (error) {
    console.log('Error clearing items', error);
  }
};


  return (
    <View>
      <Text style={styles.heading}>Inventory App</Text>
      <TextInput
        placeholder="Enter the Item Name..."
        style={styles.input}
        value={itemName}
        onChangeText={text => setItemName(text)}
      />
      <TextInput
        placeholder="Enter the Quantity of Item..."
        keyboardType="numeric"
        style={styles.input}
        value={itemQuantity}
        onChangeText={text => setItemQuantity(text)}
      />
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.custom}>
            <Button title="Add" onPress={handleAddItem} />
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.custom}>
            <Button title="Remove" onPress={() => handleRemoveItem(item.id)} />
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.custom}>
            <Button title="Clear" onPress={handleClearItems} />
          </View>
        </View>
      </View>
      <Text style={styles.heading}>Stock Left:</Text>
      <View>
        <FlatList
          data={inventory}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Text style={styles.stock}>
              {item.name} - Quantity: {item.quantity}
            </Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  custom: {
    borderRadius: 8,
    marginTop: 5,
  },
  heading: {
    fontSize: 50,
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
  },
  container: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  main: {
    margin: 20,
  },
  stock: {
    fontSize: 25,
    fontWeight: '300',
  },
});

export default HomeScreen;
