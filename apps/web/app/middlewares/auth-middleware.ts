import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { authCookie } from '~/lib/auth';
import { makeTRPC } from '~/lib/trpc';

const AuthRoute = new Set(['/sign-in', '/sign-up']);

export const authMiddleware = async ({ request }: LoaderFunctionArgs) => {
  const pathname = new URL(request.url).pathname;
  const cookieString = request.headers.get('Cookie');
  const token: string = await authCookie.parse(cookieString);
  const trpc = makeTRPC(token);
  const user = await trpc.auth.me.query();
  if (!token && !AuthRoute.has(pathname)) {
    return redirect('/sign-in');
  } else if (token && AuthRoute.has(pathname)) {
    return redirect('/');
  }
  return { user, token };
};
