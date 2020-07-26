import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateProductInputs {
  @Field()
  name: string;

  @Field()
  price: number;
}

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  price?: number;
}
