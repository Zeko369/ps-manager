import { name, lorem } from 'faker';
import { Product } from '../../src/models/Product';

const createProducts = async (): Promise<Product[]> => {
  const output = [];

  for (let i = 0; i < 10; i++) {
    const product = new Product({
      name: lorem.words(3),
      price: Math.floor(Math.random() * 100 * 100) / 100
    });

    await product.save();

    output.push(product);
  }

  return output;
};

export default createProducts;
