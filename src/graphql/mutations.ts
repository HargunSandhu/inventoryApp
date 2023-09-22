/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createInventoryItems = /* GraphQL */ `
  mutation CreateInventoryItems(
    $input: CreateInventoryItemsInput!
    $condition: ModelInventoryItemsConditionInput
  ) {
    createInventoryItems(input: $input, condition: $condition) {
      id
      name
      totalQuantity
      enteredQuantity
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateInventoryItems = /* GraphQL */ `
  mutation UpdateInventoryItems(
    $input: UpdateInventoryItemsInput!
    $condition: ModelInventoryItemsConditionInput
  ) {
    updateInventoryItems(input: $input, condition: $condition) {
      id
      name
      totalQuantity
      enteredQuantity
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteInventoryItems = /* GraphQL */ `
  mutation DeleteInventoryItems(
    $input: DeleteInventoryItemsInput!
    $condition: ModelInventoryItemsConditionInput
  ) {
    deleteInventoryItems(input: $input, condition: $condition) {
      id
      name
      totalQuantity
      enteredQuantity
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

