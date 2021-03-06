import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { ObjectType, Field, Float } from 'type-graphql';

import { Model } from './Model';
import { SubscriptionType } from './SubscriptionType';
import { SubscriptionItem } from './SubscriptionItem';
import { SubscriptionItemProduct } from './relations/SubscriptionItemProduct';

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

  @OneToMany((type) => SubscriptionItemProduct, (sip) => sip.product)
  subscriptionItemProducts: SubscriptionItemProduct[];

  constructor(props?: IProduct) {
    super();
    if (props) {
      this.name = props.name;
      this.price = props.price;
    }
  }
}
