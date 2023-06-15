import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerInventoryItems = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InventoryItems, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly stock?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyInventoryItems = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InventoryItems, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly stock?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type InventoryItems = LazyLoading extends LazyLoadingDisabled ? EagerInventoryItems : LazyInventoryItems

export declare const InventoryItems: (new (init: ModelInit<InventoryItems>) => InventoryItems) & {
  copyOf(source: InventoryItems, mutator: (draft: MutableModel<InventoryItems>) => MutableModel<InventoryItems> | void): InventoryItems;
}