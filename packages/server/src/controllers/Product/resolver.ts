import { Product } from '../../models/Product';
import { Query, Resolver, Arg, Mutation, Args } from 'type-graphql';
import { CreateProductInputs, UpdateProductInput } from './inputs';

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  products() {
    return Product.find();
  }

  @Query(() => Product)
  product(@Arg('id') id: number) {
    return Product.findOne(id);
  }

  @Mutation(() => Product)
  async createProduct(@Arg('data') data: CreateProductInputs) {
    const product = new Product(data);
    return product.save();
  }

  @Mutation(() => Product)
  async updateProduct(@Arg('id') id: number, @Arg('data') data: UpdateProductInput) {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      throw new Error('Product not found!');
    }

    product.name = data.name ?? product.name;
    product.price = data.price ?? product.price;

    return product.save();
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg('id') id: number) {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      throw new Error('Product not found!');
    }

    await product.remove();
    return true;
  }
}
