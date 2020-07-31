import { Query, Resolver, Arg, Mutation, Int } from 'type-graphql';

import { SubscriptionItem } from '../../models/SubscriptionItem';
import { SubscriptionType } from '../../models/SubscriptionType';
import { CreateSubscriptionTypeInput, UpdateSubscriptionTypeInput } from './inputs';

@Resolver()
export class SubscriptionTypesResolver {
  @Query(() => [SubscriptionType])
  subscriptionTypes() {
    return SubscriptionType.find({ order: { createdAt: 'DESC' } });
  }

  @Query(() => SubscriptionType)
  subscriptionType(@Arg('id', () => Int) id: number) {
    return SubscriptionType.findOne(id);
  }

  @Mutation(() => SubscriptionType)
  async createSubscriptionType(@Arg('data') data: CreateSubscriptionTypeInput) {
    const subscriptionItems = data.subscriptionItems
      ? await SubscriptionItem.find({ where: { id: data.subscriptionItems } })
      : [];

    const subscriptionType = new SubscriptionType({
      ...data,
      subscriptionItems,
      subscriptionItemsOrder: data.subscriptionItemsOrder || subscriptionItems.map((si) => si.id)
    });

    return subscriptionType.save();
  }

  @Mutation(() => SubscriptionType)
  async updateSubscriptionType(
    @Arg('id', () => Int) id: number,
    @Arg('data') data: UpdateSubscriptionTypeInput
  ) {
    const subscriptionType = await SubscriptionType.findOne(id);

    if (!subscriptionType) throw new Error('SubscriptionType not found!');

    subscriptionType.slug = data.slug ?? subscriptionType.slug;
    subscriptionType.name = data.name ?? subscriptionType.name;
    subscriptionType.price = data.price ?? subscriptionType.price;

    if (data.subscriptionItems) {
      subscriptionType.subscriptionItems = await SubscriptionItem.find({
        where: { id: data.subscriptionItems }
      });

      subscriptionType.subscriptionItemsOrder =
        data.subscriptionItemsOrder || subscriptionType.subscriptionItems.map((si) => si.id);
    } else if (data.subscriptionItemsOrder) {
      subscriptionType.subscriptionItemsOrder = data.subscriptionItemsOrder;
    }

    return subscriptionType.save();
  }

  @Mutation(() => Boolean)
  async deleteSubscriptionItem(@Arg('id', () => Int) id: number) {
    const subscriptionType = await SubscriptionType.findOne(id);

    if (!subscriptionType) {
      throw new Error('SubscriptionType not found!');
    }

    await subscriptionType.remove();
    return true;
  }
}
