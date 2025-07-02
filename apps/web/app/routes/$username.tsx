import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData, useNavigation } from '@remix-run/react';
import { Loader2Icon } from 'lucide-react';
import { useUser } from '~/components/providers/auth-provider';
import { Profile } from '~/components/shared/profile';
import { authCookie } from '~/lib/auth';
import { makeTRPC } from '~/lib/trpc';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { username = '' } = params;
  const cookieString = request.headers.get('Cookie');
  const token: string = await authCookie.parse(cookieString);
  const trpc = makeTRPC(token);
  const user = await trpc.users.getUser.query({ username });
  return { user };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: `${data?.user.name}(@${data?.user.username})`,
    },
  ];
};

export default function ProfilePage() {
  const { user } = useLoaderData<typeof loader>();
  const { state } = useNavigation();
  const signInUser = useUser();
  const isUserProfile: boolean = signInUser.user?.id === user?.id;

  if (state === 'loading') {
    return (
      <div>
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <h1>Sorry, this page isn&apos;t available.</h1>
        <p>
          The link you followed may be broken, or the page may have been
          removed. Go back to Instagram.
        </p>
      </div>
    );
  }

  if (isUserProfile) {
    return <Profile user={user} isCurrentUser />;
  }

  return <Profile user={user} />;
}
