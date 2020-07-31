import { lorem } from 'faker';
import { Product } from '../../src/models/Product';
import { SubscriptionType } from '../../src/models/SubscriptionType';
import { SubscriptionItem } from '../../src/models/SubscriptionItem';
import { SubscriptionItemProduct } from '../../src/models/relations/SubscriptionItemProduct';

const createSubscriptionTypes = async (products: Product[]): Promise<SubscriptionType[]> => {
  const subscriptionTypes: SubscriptionType[] = [];

  for (let i = 0; i < 4; i++) {
    const name = lorem.words(Math.floor(Math.random() * 3) + 1);
    const subscriptionType = new SubscriptionType({
      slug: name.replace(/\ /g, '-'),
      name,
      amount: Math.floor(Math.random() * 2) + 1
    });

    await subscriptionType.save();

    const subscriptionItems: SubscriptionItem[] = [];

    for (let j = 0; j < Math.floor(Math.random() * 4); j++) {
      const rand1 = Math.floor(Math.random() * products.length);
      const rand2 = rand1 === products.length - 1 ? 0 : rand1 + 1;

      const subscriptionItem = new SubscriptionItem({ subscriptionType });
      await subscriptionItem.save();

      const sip1 = new SubscriptionItemProduct({
        amount: Math.floor(Math.random() * 2) + 1,
        product: products[rand1],
        subscriptionItem
      });

      await sip1.save();

      subscriptionItem.subscriptionItemProducts = [sip1];

      if (Math.random() > 0.5) {
        const sip2 = new SubscriptionItemProduct({
          amount: Math.floor(Math.random() * 2) + 1,
          product: products[rand2],
          subscriptionItem
        });

        await sip2.save();

        subscriptionItem.subscriptionItemProducts = [sip1, sip2];
      }

      subscriptionItems.push(subscriptionItem);
    }

    const sumForSi = (si: SubscriptionItem) =>
      si.subscriptionItemProducts.reduce((priceAll, sip) => priceAll + sip.product.price, 0);

    // 90% of sum of all products
    const sum = subscriptionItems.reduce((all, si) => all + sumForSi(si), 0);
    subscriptionType.price = (Math.floor(sum * 0.9 * 100) / 100) * subscriptionType.amount;

    subscriptionType.subscriptionItems = subscriptionItems;
    subscriptionType.subscriptionItemsOrder = subscriptionItems.map((si) => si.id);

    await subscriptionType.save();
  }

  return subscriptionTypes;
};

export default createSubscriptionTypes;
