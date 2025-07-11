import { AppRouter } from '@ig-clone/server';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { ReactNode, useState } from 'react';
import { AuthProvider } from './components/providers/auth-provider';
import { Sidebar } from './components/shared/sidebar';
import { TRPCProvider } from './lib/trpc';
import { authMiddleware } from './middlewares/auth-middleware';
import './tailwind.css';
import { Toaster } from './components/ui/sonner';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export async function loader(args: LoaderFunctionArgs) {
  return authMiddleware(args);
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function App() {
  const { user, token } = useLoaderData<typeof loader>();
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: 'http://localhost:4000',
          headers() {
            return { Authorization: `Bearer ${token}` };
          },
        }),
      ],
    }),
  );

  return (
    <>
      <Toaster />
      <div className="h-screen flex overflow-hidden">
        <QueryClientProvider client={queryClient}>
          <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
            <AuthProvider user={user}>
              <Sidebar />
              <AuthenticatedWrapper authenticated={!!user}>
                <Outlet />
              </AuthenticatedWrapper>
            </AuthProvider>
          </TRPCProvider>
        </QueryClientProvider>
      </div>
    </>
  );
}

function AuthenticatedWrapper({
  authenticated,
  children,
}: {
  authenticated: boolean;
  children: ReactNode;
}) {
  if (!authenticated) return children;

  return <div className="flex flex-1 px-36 py-8 overflow-auto">{children}</div>;
}
