import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useUser } from '~/components/providers/auth-provider';
import { Profile } from '~/components/shared/profile';
import { useTRPC } from '~/lib/trpc';

export function loader({ params }: LoaderFunctionArgs) {
  const { username = '' } = params;
  return { username };
}

export default function ProfilePage() {
  const { username } = useLoaderData<typeof loader>();
  const signInUser = useUser();
  const trpc = useTRPC();

  const userQuery = useQuery(trpc.users.getUser.queryOptions({ username }));
  const user = userQuery.data;
  const isUserProfile: boolean = signInUser.user?.id === user?.id;

  if (userQuery.isLoading) {
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
    return (
      <div>
        This is You
        <Profile />
      </div>
    );
  }

  return <div>{JSON.stringify(user)}</div>;
}
