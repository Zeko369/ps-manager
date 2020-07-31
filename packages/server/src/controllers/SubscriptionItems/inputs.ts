import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CreateSubscriptionItemInput {
  @Field(() => String)
  name: string;

  @Field(() => [Int])
  productIds: number[];

  @Field(() => [Int])
  amounts: number[];

  @Field(() => Int)
  subscriptionTypeId: number;
}

@InputType()
export class UpdateSubscriptionItemInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [Int], { nullable: true })
  productIds?: number[];

  @Field(() => [Int], { nullable: true })
  amounts?: number[];

  @Field(() => Int, { nullable: true })
  subscriptionTypeId?: number;
}
