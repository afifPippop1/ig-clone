import { prisma } from '@ig-clone/database';
import { SignInSchema, SignUpSchema } from '@ig-clone/schema';
import bcrypt from 'bcrypt';
import { TRPCServerError } from '~/utils/error';
import { JWT } from '~/utils/jwt';

export async function createUser(data: SignUpSchema) {
  const { email, password, username, name, birthdate } = data;
  const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        password: encryptedPassword,
        username,
      },
    });

    const profile = await tx.profile.create({
      data: {
        id: user.id,
        birthdate,
        name,
      },
    });

    return { user, profile };
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
