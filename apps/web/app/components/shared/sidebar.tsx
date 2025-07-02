import { ReactNode } from 'react';
import { Button } from '../ui/button';
import { Home, Search, User } from 'lucide-react';
import { useNavigate } from '@remix-run/react';
import { useUser } from '../providers/auth-provider';

export function Sidebar() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="flex flex-col items-stretch min-w-56">
      <h2>Clonegram</h2>
      <SidebarMenu icon={<Home />} onClick={() => navigate('/')}>
        Home
      </SidebarMenu>
      <SidebarMenu icon={<Search />}>Search</SidebarMenu>
      <SidebarMenu
        icon={<User />}
        onClick={() => navigate(`/${user?.username}`)}
      >
        Profile
      </SidebarMenu>
    </div>
  );
}

interface SidebarMenuProps {
  icon: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}

function SidebarMenu(props: SidebarMenuProps) {
  return (
    <Button
      variant="ghost"
      onClick={props.onClick}
      className="justify-start cursor-pointer"
    >
      {props.icon}
      {props.children}
    </Button>
  );
}
