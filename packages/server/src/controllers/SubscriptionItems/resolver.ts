import { Query, Resolver, Arg, Mutation, Int } from 'type-graphql';

import { Product } from '../../models/Product';
import { SubscriptionItem } from '../../models/SubscriptionItem';
import { SubscriptionType } from '../../models/SubscriptionType';
import { CreateSubscriptionItemInput, UpdateSubscriptionItemInput } from './inputs';
import { SubscriptionItemProduct } from '../../models/relations/SubscriptionItemProduct';

@Resolver()
export class SubscriptionItemsResolver {
  @Query(() => [SubscriptionItem])
  subscriptionItems() {
    return SubscriptionItem.find({ order: { createdAt: 'DESC' } });
  }

  @Query(() => SubscriptionItem)
  subscriptionItem(@Arg('id', () => Int) id: number) {
    return SubscriptionItem.findOne(id);
  }

  @Mutation(() => SubscriptionItem)
  async createSubscriptionItem(@Arg('data') data: CreateSubscriptionItemInput) {
    const { productIds, amounts, subscriptionTypeId } = data;

    if (productIds.length !== amounts.length) throw new Error('Wrong count of one of arrays');

    const products = await Product.find({ where: { id: productIds } });
    const subscriptionType = await SubscriptionType.findOne(subscriptionTypeId);

    if (!products || products.length !== productIds.length) throw new Error('Product not found!');
    if (!subscriptionType) throw new Error('SubscriptionType not found!');

    const subscriptionItem = new SubscriptionItem({ subscriptionType });
    await subscriptionItem.save();

    const subscriptionItemProducts = await Promise.all(
      products
        .map(
          (product, i) =>
            new SubscriptionItemProduct({ amount: amounts[i], product, subscriptionItem })
        )
        .map((sip) => sip.save())
    );

    subscriptionItem.subscriptionItemProducts = subscriptionItemProducts;

    return subscriptionItem;
  }

  // @Mutation(() => SubscriptionItem)
  // async updateSubscriptionItem(
  //   @Arg('id', () => Int) id: number,
  //   @Arg('data') data: UpdateSubscriptionItemInput
  // ) {
  //   const { productIds, amounts, subscriptionTypeId } = data;

  //   const subscriptionItem = await SubscriptionItem.findOne(id, {
  //     relations: ['subscriptionItemProducts', 'subscriptionItemProducts.product']
  //   });

  //   if (!subscriptionItem) throw new Error('SubscriptionItem not found!');

  //   if (productIds && amounts && amounts.length === productIds.length) {
  //     const products = await Product.findByIds(data.productIds || []);
  //     if (products.length !== productIds.length) throw new Error('Some products not found!');

  //     const sips = subscriptionItem.subscriptionItemProducts;

  //     const remove = sips.filter((sip) => !productIds.includes(sip.product.id));
  //     const add = productIds.filter((id) => !sips.map((sip) => sip.product.id).includes(id));

  //     await Promise.all(remove.map((sip) => sip.remove()));

  //     const newSips = await Promise.all(
  //       productIds.map((pid, index) => {
  //         if (add.includes(pid)) {
  //           const product = products.find((p) => p.id === pid);
  //           if (!product) throw new Error('What?');

  //           const sip = new SubscriptionItemProduct({
  //             amount: amounts[index],
  //             product,
  //             subscriptionItem
  //           });

  //           console.log('here1');
  //           return sip.save();
  //         } else {
  //           const sip = sips.find((sip) => sip.product.id === pid);

  //           if (!sip) throw new Error('What?');

  //           if (sip.amount !== amounts[index]) {
  //             sip.amount = amounts[index];
  //             console.log('here2');
  //             return sip.save();
  //           }

  //           return sip;
  //         }
  //       })
  //     );

  //     subscriptionItem.subscriptionItemProducts = newSips || [];
  //   }

  //   if (subscriptionTypeId) {
  //     const subscriptionType = await SubscriptionType.findOne(subscriptionTypeId);
  //     if (!subscriptionType) throw new Error('SubscriptionType not found!');

  //     subscriptionItem.subscriptionType = subscriptionType;
  //   }

  //   return subscriptionItem.save();
  // }

  @Mutation(() => Boolean)
  async deleteSubscriptionItem(@Arg('id', () => Int) id: number) {
    const subscriptionItem = await SubscriptionItem.findOne(id);

    if (!subscriptionItem) {
      throw new Error('SubscriptionItem not found!');
    }

    await subscriptionItem.remove();
    return true;
  }
}
