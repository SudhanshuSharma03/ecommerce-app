import { type ReactNode } from 'react';
import AdminNav from '../components/admin/AdminNav';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNav />
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
