import { ButtonProps } from 'react-day-picker';
import { useUser } from '~/components/providers/auth-provider';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { cn } from '~/lib/utils';

interface PhotoProfileProps extends ButtonProps {}

export function PhotoProfile({ className, ...props }: PhotoProfileProps) {
  const { user } = useUser();

  return (
    <Avatar className={cn('w-40 h-40', className)} {...props}>
      <AvatarImage src={user?.photoProfilePath || ''} />
      <AvatarFallback className="text-3xl">{user?.username[0]}</AvatarFallback>
    </Avatar>
  );
}
