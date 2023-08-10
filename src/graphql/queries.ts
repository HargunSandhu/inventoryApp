/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getInventoryItems = /* GraphQL */ `
  query GetInventoryItems($id: ID!) {
    getInventoryItems(id: $id) {
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
export const listInventoryItems = /* GraphQL */ `
  query ListInventoryItems(
    $filter: ModelInventoryItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInventoryItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncInventoryItems = /* GraphQL */ `
  query SyncInventoryItems(
    $filter: ModelInventoryItemsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncInventoryItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const logsInventoryItems = /* GraphQL */`
  query LogsInventoryItems()
`
