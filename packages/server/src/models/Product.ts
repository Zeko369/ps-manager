import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { ObjectType, Field, Float } from 'type-graphql';

import { Model } from './Model';
import { SubscriptionType } from './SubscriptionType';
import { SubscriptionItem } from './SubscriptionItem';

interface IProduct {
  name: string;
  price: number;
}

@Entity()
@ObjectType()
export class Product extends Model {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Float)
  @Column({ type: 'float' })
  price: number;

  @ManyToMany((type) => SubscriptionItem, (subscriptionItem) => subscriptionItem.products)
  subscriptionItems: SubscriptionItem[];

  constructor(props?: IProduct) {
    super();
    if (props) {
      this.name = props.name;
      this.price = props.price;
    }
  }
}
