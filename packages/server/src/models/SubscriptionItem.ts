import { Entity, ManyToOne, OneToMany, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { Model } from './Model';
import { SubscriptionType } from './SubscriptionType';
import { SubscriptionItemProduct } from './relations/SubscriptionItemProduct';

interface ISubscriptionItemProps {
  subscriptionType: SubscriptionType;
  name: string;
}

@Entity()
@ObjectType()
export class SubscriptionItem extends Model {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [SubscriptionItemProduct])
  @OneToMany((type) => SubscriptionItemProduct, (sip) => sip.subscriptionItem)
  subscriptionItemProducts: SubscriptionItemProduct[];

  @Field(() => SubscriptionType)
  @ManyToOne((type) => SubscriptionType, (subscriptionType) => subscriptionType.subscriptionItems)
  subscriptionType: SubscriptionType;

  constructor(props?: ISubscriptionItemProps) {
    super();

    if (props) {
      this.subscriptionType = props.subscriptionType;
      this.name = props.name;
    }
  }
}
