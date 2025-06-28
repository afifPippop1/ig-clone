import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '@ig-clone/server';

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000',
    }),
  ],
});
