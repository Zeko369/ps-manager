import { Resolver, Query, Mutation, Arg, Int, Args } from 'type-graphql';
import { User } from '../../models/User';
import { UpdateUserInput } from './inputs';

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

  @Mutation(() => User)
  async updateUser(@Arg('id', () => Int) id: number, @Arg('data') data: UpdateUserInput) {
    const user = await User.findOne(id);
    if (!user) throw new Error('User not found!');

    user.role = data.role ?? user.role;

    return user.save();
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => Int) id: number) {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error('User not found!');
    await user.remove();
    return true;
  }
}
