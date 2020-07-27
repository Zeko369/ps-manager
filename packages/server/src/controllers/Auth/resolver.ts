import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Resolver, Arg, Mutation, Query, Ctx } from 'type-graphql';

import { User } from '../../models/User';
import { SignUpInput } from './input';
import { hash } from '../../lib/hash';
import { GQLCtx } from '../../ts/gql';

@Resolver()
export class AuthResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: GQLCtx) {
    return ctx.user;
  }

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
  async signIn(@Arg('email') email: string, @Arg('password') password: string, @Ctx() ctx: GQLCtx) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('EMAIL_NOT_FOUND/Cant find user with that email');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('INVALID_PASSWORD/Incorrect email address or password.');
    }

    const token = jwt.sign({ userId: user.id }, 'hello-world');
    ctx.res.cookie('token', token, {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 365 // year
    });

    return user;
  }

  @Mutation(() => Boolean)
  async signOut(@Ctx() ctx: GQLCtx) {
    if (ctx.user) {
      ctx.res.clearCookie('token');
      return true;
    }

    return false;
  }
}
