import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { authCookie } from '~/lib/auth';

export const authMiddleware = async ({ request }: LoaderFunctionArgs) => {
  const pathname = new URL(request.url).pathname;
  const cookieString = request.headers.get('Cookie');
  const userId = await authCookie.parse(cookieString);
  if (!userId && !pathname.startsWith('/auth')) {
    return redirect('/auth/sign-in');
  }
  return { userId };
};
