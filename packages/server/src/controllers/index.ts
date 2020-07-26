import { UserResolver } from './User/resolver';
import { ProductResolver } from './Product/resolver';

const resolvers = [UserResolver, ProductResolver] as const;

export default resolvers;
