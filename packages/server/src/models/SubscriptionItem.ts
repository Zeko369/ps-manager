import { Entity, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { Model } from './Model';
import { SubscriptionType } from './SubscriptionType';
import { SubscriptionItemProduct } from './relations/SubscriptionItemProduct';
import { Product } from './Product';

interface ISubscriptionItemProps {
  subscriptionType: SubscriptionType;
}

@Entity()
@ObjectType()
export class SubscriptionItem extends Model {
  @Field(() => [SubscriptionItemProduct])
  @OneToMany((type) => SubscriptionItemProduct, (sip) => sip.subscriptionItem)
  subscriptionItemProducts: SubscriptionItemProduct[];

  // @ManyToMany((type) => Product, (product) => product.subscriptionItems)
  // @JoinTable({
  //   name: 'subscription_item_products',
  //   joinColumn: {
  //     name: 'subscription_item_id',
  //     referencedColumnName: 'id'
  //   },
  //   inverseJoinColumn: {
  //     name: 'product_id',
  //     referencedColumnName: 'id'
  //   }
  // })
  // products: Product[];

  @Field(() => SubscriptionType)
  @ManyToOne((type) => SubscriptionType, (subscriptionType) => subscriptionType.subscriptionItems)
  subscriptionType: SubscriptionType;

  constructor(props?: ISubscriptionItemProps) {
    super();

    if (props) {
      this.subscriptionType = props.subscriptionType;
    }
  }
}
