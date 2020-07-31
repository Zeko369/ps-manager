import { UserResolver } from './User/resolver';
import { ProductResolver } from './Product/resolver';
import { AuthResolver } from './Auth/resolver';
import { SubscriptionTypesResolver } from './SubscriptionTypes/resolver';

const resolvers = [UserResolver, ProductResolver, AuthResolver, SubscriptionTypesResolver] as const;

export default resolvers;
