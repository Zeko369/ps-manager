import bcrypt from 'bcryptjs';
import { Resolver, Arg, Mutation } from 'type-graphql';
import { User } from '../../models/User';
import { SignUpInput } from './input';
import { hash } from '../../lib/hash';

@Resolver()
export class AuthResolver {
  @Mutation(() => User)
  async signUp(@Arg('data') data: SignUpInput) {
    const { email, password, firstName, lastName } = data;
    const lowerEmail = email.toLowerCase();
    const hashedPassword = await hash(password);

    let user = await User.findOne({ where: { email: lowerEmail } });
    if (user) {
      throw new Error('EMAIL_IN_USE/Email already in use');
    }

    user = new User({ email: lowerEmail, password: hashedPassword, firstName, lastName });
    await user.save();

    return user;
  }

  @Mutation(() => User)
  async signIn(@Arg('email') email: string, @Arg('password') password: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('EMAIL_NOT_FOUND/Cant find user with that email');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('INVALID_PASSWORD/Incorrect email address or password.');
    }

    return user;
  }
}
