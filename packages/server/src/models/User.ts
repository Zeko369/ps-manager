import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { Model } from './Model';

interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Entity()
@ObjectType()
export class User extends Model {
  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column({ name: 'first_name' })
  firstName: string;

  @Field(() => String)
  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  password: string;

  @Field(() => String)
  public name() {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(props?: IUser) {
    super();
    if (props) {
      this.email = props.email;
      this.password = props.password;
      this.firstName = props.firstName;
      this.lastName = props.lastName;
    }
  }
}
