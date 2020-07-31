import { Query, Resolver, Arg, Mutation, Int } from 'type-graphql';

import { Product } from '../../models/Product';
import { SubscriptionItem } from '../../models/SubscriptionItem';
import { SubscriptionType } from '../../models/SubscriptionType';
import { CreateSubscriptionItemInput, UpdateSubscriptionItemInput } from './inputs';

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

  // @Mutation(() => SubscriptionItem)
  // async createSubscriptionItem(@Arg('data') data: CreateSubscriptionItemInput) {
  //   const products = await Product.find({ where: { id: data.productId } });
  //   const subscriptionType = await SubscriptionType.findOne(data.subscriptionTypeId);

  //   if (!products) throw new Error('Product not found!');
  //   if (!subscriptionType) throw new Error('SubscriptionType not found!');

  //   const subscriptionItem = new SubscriptionItem({
  //     products,
  //     subscriptionType
  //   });

  //   return subscriptionItem.save();
  // }

  @Mutation(() => SubscriptionItem)
  async updateSubscriptionItem(
    @Arg('id', () => Int) id: number,
    @Arg('data') data: UpdateSubscriptionItemInput
  ) {
    const subscriptionItem = await SubscriptionItem.findOne(id);

    if (!subscriptionItem) throw new Error('SubscriptionItem not found!');

    const products = await Product.find({ where: { id: data.productId } });
    const subscriptionType = await SubscriptionType.findOne(data.subscriptionTypeId);

    if (!products) throw new Error('Products not found!');
    if (!subscriptionType) throw new Error('SubscriptionType not found!');

    // subscriptionItem.products = products ?? subscriptionItem.products;
    subscriptionItem.subscriptionType = subscriptionType ?? subscriptionItem.subscriptionType;

    return subscriptionItem.save();
  }

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
