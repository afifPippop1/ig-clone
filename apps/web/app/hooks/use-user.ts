import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '~/lib/trpc';

export function useUsername(username: string) {
  const trpc = useTRPC();
  const query = useQuery(trpc.users.getUser.queryOptions({ username }));
  return query;
}
