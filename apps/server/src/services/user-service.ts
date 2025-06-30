import { prisma } from '@ig-clone/database';

export async function getUserById(id: string) {
  const [user, profile] = await Promise.all([
    prisma.user.findFirst({ where: { id } }),
    prisma.profile.findFirst({ where: { id } }),
  ]);
  return { ...user, ...profile };
}
