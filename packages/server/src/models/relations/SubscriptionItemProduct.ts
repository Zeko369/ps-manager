import { BaseEntity, Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from '../Product';
import { SubscriptionItem } from '../SubscriptionItem';
import { ObjectType, Int, Field } from 'type-graphql';

interface IProps {
  amount: number;
  product: Product;
  subscriptionItem: SubscriptionItem;
}

@ObjectType()
@Entity('subscription_item_products')
export class SubscriptionItemProduct extends BaseEntity {
  @Field(() => Int)
  @Column()
  amount: number;

  @Field(() => SubscriptionItem)
  @JoinColumn({ name: 'subscription_item_id' })
  @ManyToOne((type) => SubscriptionItem, (si) => si.subscriptionItemProducts, { primary: true })
  subscriptionItem: SubscriptionItem;

  @Field(() => Product)
  @JoinColumn({ name: 'product_id' })
  @ManyToOne((type) => Product, (product) => product.subscriptionItemProducts, { primary: true })
  product: Product;

  constructor(props?: IProps) {
    super();
    if (props) {
      this.amount = props.amount;

      this.product = props.product;
      this.subscriptionItem = props.subscriptionItem;
    }
  }
}
