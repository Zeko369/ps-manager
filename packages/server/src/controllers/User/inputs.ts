import { InputType, Field } from 'type-graphql';
import { Role } from '../../models/User';

@InputType()
export class UpdateUserInput {
  @Field(() => Role, { nullable: true })
  role: Role;
}
