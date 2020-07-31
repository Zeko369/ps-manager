import { Entity, Column, OneToMany } from 'typeorm';
import { ObjectType } from 'type-graphql';

import { Model } from './Model';
import { SubscriptionItem } from './SubscriptionItem';

interface ISubscriptionTypeProps {
  slug: string;
  name?: string;
  price?: number;
  subscriptionItems: SubscriptionItem[];
  subscriptionItemsOrder?: number[];
}

@Entity()
@ObjectType()
export class SubscriptionType extends Model {
  @Column({ unique: true })
  slug: string;

  @Column()
  name: string;

  @Column({ type: 'float', nullable: true })
  price?: number;

  @OneToMany((type) => SubscriptionItem, (subscriptionItem) => subscriptionItem.subscriptionType)
  subscriptionItems: SubscriptionItem[];

  @Column({ type: 'int', array: true, nullable: false })
  subscriptionItemsOrder: number[];

  constructor(props?: ISubscriptionTypeProps) {
    super();
    if (props) {
      const { slug, name, price, subscriptionItems, subscriptionItemsOrder } = props;

      this.slug = slug;
      this.name = name || slug;
      this.price = price || undefined;
      this.subscriptionItems = subscriptionItems;
      this.subscriptionItemsOrder =
        subscriptionItemsOrder || subscriptionItems.map((item) => item.id);
    }
  }
}
