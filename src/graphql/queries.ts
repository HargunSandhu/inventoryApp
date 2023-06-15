/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getInventoryItems = /* GraphQL */ `
  query GetInventoryItems($id: ID!) {
    getInventoryItems(id: $id) {
      id
      name
      stock
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        stock
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        stock
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
