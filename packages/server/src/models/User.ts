import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { Model } from './Model';

@Entity()
@ObjectType()
export class User extends Model {
  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  password: string;
}
