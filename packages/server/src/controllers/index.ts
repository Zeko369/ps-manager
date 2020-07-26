import { UserResolver } from './User/resolver';
import { ProductResolver } from './Product/resolver';
import { AuthResolver } from './Auth/resolver';

const resolvers = [UserResolver, ProductResolver, AuthResolver] as const;

export default resolvers;
