import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { authCookie } from '~/lib/auth';
import { makeTRPC } from '~/lib/trpc';

const AuthRoute = new Set(['/sign-in', '/sign-up']);

export const authMiddleware = async ({ request }: LoaderFunctionArgs) => {
  try {
    const pathname = new URL(request.url).pathname;
    const cookieString = request.headers.get('Cookie');
    const token: string = await authCookie.parse(cookieString);
    if (!token && !AuthRoute.has(pathname)) {
      await authCookie.serialize('', { maxAge: 1 });
      return redirect('/sign-in');
    } else if (token && AuthRoute.has(pathname)) {
      return redirect('/');
    } else {
      const trpc = makeTRPC({ token });
      const user = await trpc.auth.me.query();
      return { user, token };
    }
  } catch {
    return { user: null, token: '' };
  }
};
