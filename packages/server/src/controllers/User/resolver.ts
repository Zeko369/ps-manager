import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User } from '../../models/User';
import { CreateUserInputs, UpdateUserInput } from './inputs';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User)
  user(@Arg('id') id: number) {
    return User.findOne({ where: { id } });
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInputs) {
    const user = User.create(data);
    await user.save();
    return user;
  }

  @Mutation(() => User)
  async updateUser(@Arg('id') id: number, @Arg('data') data: UpdateUserInput) {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new Error('User not found!');
    }

    user.email = data.email ?? user.email;
    user.password = data.password ?? user.password;

    await user.save();
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: number) {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error('User not found!');
    await user.remove();
    return true;
  }
}
