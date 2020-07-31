import { Entity, ManyToOne, Column } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

import { Model } from './Model';
import { SubscriptionType } from './SubscriptionType';
import { Product } from './Product';

interface ISubscriptionItemProps {
  amount?: number;
  product: Product;
  subscriptionType: SubscriptionType;
}

@Entity()
@ObjectType()
export class SubscriptionItem extends Model {
  @Field(() => Int)
  @Column({ default: 1 })
  amount: number;

  @Field(() => Product)
  @ManyToOne((type) => Product, (product) => product.subscriptionItems)
  product: Product;

  @Field(() => SubscriptionType)
  @ManyToOne((type) => SubscriptionType, (subscriptionType) => subscriptionType.subscriptionItems)
  subscriptionType: SubscriptionType;

  constructor(props?: ISubscriptionItemProps) {
    super();

    if (props) {
      this.amount = props.amount || 1;
      this.product = props.product;
      this.subscriptionType = props.subscriptionType;
    }
  }
}
