import { Product } from '../../models/Product';
import { Query, Resolver, Arg, Mutation, Args, Int } from 'type-graphql';
import { CreateProductInputs, UpdateProductInput } from './inputs';

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  products() {
    return Product.find({ order: { createdAt: 'DESC' } });
  }

  @Query(() => Product)
  product(@Arg('id', () => Int) id: number) {
    return Product.findOne(id);
  }

  @Mutation(() => Product)
  async createProduct(@Arg('data') data: CreateProductInputs) {
    const product = new Product(data);
    return product.save();
  }

  @Mutation(() => Product)
  async updateProduct(@Arg('id', () => Int) id: number, @Arg('data') data: UpdateProductInput) {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      throw new Error('Product not found!');
    }

    product.name = data.name ?? product.name;
    product.price = data.price ?? product.price;

    return product.save();
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg('id', () => Int) id: number) {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      throw new Error('Product not found!');
    }

    await product.remove();
    return true;
  }
}
