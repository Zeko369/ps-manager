import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateUserInputs {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}
