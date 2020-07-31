import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CreateSubscriptionTypeInput {
  @Field(() => String)
  slug: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field(() => [Int], { nullable: true })
  subscriptionItems: number[];

  @Field(() => [Int], { nullable: true })
  subscriptionItemsOrder: number[];
}

@InputType()
export class UpdateSubscriptionTypeInput {
  @Field(() => String, { nullable: true })
  slug: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field(() => [Int], { nullable: true })
  subscriptionItems: number[];

  @Field(() => [Int], { nullable: true })
  subscriptionItemsOrder: number[];
}
