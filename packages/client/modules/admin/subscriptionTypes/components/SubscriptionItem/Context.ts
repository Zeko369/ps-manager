import { useState, createContext, SetStateAction } from 'react';
import { ProductsQuery } from '../../../../../generated';

export interface ISubscriptionItemStore {
  nameInput: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  searchInput: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  added: number[];
  amounts: Record<number, number>;
  setAmounts: React.Dispatch<SetStateAction<Record<number, number>>>;
  add: (pid: number, data?: ProductsQuery) => () => void;
  remove: (pid: number, data?: ProductsQuery) => () => void;
}

const initStore: ISubscriptionItemStore = {
  added: [],
  amounts: {},
  setAmounts: (arr?: []) => {},
  add: () => () => {},
  remove: () => () => {},
  nameInput: { value: '', onChange: () => {} },
  searchInput: { value: '', onChange: () => {} }
};

export const SubscriptionItemContext = createContext<ISubscriptionItemStore>(initStore);
export const SubscriptionItemProvider = SubscriptionItemContext.Provider;
