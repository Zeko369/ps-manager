import { Entity, ManyToOne, Column, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

import { Model } from './Model';
import { SubscriptionType } from './SubscriptionType';
import { Product } from './Product';

interface ISubscriptionItemProps {
  products?: Product[];
  subscriptionType: SubscriptionType;
}

@Entity()
@ObjectType()
export class SubscriptionItem extends Model {
  @Field(() => [Product])
  @ManyToMany((type) => Product, (product) => product.subscriptionItems)
  @JoinTable()
  products: Product[];

  @Field(() => SubscriptionType)
  @ManyToOne((type) => SubscriptionType, (subscriptionType) => subscriptionType.subscriptionItems)
  subscriptionType: SubscriptionType;

  constructor(props?: ISubscriptionItemProps) {
    super();

    if (props) {
      this.products = props.products || [];
      this.subscriptionType = props.subscriptionType;
    }
  }
}
