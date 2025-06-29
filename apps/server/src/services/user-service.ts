import { prisma } from '@ig-clone/database';

export async function getUserById(id: string) {
  return await prisma.user.findFirst({ where: { id } });
}
