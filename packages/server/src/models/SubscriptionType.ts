import { Entity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, Float, Int } from 'type-graphql';

import { Model } from './Model';
import { SubscriptionItem } from './SubscriptionItem';

interface ISubscriptionTypeProps {
  amount?: number;
  slug: string;
  name?: string;
  price?: number;
  subscriptionItems?: SubscriptionItem[];
  subscriptionItemsOrder?: number[];
}

@Entity()
@ObjectType()
export class SubscriptionType extends Model {
  @Field(() => Int)
  @Column({ default: 1 })
  amount: number;

  @Field(() => String)
  @Column({ unique: true })
  slug: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  price?: number;

  @Field(() => [SubscriptionItem])
  @OneToMany((type) => SubscriptionItem, (subscriptionItem) => subscriptionItem.subscriptionType)
  subscriptionItems: SubscriptionItem[];

  @Column({ type: 'int', array: true, nullable: false })
  subscriptionItemsOrder: number[];

  constructor(props?: ISubscriptionTypeProps) {
    super();
    if (props) {
      const { amount, slug, name, price, subscriptionItems = [], subscriptionItemsOrder } = props;

      this.amount = amount || 1;
      this.slug = slug;
      this.name = name || slug;
      this.price = price || undefined;
      this.subscriptionItems = subscriptionItems;
      this.subscriptionItemsOrder =
        subscriptionItemsOrder || subscriptionItems.map((item) => item.id);
    }
  }
}
