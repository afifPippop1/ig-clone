import { prisma } from '@ig-clone/database';
import { SignInSchema, SignUpSchema } from '@ig-clone/schema';
import bcrypt from 'bcrypt';
import { TRPCServerError } from '~/utils/error';
import { JWT } from '~/utils/jwt';

export async function createUser(user: SignUpSchema) {
  const { email, password } = user;
  const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return await prisma.user.create({
    data: {
      email,
      password: encryptedPassword,
    },
  });
}

export async function signInService(data: SignInSchema) {
  const { email, password } = data;
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw TRPCServerError.unauthorized();
  }
  const confirmPassword = bcrypt.compareSync(password, user.password);
  if (!confirmPassword) {
    throw TRPCServerError.unauthorized();
  }

  return JWT.encode({ id: user.id });
}
