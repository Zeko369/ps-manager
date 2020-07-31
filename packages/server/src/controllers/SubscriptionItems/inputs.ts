import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CreateSubscriptionItemInput {
  @Field(() => [Int])
  productId: number[];

  @Field(() => Int)
  subscriptionTypeId: number;
}

@InputType()
export class UpdateSubscriptionItemInput {
  @Field(() => [Int], { nullable: true })
  productId: number[];

  @Field(() => Int, { nullable: true })
  subscriptionTypeId: number;
}
