import { Entity, ManyToOne, Column, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

import { Model } from './Model';
import { SubscriptionType } from './SubscriptionType';
import { Product } from './Product';

interface ISubscriptionItemProps {
  amount?: number;
  products?: Product[];
  subscriptionType: SubscriptionType;
}

@Entity()
@ObjectType()
export class SubscriptionItem extends Model {
  @Field(() => Int)
  @Column({ default: 1 })
  amount: number;

  @Field(() => Product)
  @ManyToMany((type) => Product, (product) => product.subscriptionItems)
  @JoinTable()
  products: Product[];

  @Field(() => SubscriptionType)
  @ManyToOne((type) => SubscriptionType, (subscriptionType) => subscriptionType.subscriptionItems)
  subscriptionType: SubscriptionType;

  constructor(props?: ISubscriptionItemProps) {
    super();

    if (props) {
      this.amount = props.amount || 1;
      this.products = props.products || [];
      this.subscriptionType = props.subscriptionType;
    }
  }
}
