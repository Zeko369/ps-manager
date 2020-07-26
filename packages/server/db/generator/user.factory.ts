import { name } from 'faker';
import { hash } from '../../src/lib/hash';
import { User, Role } from '../../src/models/User';

const createUsers = async (): Promise<User[]> => {
  const hashedPassword = await hash('foobar');

  const admin = new User({
    email: 'foo@bar.com',
    password: hashedPassword,
    firstName: name.firstName(),
    lastName: name.lastName(),
    role: Role.ADMIN
  });

  const user = new User({
    email: 'bar@bar.com',
    password: hashedPassword,
    firstName: name.firstName(),
    lastName: name.lastName()
  });

  try {
    await Promise.all([admin.save(), user.save()]);
  } catch (e) {
    console.error(e);
    throw new Error('Error seeding users');
  }

  return [admin, user];
};

export default createUsers;
