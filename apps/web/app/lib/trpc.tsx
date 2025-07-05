import { AppRouter } from '@ig-clone/server';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';

type MakeTPRCProps = {
  token?: string;
};

export function makeTRPC(props?: MakeTPRCProps) {
  const headers = props?.token
    ? { Authorization: `Bearer ${props.token}` }
    : {};
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:4000',
        headers() {
          return headers;
        },
      }),
    ],
  });
}

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();
