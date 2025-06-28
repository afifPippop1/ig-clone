import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { authCookie } from '~/lib/auth';

const AuthRoute = new Set(['/sign-in', '/sign-up']);

export const authMiddleware = async ({ request }: LoaderFunctionArgs) => {
  const pathname = new URL(request.url).pathname;
  const cookieString = request.headers.get('Cookie');
  const userId = await authCookie.parse(cookieString);
  // if (!userId && !AuthRoute.has(pathname)) {
  //   return redirect('/sign-in');
  // } else if (userId && AuthRoute.has(pathname)) {
  //   return redirect('/');
  // }
  return { userId };
};
