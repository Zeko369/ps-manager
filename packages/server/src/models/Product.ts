import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { Model } from './Model';

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

  @Field(() => String)
  @Column({ type: 'float' })
  price: number;

  constructor(props?: IProduct) {
    super();
    if (props) {
      this.name = props.name;
      this.price = props.price;
    }
  }
}
