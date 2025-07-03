import { useNavigate } from '@remix-run/react';
import { Home, LucideProps, PlusSquare, Search, User } from 'lucide-react';
import {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useState,
} from 'react';
import { useUser } from '../providers/auth-provider';
import { Button } from '../ui/button';
import { PostPhotoDialog } from './profile/post-photo-dialog';

export function Sidebar() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-stretch min-w-56">
      <h2>Clonegram</h2>
      <SidebarMenu icon={Home} onClick={() => navigate('/')}>
        Home
      </SidebarMenu>
      <SidebarMenu icon={Search}>Search</SidebarMenu>
      <SidebarMenu icon={User} onClick={() => navigate(`/${user?.username}`)}>
        Profile
      </SidebarMenu>
      <PostPhotoDialog open={open} onOpenChange={setOpen}>
        <SidebarMenu icon={PlusSquare}>Create</SidebarMenu>
      </PostPhotoDialog>
    </div>
  );
}

interface SidebarMenuProps {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  children: ReactNode;
  onClick?: () => void;
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
