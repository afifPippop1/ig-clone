import { useNavigate } from '@remix-run/react';
import {
  Home,
  LogOut,
  LucideProps,
  PlusSquare,
  Search,
  User,
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes, useState } from 'react';
import { ButtonProps } from 'react-day-picker';
import { useUser } from '../providers/auth-provider';
import { Button } from '../ui/button';
import { PostPhotoDialog } from './profile/post-photo-dialog';

export function Sidebar() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [open, setOpen] = useState<boolean>(false);

  if (!user) return null;

  return (
    <div className="min-w-56 relative border-r border-r-primary p-4 flex flex-col justify-between">
      <div className="flex flex-col items-stretch gap-4">
        <h2>Clonegram</h2>
        <SidebarMenu icon={Home} onClick={() => navigate('/')}>
          Home
        </SidebarMenu>
        <SidebarMenu icon={Search}>Search</SidebarMenu>
        <SidebarMenu icon={User} onClick={() => navigate(`/${user?.username}`)}>
          Profile
        </SidebarMenu>
        <SidebarMenu icon={PlusSquare} onClick={() => setOpen(true)}>
          Create
        </SidebarMenu>
      </div>

      <form method="post" action="/logout">
        <SidebarMenu icon={LogOut} type="submit">
          Log out
        </SidebarMenu>
      </form>
      <PostPhotoDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}

interface SidebarMenuProps extends ButtonProps {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
}

function SidebarMenu(props: SidebarMenuProps) {
  const Icon = props.icon;
  return (
    <Button
      variant="ghost"
      onClick={props.onClick}
      className="justify-start cursor-pointer w-full"
    >
      <Icon />
      <p className="text-xl font-normal">{props.children}</p>
    </Button>
  );
}
