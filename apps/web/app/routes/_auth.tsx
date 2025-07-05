import { Outlet } from '@remix-run/react';

export default function AuthLayout() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
}
