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

  @Mutation(() => SubscriptionItem)
  async createSubscriptionItem(@Arg('data') data: CreateSubscriptionItemInput) {
    const product = await Product.findOne(data.productId);
    const subscriptionType = await SubscriptionType.findOne(data.subscriptionTypeId);

    if (!product) throw new Error('Product not found!');
    if (!subscriptionType) throw new Error('SubscriptionType not found!');

    const subscriptionItem = new SubscriptionItem({
      amount: data.amount,
      product,
      subscriptionType
    });

    return subscriptionItem.save();
  }

  @Mutation(() => SubscriptionItem)
  async updateSubscriptionItem(
    @Arg('id', () => Int) id: number,
    @Arg('data') data: UpdateSubscriptionItemInput
  ) {
    const subscriptionItem = await SubscriptionItem.findOne(id);

    if (!subscriptionItem) throw new Error('SubscriptionItem not found!');

    const product = await Product.findOne(data.productId);
    const subscriptionType = await SubscriptionType.findOne(data.subscriptionTypeId);

    if (!product) throw new Error('Product not found!');
    if (!subscriptionType) throw new Error('SubscriptionType not found!');

    subscriptionItem.amount = data.amount ?? subscriptionItem.amount;
    subscriptionItem.product = product ?? subscriptionItem.product;
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
