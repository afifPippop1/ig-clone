import { PublicUserSchema } from '@ig-clone/database';
import { ButtonProps } from 'react-day-picker';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { useUsername } from '~/hooks/use-user';
import { cn } from '~/lib/utils';

interface PhotoProfileProps extends ButtonProps {
  user: PublicUserSchema;
}

export function PhotoProfile({ className, user, ...props }: PhotoProfileProps) {
  const { data } = useUsername(user.username);
  return (
    <Avatar className={cn('w-40 h-40', className)} {...props}>
      <AvatarImage src={data?.photoProfilePath || ''} />
      <AvatarFallback className="text-3xl">{data?.username[0]}</AvatarFallback>
    </Avatar>
  );
}
