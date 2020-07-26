import { Model } from './Model';
import { Column } from 'typeorm';

export enum DiscountType {
  PERCENTAGE = 'percentage',
  AMOUNT = 'amount'
}

interface IDiscount {
  slug: string;
  name: string;
  amount: number;
  type: DiscountType;
  limit?: number;
  expires?: Date;
}

// @Entity
export class Discount extends Model {
  @Column({ unique: true })
  slug: string;

  @Column()
  name: string;

  @Column({ type: 'float' })
  amount: number;

  @Column({ type: 'enum', enum: DiscountType, default: DiscountType.PERCENTAGE })
  type: DiscountType;

  @Column({ nullable: true })
  limit?: number;

  @Column({ nullable: true })
  expires?: Date;

  constructor(props?: IDiscount) {
    super();
    if (props) {
      this.slug = props.slug;
      this.name = props.name;
      this.amount = props.amount;
      this.type = props.type;
      this.limit = props.limit;
      this.expires = props.expires;
    }
  }
}
