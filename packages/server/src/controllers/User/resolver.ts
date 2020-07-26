import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql';
import { User } from '../../models/User';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find({ order: { createdAt: 'DESC' } });
  }

  @Query(() => User)
  user(@Arg('id', () => Int) id: number) {
    return User.findOne({ where: { id } });
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => Int) id: number) {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error('User not found!');
    await user.remove();
    return true;
  }
}
