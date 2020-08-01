import React, { useState } from 'react';
import SubscriptionItemModal, { ISubscriptionItemModalProps } from './Modal';
import { useCreateSubscriptionItemMutation, ProductsQuery } from '../../../../../generated';
import { SUBSCRIPTION_TYPES } from '../../graphql/queries';

interface ICreateSubscriptionItemProps {
  subscriptionTypeId: number;
  isOpen: boolean;
  onClose: () => void;
}

import { SubscriptionItemProvider } from './Context';

type RCE = React.ChangeEvent<HTMLInputElement>;

export const CreateSubscriptionItem: React.FC<ICreateSubscriptionItemProps> = (props) => {
  const { subscriptionTypeId, ...rest } = props;

  const [custom, setCustom] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [added, setAdded] = useState<number[]>([]);
  const [amounts, setAmounts] = useState<Record<number, number>>({});

  const [createSubscriptionItem] = useCreateSubscriptionItemMutation({
    refetchQueries: [{ query: SUBSCRIPTION_TYPES }]
  });

  const nameInput = {
    onChange: (e: RCE) => {
      setName(e.target.value);
      setCustom(true);
    },
    value: name
  };

  const searchInput = {
    onChange: (e: RCE) => setSearch(e.target.value),
    value: search
  };

  const create = async () => {
    await createSubscriptionItem({
      variables: {
        amounts: added.map((id) => amounts[id]),
        productIds: added,
        subscriptionTypeId,
        name
      }
    });

    setName('');
    setAdded([]);
    setSearch('');
    setAmounts({});

    rest.onClose();
  };

  const add = (productId: number, data: ProductsQuery) => () => {
    if (!added.includes(productId)) {
      if (
        !custom &&
        (added.length === 0 ||
          data.products.find((p) => p.id === added[added.length - 1]).name === name)
      ) {
        setName(data.products.find((p) => p.id === productId).name);
      }

      setAdded((x) => [...x, productId]);
      setAmounts((x) => ({ ...x, [productId]: 1 }));
    }
  };

  const remove = (productId: number, data: ProductsQuery) => () => {
    if (!custom) {
      if (added.length === 2) {
        setName(data.products.find((p) => p.id === added.find((a) => a !== productId)).name);
      } else if (added.length === 1 && data.products.find((p) => p.id === added[0]).name === name) {
        setName('');
      } else if (data.products.find((p) => p.id === productId).name === name) {
        setName(data.products.find((p) => p.id === added.filter((a) => a !== productId)[0]).name);
      }
    }

    setAdded((x) => x.filter((p) => p !== productId));
  };

  return (
    <SubscriptionItemProvider
      value={{
        nameInput,
        searchInput,
        added,
        amounts,
        setAmounts,
        add,
        remove
      }}
    >
      <SubscriptionItemModal
        {...rest}
        onMainClick={create}
        title="Add new subscription item"
        create
      />
    </SubscriptionItemProvider>
  );
};
