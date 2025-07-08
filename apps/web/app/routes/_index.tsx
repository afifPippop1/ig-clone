import type { MetaFunction } from '@remix-run/node';
import { useQuery } from '@tanstack/react-query';
import { PostCard } from '~/components/shared/posts/post-card';
import { useTRPC } from '~/lib/trpc';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const trpc = useTRPC();

  const query = useQuery(trpc.feed.recomendation.queryOptions());
  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col items-center gap-16 flex-1">
        {query.data?.map((feed) => {
          // @ts-expect-error createdAt treated as string
          return <PostCard key={feed.id} feed={feed} />;
        })}
      </div>
    </div>
  );
}
