import { Outlet } from '@remix-run/react';
import { useUser } from '../providers/auth-provider';
import { Sidebar } from '../shared/sidebar';

export function AuthenticatedLayout() {
  const { user } = useUser();
  if (!user) {
    return <Outlet />;
  }
  return (
    <div className="h-screen w-screen flex gap-8">
      <Sidebar />
      <div className="flex-1 flex justify-center px-32 py-8">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
