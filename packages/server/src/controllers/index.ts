import { UserResolver } from './User/resolver';
import { ProductResolver } from './Product/resolver';
import { AuthResolver } from './Auth/resolver';
import { SubscriptionTypesResolver } from './SubscriptionTypes/resolver';
import { SubscriptionItemsResolver } from './SubscriptionItems/resolver';

const resolvers = [
  UserResolver,
  ProductResolver,
  AuthResolver,
  SubscriptionTypesResolver,
  SubscriptionItemsResolver
] as const;

export default resolvers;
