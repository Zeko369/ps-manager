import { Entity, Column } from 'typeorm';
import { ObjectType, Field, registerEnumType } from 'type-graphql';

import { Model } from './Model';

export enum Role {
  ADMIN = 'admin',
  USER = 'user'
}

registerEnumType(Role, { name: 'Role' });

interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: Role;
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

  @Field(() => Role)
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

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
      this.role = props.role || Role.USER;
    }
  }
}
