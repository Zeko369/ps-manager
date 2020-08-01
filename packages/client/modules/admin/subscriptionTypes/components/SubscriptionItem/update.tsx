import React, { useState, useEffect } from 'react';
import SubscriptionItemModal from './Modal';
import { ProductsQuery, useSubscriptionItemQuery } from '../../../../../generated';

interface IUpdateSubscriptionItemProps {
  subscriptionTypeId: number;
  isOpen: boolean;
  onClose: () => void;
  id: number;
}

import { SubscriptionItemProvider } from './Context';

type RCE = React.ChangeEvent<HTMLInputElement>;

export const UpdateSubscriptionItem: React.FC<IUpdateSubscriptionItemProps> = (props) => {
  const { subscriptionTypeId, id, ...rest } = props;

  const { loading, error, data } = useSubscriptionItemQuery({ variables: { id } });

  const [name, setName] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [added, setAdded] = useState<number[]>([]);
  const [amounts, setAmounts] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!loading && !error && data) {
      setName(data.subscriptionItem.name);
      setAdded(data.subscriptionItem.subscriptionItemProducts.map((sip) => sip.product.id));
      setAmounts(
        Object.fromEntries(
          data.subscriptionItem.subscriptionItemProducts.map((sip) => [sip.product.id, sip.amount])
        )
      );
    }
  }, [loading, error, data, rest.isOpen]);

  // const [createSubscriptionItem] = useCreateSubscriptionItemMutation({
  //   refetchQueries: [{ query: SUBSCRIPTION_TYPES }]
  // });

  const nameInput = {
    onChange: (e: RCE) => setName(e.target.value),
    value: name
  };

  const searchInput = {
    onChange: (e: RCE) => setSearch(e.target.value),
    value: search
  };

  const update = async () => {
    // await UpdateSubscriptionItem({
    //   variables: {
    //     amounts: added.map((id) => amounts[id]),
    //     productIds: added,
    //     subscriptionTypeId,
    //     name
    //   }
    // });

    setName('');
    setAdded([]);
    setSearch('');
    setAmounts({});

    rest.onClose();
  };

  const add = (productId: number) => () => {
    if (!added.includes(productId)) {
      setAdded((x) => [...x, productId]);
      setAmounts((x) => ({ ...x, [productId]: 1 }));
    }
  };

  const remove = (productId: number) => () => {
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
        onMainClick={update}
        title={`Edit subscription item [${
          loading || !data ? 'Loading...' : data.subscriptionItem.name
        }]`}
      />
    </SubscriptionItemProvider>
  );
};
