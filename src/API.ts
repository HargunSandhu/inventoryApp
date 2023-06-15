/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateInventoryItemsInput = {
  id?: string | null,
  name?: string | null,
  stock?: string | null,
  _version?: number | null,
};

export type ModelInventoryItemsConditionInput = {
  name?: ModelStringInput | null,
  stock?: ModelStringInput | null,
  and?: Array< ModelInventoryItemsConditionInput | null > | null,
  or?: Array< ModelInventoryItemsConditionInput | null > | null,
  not?: ModelInventoryItemsConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type InventoryItems = {
  __typename: "InventoryItems",
  id: string,
  name?: string | null,
  stock?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateInventoryItemsInput = {
  id: string,
  name?: string | null,
  stock?: string | null,
  _version?: number | null,
};

export type DeleteInventoryItemsInput = {
  id: string,
  _version?: number | null,
};

export type ModelInventoryItemsFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  stock?: ModelStringInput | null,
  and?: Array< ModelInventoryItemsFilterInput | null > | null,
  or?: Array< ModelInventoryItemsFilterInput | null > | null,
  not?: ModelInventoryItemsFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelInventoryItemsConnection = {
  __typename: "ModelInventoryItemsConnection",
  items:  Array<InventoryItems | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSubscriptionInventoryItemsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  stock?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionInventoryItemsFilterInput | null > | null,
  or?: Array< ModelSubscriptionInventoryItemsFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateInventoryItemsMutationVariables = {
  input: CreateInventoryItemsInput,
  condition?: ModelInventoryItemsConditionInput | null,
};

export type CreateInventoryItemsMutation = {
  createInventoryItems?:  {
    __typename: "InventoryItems",
    id: string,
    name?: string | null,
    stock?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateInventoryItemsMutationVariables = {
  input: UpdateInventoryItemsInput,
  condition?: ModelInventoryItemsConditionInput | null,
};

export type UpdateInventoryItemsMutation = {
  updateInventoryItems?:  {
    __typename: "InventoryItems",
    id: string,
    name?: string | null,
    stock?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteInventoryItemsMutationVariables = {
  input: DeleteInventoryItemsInput,
  condition?: ModelInventoryItemsConditionInput | null,
};

export type DeleteInventoryItemsMutation = {
  deleteInventoryItems?:  {
    __typename: "InventoryItems",
    id: string,
    name?: string | null,
    stock?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetInventoryItemsQueryVariables = {
  id: string,
};

export type GetInventoryItemsQuery = {
  getInventoryItems?:  {
    __typename: "InventoryItems",
    id: string,
    name?: string | null,
    stock?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListInventoryItemsQueryVariables = {
  filter?: ModelInventoryItemsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInventoryItemsQuery = {
  listInventoryItems?:  {
    __typename: "ModelInventoryItemsConnection",
    items:  Array< {
      __typename: "InventoryItems",
      id: string,
      name?: string | null,
      stock?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncInventoryItemsQueryVariables = {
  filter?: ModelInventoryItemsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncInventoryItemsQuery = {
  syncInventoryItems?:  {
    __typename: "ModelInventoryItemsConnection",
    items:  Array< {
      __typename: "InventoryItems",
      id: string,
      name?: string | null,
      stock?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateInventoryItemsSubscriptionVariables = {
  filter?: ModelSubscriptionInventoryItemsFilterInput | null,
};

export type OnCreateInventoryItemsSubscription = {
  onCreateInventoryItems?:  {
    __typename: "InventoryItems",
    id: string,
    name?: string | null,
    stock?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateInventoryItemsSubscriptionVariables = {
  filter?: ModelSubscriptionInventoryItemsFilterInput | null,
};

export type OnUpdateInventoryItemsSubscription = {
  onUpdateInventoryItems?:  {
    __typename: "InventoryItems",
    id: string,
    name?: string | null,
    stock?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteInventoryItemsSubscriptionVariables = {
  filter?: ModelSubscriptionInventoryItemsFilterInput | null,
};

export type OnDeleteInventoryItemsSubscription = {
  onDeleteInventoryItems?:  {
    __typename: "InventoryItems",
    id: string,
    name?: string | null,
    stock?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
