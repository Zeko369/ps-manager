import { InputType, Field, Int, Float } from 'type-graphql';

@InputType()
export class CreateSubscriptionTypeInput {
  @Field(() => Int, { nullable: true })
  amount?: number;

  @Field(() => String)
  slug: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => [Int], { nullable: true })
  subscriptionItems: number[];

  @Field(() => [Int], { nullable: true })
  subscriptionItemsOrder: number[];
}

@InputType()
export class UpdateSubscriptionTypeInput {
  @Field(() => Int, { nullable: true })
  amount?: number;

  @Field(() => String, { nullable: true })
  slug: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => [Int], { nullable: true })
  subscriptionItems: number[];

  @Field(() => [Int], { nullable: true })
  subscriptionItemsOrder: number[];
}
