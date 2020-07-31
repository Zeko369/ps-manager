import { Product } from '../../src/models/Product';
import { SubscriptionType } from '../../src/models/SubscriptionType';
import { SubscriptionItem } from '../../src/models/SubscriptionItem';
import { lorem } from 'faker';

const random = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const createSubscriptionTypes = async (products: Product[]): Promise<SubscriptionType[]> => {
  const subscriptionTypes: SubscriptionType[] = [];

  for (let i = 0; i < 4; i++) {
    const name = lorem.words(Math.floor(Math.random() * 3) + 1);
    const subscriptionType = new SubscriptionType({ slug: name.replace(/\ /g, '-'), name });

    await subscriptionType.save();

    const subscriptionItems: SubscriptionItem[] = [];

    for (let j = 0; j < Math.floor(Math.random() * 4); j++) {
      const rand1 = Math.floor(Math.random() * products.length);
      const rand2 = rand1 === products.length - 1 ? 0 : rand1 + 1;

      const subscriptionItem = new SubscriptionItem({
        products: [products[rand1], products[rand2]],
        subscriptionType,
        amount: Math.floor(Math.random() * 2) + 1
      });

      await subscriptionItem.save();

      subscriptionItems.push(subscriptionItem);
    }

    // 90% of sum of all products
    const sum = subscriptionItems.reduce(
      (all, si) =>
        all + si.products.reduce((priceAll, product) => priceAll + product.price, 0) * si.amount,
      0
    );
    subscriptionType.price = Math.floor(sum * 0.9 * 100) / 100;

    subscriptionType.subscriptionItems = subscriptionItems;
    subscriptionType.subscriptionItemsOrder = subscriptionItems.map((si) => si.id);

    await subscriptionType.save();
  }

  return subscriptionTypes;
};

export default createSubscriptionTypes;
