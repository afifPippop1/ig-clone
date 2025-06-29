import { ReactNode } from 'react';
import { Button } from '../ui/button';
import { Home, Search, User } from 'lucide-react';
import { useNavigate } from '@remix-run/react';

export function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start">
      <h2>Clonegram</h2>
      <SidebarMenu icon={<Home />}>Home</SidebarMenu>
      <SidebarMenu icon={<Search />}>Search</SidebarMenu>
      <SidebarMenu icon={<User />} onClick={() => navigate('/pippop')}>
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
    <Button variant="ghost" onClick={props.onClick}>
      {props.icon}
      {props.children}
    </Button>
  );
}
